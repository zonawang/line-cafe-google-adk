import { BaseLlm, type LlmRequest, type LlmResponse } from '@google/adk';

/** Deterministic test double. It runs through the real ADK loop but makes ZERO network/model calls. */
export class ScriptedDemoModel extends BaseLlm {
  calls=0;
  constructor(private readonly fail=false){super({model:'scripted-demo-model'});}
  async *generateContentAsync(request:LlmRequest):AsyncGenerator<LlmResponse,void> {
    this.calls++;
    if(this.fail)throw new Error('Simulated model outage');
    const contents=request.contents??[];
    const system=JSON.stringify(request.config?.systemInstruction??'');
    if(system.includes('SUMMARY_TASK')) {
      const facts=JSON.parse(contents.at(-1)?.parts?.map(p=>p.text??'').join('')??'{}') as {
        period:string;visits:number;uniqueCafes:number;favoriteCafe?:{title:string}
      };
      yield {content:{role:'model',parts:[{text:JSON.stringify({summary:`${facts.period}完成 ${facts.visits} 次咖啡造訪，走訪 ${facts.uniqueCafes} 間店。最常造訪的是${facts.favoriteCafe?.title??'尚無紀錄'}。`})}]}};
      return;
    }
    let lastUser=-1;
    contents.forEach((c,i)=>{if(c.role==='user'&&c.parts?.some(p=>p.text))lastUser=i;});
    const question=(contents[lastUser]?.parts??[]).map(p=>p.text??'').join('');
    const responses=contents.slice(lastUser+1).flatMap(c=>c.parts??[]).flatMap(p=>p.functionResponse?[p.functionResponse]:[]);
    if(question.includes('別人')||question.includes('other-user')) {
      yield {content:{role:'model',parts:[{text:'我只能查詢目前使用者自己的咖啡紀錄。'}]}};return;
    }
    if(question.includes('最近')) {
      yield {content:{role:'model',parts:[{text:'你想查看本月、今年，還是全部紀錄？'}]}};return;
    }
    const work=question.includes('工作');
    if(!responses.some(r=>r.name==='get_passport_stats')) {
      yield {content:{role:'model',parts:[{functionCall:{id:'stats-'+this.calls,name:'get_passport_stats',args:{period:'month',...(work?{tag:'work'}:{})}}}]}};
      return;
    }
    if(!work&&!responses.some(r=>r.name==='list_unvisited_wishlist')) {
      yield {content:{role:'model',parts:[{functionCall:{id:'wishlist-'+this.calls,name:'list_unvisited_wishlist',args:{}}}]}};
      return;
    }
    const stats=responses.find(r=>r.name==='get_passport_stats')?.response as {totalVisits?:number;favoriteCafe?:{title:string}}|undefined;
    if(work) {
      const prior=contents.slice(0,lastUser).some(c=>c.parts?.some(p=>p.functionResponse?.name==='list_unvisited_wishlist'));
      const report=`依你留下的工作標籤，本月有 ${stats?.totalVisits??0} 次造訪，最常去 ${stats?.favoriteCafe?.title??'尚無紀錄'}。`;
      yield {content:{role:'model',parts:[{text:prior
        ?report+'上一輪尚未造訪的收藏沒有設施證據，無法確認是否適合工作。'
        :report}]}};
      return;
    }
    const wish=responses.find(r=>r.name==='list_unvisited_wishlist')?.response as {cafes?:Array<{title:string}>}|undefined;
    yield {content:{role:'model',parts:[{text:`本月有 ${stats?.totalVisits??0} 次造訪，最常去的是 ${stats?.favoriteCafe?.title??'尚無紀錄'}。在已讀取足跡中尚未造訪的收藏有 ${wish?.cafes?.map(c=>c.title).join('、')||'無'}。`}]}};
  }
  async connect():Promise<never>{throw new Error('Live mode is unsupported by this offline test double');}
}

