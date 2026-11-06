import assert from 'node:assert/strict';
import test from 'node:test';
import { createHmac } from 'node:crypto';
import { once } from 'node:events';
import { createWebhookServer } from '../src/line/webhook.js';
import { createLineHandler } from '../src/line/handler.js';
import { FixtureRecordsStore, DEMO_NOW } from '../src/adapters/fixtureRecords.js';
import { ScriptedDemoModel } from '../src/runtime/scriptedModel.js';

test('group events do not expose personal records',async()=>{
  let reads=0;
  const handle=createLineHandler({store:{read:async()=>{reads++;throw new Error('unexpected');}},model:new ScriptedDemoModel()});
  const result=await handle({type:'message',source:{type:'group',userId:'demo-user',groupId:'group'},message:{type:'text',text:'本月咖啡護照'}});
  assert.equal(reads,0);assert.match(JSON.stringify(result),/一對一/);
});
test('a signed-event actor can receive the existing Flex passport',async()=>{
  const handle=createLineHandler({store:new FixtureRecordsStore(),model:new ScriptedDemoModel(),nowMs:DEMO_NOW});
  const result=await handle({type:'message',source:{type:'user',userId:'demo-user'},message:{type:'text',text:'本月咖啡護照'}});
  assert.equal(result[0].type,'flex');assert.match(JSON.stringify(result),/我的咖啡護照/);
});
test('webhook signature, verification, retry and event deduplication',async(t)=>{
  let handles=0;let replies=0;let fail=false;
  const server=createWebhookServer({
    channelSecret:'test-secret',
    handle:async()=>{handles++;return [{type:'text',text:'ok'}];},
    reply:async()=>{replies++;if(fail)throw new Error('LINE unavailable');}
  });
  server.listen(0,'127.0.0.1');await once(server,'listening');
  t.after(()=>{server.closeAllConnections();server.close();});
  const address=server.address();assert.ok(address&&typeof address==='object');
  const url=`http://127.0.0.1:${address.port}`;
  const post=async(body:string,valid=true)=>fetch(url+'/webhook',{method:'POST',headers:{
    'content-type':'application/json',
    'x-line-signature':valid?createHmac('sha256','test-secret').update(body).digest('base64'):'bad'
  },body});
  assert.equal((await fetch(url+'/health')).status,200);
  assert.equal((await post('{"events":[]}',false)).status,401);
  assert.equal(handles,0);
  assert.equal((await post('{"events":[]}')).status,200);
  assert.equal((await post('not-json')).status,400);
  const body=JSON.stringify({events:[{type:'message',webhookEventId:'event1',replyToken:'token',source:{type:'user',userId:'demo-user'},message:{type:'text',text:'本月咖啡護照'}}]});
  assert.equal((await post(body)).status,200);assert.equal((await post(body)).status,200);
  assert.equal(handles,1);assert.equal(replies,1);
  const retry=body.replace('event1','event2');
  fail=true;assert.equal((await post(retry)).status,500);
  fail=false;assert.equal((await post(retry)).status,200);
  assert.equal(replies,3);
});

