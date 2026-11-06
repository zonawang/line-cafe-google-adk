import { Firestore } from '@google-cloud/firestore';
import { FixtureRecordsStore } from './adapters/fixtureRecords.js';
import { FirestoreRecordsStore } from './adapters/firestoreRecords.js';
import { ScriptedDemoModel } from './runtime/scriptedModel.js';
import { createLineHandler } from './line/handler.js';
import { createWebhookServer } from './line/webhook.js';

const env=process.env;
const required=(name:string)=>{const value=env[name];if(!value)throw new Error(`Missing ${name}`);return value;};
const recordsMode=env.RECORDS_MODE??'fixture';
const modelMode=env.MODEL_MODE??'live';
if(!['fixture','firestore'].includes(recordsMode)||!['scripted','live'].includes(modelMode))throw new Error('Invalid adapter mode');
if(modelMode==='scripted'&&recordsMode!=='fixture')throw new Error('Scripted model is for fixture data only');
const token=required('LINE_CHANNEL_ACCESS_TOKEN');
const store=recordsMode==='firestore'
  ?new FirestoreRecordsStore(new Firestore({projectId:required('GOOGLE_CLOUD_PROJECT')}),
    env.FIRESTORE_JOURNEY_USERS_COLLECTION,env.FIRESTORE_WISHLIST_USERS_COLLECTION)
  :new FixtureRecordsStore();
const model=modelMode==='scripted'?new ScriptedDemoModel():(env.GEMINI_MODEL??'gemini-3.5-flash-lite');
const handle=createLineHandler({store,model,demo:modelMode==='scripted'});
const server=createWebhookServer({
  channelSecret:required('LINE_CHANNEL_SECRET'),handle,
  reply:async(replyToken,messages)=>{
    const response=await fetch('https://api.line.me/v2/bot/message/reply',{
      method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${token}`},
      body:JSON.stringify({replyToken,messages}),signal:AbortSignal.timeout(10_000)
    });
    if(!response.ok)throw new Error('LINE reply failed');
  },
  onError:code=>console.error(JSON.stringify({event:'webhook_error',code}))
});
server.requestTimeout=70_000;
server.listen(Number(env.PORT??3000),'0.0.0.0',()=>console.log(JSON.stringify({
  event:'listening',port:Number(env.PORT??3000),recordsMode,modelMode
})));

