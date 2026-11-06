import assert from 'node:assert/strict';
import test from 'node:test';
import { createQueryTools, QueryService } from '../src/agents/queryAgent.js';
import { DEMO_ACTOR, DEMO_NOW, FixtureRecordsStore } from '../src/adapters/fixtureRecords.js';
import { ScriptedDemoModel } from '../src/runtime/scriptedModel.js';
const store=new FixtureRecordsStore();
test('ADK executes two tool calls and feeds results back to the model',async()=>{
  const service=new QueryService(store,new ScriptedDemoModel(),DEMO_NOW);
  const answer=await service.ask(DEMO_ACTOR,'我這個月最常去哪間？收藏裡還有哪些沒去過？');
  assert.equal(answer.mode,'answer');
  assert.deepEqual(answer.trace.flatMap(t=>t.tools),['get_passport_stats','list_unvisited_wishlist']);
  assert.deepEqual(answer.trace.flatMap(t=>t.responses),['get_passport_stats','list_unvisited_wishlist']);
  assert.match(answer.text,/示範咖啡 A/);assert.match(answer.text,/示範咖啡 D/);
});
test('a follow-up retains the same conversation context',async()=>{
  const service=new QueryService(store,new ScriptedDemoModel(),DEMO_NOW);
  await service.ask(DEMO_ACTOR,'本月最常去哪間？收藏裡哪些沒去過？');
  const answer=await service.ask(DEMO_ACTOR,'只看適合工作的呢？');
  assert.match(answer.text,/上一輪/);
  assert.deepEqual(answer.trace.flatMap(t=>t.tools),['get_passport_stats']);
});
test('a different conversation does not receive the previous conversation',async()=>{
  const service=new QueryService(store,new ScriptedDemoModel(),DEMO_NOW);
  await service.ask(DEMO_ACTOR,'本月最常去哪間？收藏裡哪些沒去過？');
  const answer=await service.ask({...DEMO_ACTOR,conversationId:'another-conversation'},'只看適合工作的呢？');
  assert.doesNotMatch(answer.text,/上一輪/);
});
test('another actor cannot read the demo account',async()=>{
  const service=new QueryService(store,new ScriptedDemoModel(),DEMO_NOW);
  const answer=await service.ask({userId:'other-user',conversationId:'other-user'},'本月最常去哪間？');
  assert.doesNotMatch(answer.text,/示範咖啡 [ADE]/);
  assert.match(answer.text,/0 次/);
  const work=await service.ask({userId:'other-user',conversationId:'other-user'},'只看適合工作的呢？');
  assert.match(work.text,/0 次/);assert.doesNotMatch(work.text,/示範咖啡 A/);
});
test('strict tool schema rejects a forged ownerId',async()=>{
  const tool=createQueryTools(DEMO_ACTOR,store,DEMO_NOW)[0];
  await assert.rejects(tool.runAsync({args:{period:'month',ownerId:'other-user'},toolContext:undefined as never}));
});
test('strict tool schema rejects unsupported periods',async()=>{
  const tool=createQueryTools(DEMO_ACTOR,store,DEMO_NOW)[0];
  await assert.rejects(tool.runAsync({args:{period:'last_week'},toolContext:undefined as never}));
});
test('tool transport failure produces a retryable answer',async()=>{
  const service=new QueryService({read:async()=>{throw new Error('store down');}},new ScriptedDemoModel(),DEMO_NOW);
  const answer=await service.ask(DEMO_ACTOR,'本月最常去哪間？');
  assert.equal(answer.mode,'fallback');assert.match(answer.text,/無法完成/);
});
test('ambiguous period asks for clarification without reading records',async()=>{
  let reads=0;
  const service=new QueryService({read:async()=>{reads++;throw new Error('unexpected');}},new ScriptedDemoModel(),DEMO_NOW);
  const answer=await service.ask(DEMO_ACTOR,'最近去了幾間？');
  assert.match(answer.text,/本月、今年/);assert.equal(reads,0);
});
test('rejects missing trusted identity',async()=>{
  const service=new QueryService(store,new ScriptedDemoModel(),DEMO_NOW);
  await assert.rejects(service.ask({userId:'',conversationId:'x'},'本月'));
});

