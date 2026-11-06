import { InMemoryRunner, LlmAgent, Workflow, node, type BaseLlm, type NodeContext } from '@google/adk';
import { z } from 'zod';
import { buildPassportStats, type PassportPeriod, type PassportStats } from '../domain/passportStatistics.js';
import { assertActor, validateRecords, type Actor, type RecordsStore } from '../domain/types.js';
import { traceEntry, type TraceEntry } from '../runtime/trace.js';

export type PassportResult = {stats:PassportStats;summary:string;summaryMode:'model'|'fallback'|'empty';limitReached:boolean};
export function fallbackSummary(stats:PassportStats):string {
  if(!stats.totalVisits) return `${stats.periodLabel}還沒有完成的咖啡足跡。`;
  return `${stats.periodLabel}完成 ${stats.totalVisits} 次造訪，共 ${stats.uniqueCafeCount} 間店。`
    + (stats.averageRating===undefined?'':`平均評分 ${stats.averageRating} 分。`);
}
const summarySchema=z.object({summary:z.string().min(1).max(180)}).strict();
export function createPassportWorkflow(input:{
  actor:Actor; period:PassportPeriod;store:RecordsStore;model:string|BaseLlm;nowMs?:number;modelTimeoutMs?:number
}) {
  assertActor(input.actor);
  z.enum(['all','month','year']).parse(input.period);
  const summaryAgent=new LlmAgent({
    name:'passport_summary',model:input.model,includeContents:'none',
    instruction:'SUMMARY_TASK。只使用輸入 JSON 的統計，寫兩句繁體中文咖啡回顧。不得猜測個性、金額或未提供的店家資訊。輸出 JSON，格式為 {"summary":"兩句完整回顧。"}。',
    outputSchema:summarySchema,
    generateContentConfig:{temperature:0.2,maxOutputTokens:512,httpOptions:{timeout:20_000,retryOptions:{attempts:1}}}
  });
  // ADK node deadlines use seconds. HTTP request timeouts above use milliseconds.
  const summaryNode=node(summaryAgent,{timeout:(input.modelTimeoutMs??25_000)/1000});
  const read=node(async()=>{
    const records=await input.store.read(input.actor.userId);
    return validateRecords(records,input.actor.userId);
  },{name:'read_records'});
  const stats=node((_ctx:NodeContext,records:Awaited<ReturnType<RecordsStore['read']>>)=>({
    stats:buildPassportStats({...records,period:input.period,nowMs:input.nowMs}),
    limitReached:Boolean(records.limitReached)
  }),{name:'calculate_stats'});
  type StatInput={stats:PassportStats;limitReached:boolean};
  const route=node((ctx:NodeContext,data:StatInput)=>{
    ctx.route=data.stats.totalVisits?'summarize':'empty';
    return data;
  },{name:'has_visits'});
  const empty=node((_ctx:NodeContext,data:StatInput):PassportResult=>({
    ...data,summary:fallbackSummary(data.stats),summaryMode:'empty'
  }),{name:'empty_passport'});
  const summarize=node(async(ctx:NodeContext,data:StatInput):Promise<PassportResult>=>{
    const facts={period:data.stats.periodLabel,visits:data.stats.totalVisits,
      uniqueCafes:data.stats.uniqueCafeCount,averageRating:data.stats.averageRating??null,
      topTags:data.stats.topTags.map(t=>({label:t.label,count:t.count})),
      favoriteCafe:data.stats.favoriteCafe?{title:data.stats.favoriteCafe.title,visits:data.stats.favoriteCafe.visits}:null};
    try {
      const result=await ctx.runNode(summaryNode,JSON.stringify(facts));
      const raw=typeof result.output==='string'?JSON.parse(result.output):result.output;
      const {summary}=summarySchema.parse(raw);
      return {...data,summary,summaryMode:'model'};
    } catch {
      return {...data,summary:fallbackSummary(data.stats),summaryMode:'fallback'};
    }
  },{name:'summarize_with_fallback'});
  const finish=node((_ctx:NodeContext,result:PassportResult)=>result,{name:'passport_result'});
  return new Workflow({name:'cafe_passport',edges:[
    ['START',read,stats,route,{empty,summarize}],
    [empty,finish],[summarize,finish]
  ]});
}
export async function runPassport(input:Parameters<typeof createPassportWorkflow>[0]):Promise<{result:PassportResult;trace:TraceEntry[]}> {
  const runner=new InMemoryRunner({agent:createPassportWorkflow(input),appName:'cafe_passport'});
  const trace:TraceEntry[]=[];
  let result:PassportResult|undefined;
  for await(const event of runner.runEphemeral({userId:input.actor.userId,newMessage:{role:'user',parts:[{text:'咖啡護照'}]},runConfig:{maxLlmCalls:2}})) {
    trace.push(traceEntry(event));
    if(event.author==='passport_result' && event.output) result=event.output as PassportResult;
    if(event.errorCode && !event.nodeInfo?.path?.includes('passport_summary')) {
      // Child model errors are handled by the summary node. Root errors remain failures.
      if(event.nodeInfo?.path==='cafe_passport') throw new Error('Passport workflow failed');
    }
  }
  if(!result) throw new Error('Passport workflow produced no result');
  return {result,trace};
}

