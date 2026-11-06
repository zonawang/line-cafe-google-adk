import { writeFile } from 'node:fs/promises';
import { FixtureRecordsStore, DEMO_ACTOR, DEMO_NOW } from './adapters/fixtureRecords.js';
import { runPassport } from './agents/passportWorkflow.js';
import { QueryService } from './agents/queryAgent.js';
import { ScriptedDemoModel } from './runtime/scriptedModel.js';

const live=process.argv.includes('--live');
const model=live?(process.env.GEMINI_MODEL??'gemini-3.5-flash-lite'):new ScriptedDemoModel();
const store=new FixtureRecordsStore();
const normal=await runPassport({actor:DEMO_ACTOR,period:'month',store,model,nowMs:DEMO_NOW});
const empty=await runPassport({actor:{userId:'empty-user',conversationId:'empty-user'},period:'month',store,model,nowMs:DEMO_NOW});
const failure=await runPassport({actor:DEMO_ACTOR,period:'month',store,model:new ScriptedDemoModel(true),nowMs:DEMO_NOW});
const query=new QueryService(store,model,DEMO_NOW);
const question=await query.ask(DEMO_ACTOR,'我這個月最常去哪間？收藏裡還有哪些沒去過？');
const followup=await query.ask(DEMO_ACTOR,'只看適合工作的呢？');
const report={
  generatedAt:new Date().toISOString(),
  disclosure:live?'Gemini live calls with synthetic records; failure case uses a scripted outage':'OFFLINE: real ADK 2.3.0 runtime + scripted model + synthetic records; ZERO Gemini API calls',
  fixtureNow:new Date(DEMO_NOW).toISOString(),adkVersion:'2.3.0',
  passport:{normal,empty,simulatedModelFailure:failure},query:{question,followup},
  liveGeminiBenchmarks:'not measured'
};
const json=JSON.stringify(report,null,2);
const outputIndex=process.argv.indexOf('--output');
if(outputIndex>=0){const destination=process.argv[outputIndex+1];if(!destination)throw new Error('--output needs a path');await writeFile(destination,json+'\n');}
console.log(json);

