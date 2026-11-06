import assert from 'node:assert/strict';
import test from 'node:test';
import { BaseLlm, type LlmRequest, type LlmResponse } from '@google/adk';
import { runPassport } from '../src/agents/passportWorkflow.js';
import { buildPassportStats } from '../src/domain/passportStatistics.js';
import { demoRecords, DEMO_ACTOR, DEMO_NOW, FixtureRecordsStore } from '../src/adapters/fixtureRecords.js';
import { ScriptedDemoModel } from '../src/runtime/scriptedModel.js';

const base={actor:DEMO_ACTOR,period:'month' as const,nowMs:DEMO_NOW,store:new FixtureRecordsStore()};
test('ADK graph preserves the original passport statistics',async()=>{
  let modelContents='';
  class Capture extends ScriptedDemoModel {
    async *generateContentAsync(request:LlmRequest):AsyncGenerator<LlmResponse,void>{
      modelContents=JSON.stringify(request.contents);yield* super.generateContentAsync(request);
    }
  }
  const {result,trace}=await runPassport({...base,model:new Capture()});
  assert.deepEqual(result.stats,buildPassportStats({...demoRecords(),period:'month',nowMs:DEMO_NOW}));
  assert.equal(result.summaryMode,'model');
  assert.ok(trace.some(t=>t.node==='cafe_passport.calculate_stats'));
  assert.match(modelContents,/2026 年 11 月/);
  assert.doesNotMatch(modelContents,/ownerId|conversationId|demo-user/);
});
test('empty branch skips all model calls',async()=>{
  const model=new ScriptedDemoModel();
  const {result,trace}=await runPassport({...base,actor:{userId:'empty',conversationId:'empty'},model});
  assert.equal(result.summaryMode,'empty');assert.equal(model.calls,0);
  assert.ok(trace.some(t=>t.author==='empty_passport'));
});
test('model failure preserves statistics and returns deterministic fallback',async()=>{
  const {result,trace}=await runPassport({...base,model:new ScriptedDemoModel(true)});
  assert.equal(result.summaryMode,'fallback');assert.equal(result.stats.totalVisits,3);
  assert.ok(trace.some(t=>t.errorCode));
});
class BadOutput extends BaseLlm {
  constructor(){super({model:'bad-test'});}
  async *generateContentAsync():AsyncGenerator<LlmResponse,void>{
    yield {content:{role:'model',parts:[{text:'not JSON'}]}};
  }
  async connect():Promise<never>{throw new Error('unused');}
}
test('invalid model output uses fallback',async()=>{
  const {result}=await runPassport({...base,model:new BadOutput()});
  assert.equal(result.summaryMode,'fallback');
});
class SlowModel extends BaseLlm {
  constructor(){super({model:'slow-test'});}
  async *generateContentAsync():AsyncGenerator<LlmResponse,void>{
    await new Promise(resolve=>setTimeout(resolve,80));
    yield {content:{role:'model',parts:[{text:'{"summary":"late"}'}]}};
  }
  async connect():Promise<never>{throw new Error('unused');}
}
test('a model node deadline leads to fallback',async()=>{
  const {result}=await runPassport({...base,model:new SlowModel(),modelTimeoutMs:5});
  assert.equal(result.summaryMode,'fallback');
});
test('foreign records fail closed before summarization',async()=>{
  const model=new ScriptedDemoModel();
  await assert.rejects(runPassport({...base,store:{read:async()=>demoRecords('other-user')},model}));
  assert.equal(model.calls,0);
});
test('failed data source never becomes an empty passport',async()=>{
  await assert.rejects(runPassport({...base,store:{read:async()=>{throw new Error('store unavailable');}},model:new ScriptedDemoModel()}));
});

