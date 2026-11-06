import type { messagingApi } from '@line/bot-sdk';
import type { BaseLlm } from '@google/adk';
import type { Actor, RecordsStore } from '../domain/types.js';
import type { PassportPeriod } from '../domain/passportStatistics.js';
import { createPassportMessages } from '../adapters/lineMessages.js';
import { runPassport } from '../agents/passportWorkflow.js';
import { QueryService } from '../agents/queryAgent.js';

export type LineTextEvent = {
  type:string;replyToken?:string;webhookEventId?:string;
  source?:{type:string;userId?:string;groupId?:string;roomId?:string};
  message?:{type:string;text?:string};
};
const commands=new Map<string,PassportPeriod>([
  ['我的咖啡護照','all'],['咖啡護照','all'],['本月咖啡護照','month'],['今年咖啡護照','year']
]);
export function createLineHandler(deps:{store:RecordsStore;model:string|BaseLlm;nowMs?:number;demo?:boolean}) {
  const queries=new QueryService(deps.store,deps.model,deps.nowMs);
  return async(event:LineTextEvent):Promise<messagingApi.Message[]>=>{
    if(event.type!=='message'||event.message?.type!=='text')return [];
    if(event.source?.type!=='user')return [{type:'text',text:'咖啡護照與個人紀錄查詢，請到與 Bot 的一對一聊天室使用。'}];
    const userId=event.source.userId;
    if(!userId)return [{type:'text',text:'目前無法確認使用者身分。'}];
    const actor:Actor={userId,conversationId:userId};
    const text=event.message.text?.trim()??'';
    if(!text||text.length>2000)return [{type:'text',text:'請輸入 1～2000 字的咖啡紀錄問題。'}];
    try{
      const period=commands.get(text);
      const prefix:messagingApi.Message[]=deps.demo?[{type:'text',text:'示範模式：使用合成資料與腳本模型，沒有呼叫 Gemini。'}]:[];
      if(period) {
        const {result}=await runPassport({actor,period,store:deps.store,model:deps.model,nowMs:deps.nowMs});
        const messages=createPassportMessages(result);
        if(result.limitReached)messages.push({type:'text',text:'目前僅讀取最近 500 筆足跡與 200 筆收藏，這份回顧可能不完整。'});
        return [...prefix,...messages];
      }
      const answer=await queries.ask(actor,text);
      return [...prefix,{type:'text',text:answer.text.slice(0,4500)}];
    }catch{
      return [{type:'text',text:'目前無法讀取或整理咖啡紀錄，請稍後再試。'}];
    }
  };
}

