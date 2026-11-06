import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { validateSignature } from '@line/bot-sdk';
import { z } from 'zod';
import type { LineTextEvent } from './handler.js';
import type { messagingApi } from '@line/bot-sdk';

const eventSchema=z.object({
  type:z.string(),replyToken:z.string().optional(),webhookEventId:z.string().optional(),
  source:z.object({type:z.string(),userId:z.string().optional(),groupId:z.string().optional(),roomId:z.string().optional()}).optional(),
  message:z.object({type:z.string(),text:z.string().optional()}).passthrough().optional()
}).passthrough();
const bodySchema=z.object({events:z.array(eventSchema).max(100)}).passthrough();
export function createWebhookServer(deps:{
  channelSecret:string;handle:(event:LineTextEvent)=>Promise<messagingApi.Message[]>;
  reply:(replyToken:string,messages:messagingApi.Message[])=>Promise<void>;
  onError?:(code:string)=>void;
}) {
  if(!deps.channelSecret)throw new Error('LINE_CHANNEL_SECRET is required');
  // Development deduplication only. Use persistent event receipts before scaling instances.
  const receipts=new Map<string,Promise<void>>();
  async function read(req:IncomingMessage):Promise<Buffer>{
    const chunks:Buffer[]=[];let size=0;
    for await(const raw of req){const b=Buffer.from(raw);size+=b.length;if(size>1024*1024)throw new Error('body_too_large');chunks.push(b);}
    return Buffer.concat(chunks);
  }
  const send=(res:ServerResponse,status:number,text:string)=>{res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify({status:text}));};
  return createServer(async(req,res)=>{
    if(req.method==='GET'&&req.url==='/health'){send(res,200,'ok');return;}
    if(req.method!=='POST'||req.url!=='/webhook'){send(res,404,'not_found');return;}
    try{
      const raw=await read(req);
      const signature=req.headers['x-line-signature'];
      if(typeof signature!=='string'||!validateSignature(raw,deps.channelSecret,signature)){
        send(res,401,'invalid_signature');return;
      }
      let body:z.infer<typeof bodySchema>;
      try{body=bodySchema.parse(JSON.parse(raw.toString('utf8')));}catch{send(res,400,'invalid_body');return;}
      // Finish work while the HTTP request is alive; no untracked background work after 200.
      for(const event of body.events){
        if(!event.replyToken)continue;
        const eventId=event.webhookEventId;
        let job=eventId?receipts.get(eventId):undefined;
        if(!job){
          job=(async()=>{const messages=await deps.handle(event);if(messages.length)await deps.reply(event.replyToken!,messages.slice(0,5));})();
          if(eventId)receipts.set(eventId,job);
        }
        try{await job;}catch(error){if(eventId)receipts.delete(eventId);throw error;}
        if(receipts.size>1000)receipts.delete(receipts.keys().next().value!);
      }
      send(res,200,'ok');
    }catch(error){
      deps.onError?.(error instanceof Error&&error.message==='body_too_large'?'body_too_large':'processing_failed');
      if(!res.headersSent)send(res,error instanceof Error&&error.message==='body_too_large'?413:500,'request_failed');
    }
  });
}

