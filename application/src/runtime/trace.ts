import type { Event } from '@google/adk';

export type TraceEntry = {
  author?: string; node?: string; route?: unknown; errorCode?: string;
  tools: string[]; responses: string[]; hasOutput: boolean;
};
/** Redacted trace: no prompts, record contents, tokens, or LINE identities. */
export function traceEntry(event: Event): TraceEntry {
  return {
    author:event.author,node:event.nodeInfo?.path,route:event.route,errorCode:event.errorCode,
    tools:(event.content?.parts??[]).flatMap(p=>p.functionCall?.name?[p.functionCall.name]:[]),
    responses:(event.content?.parts??[]).flatMap(p=>p.functionResponse?.name?[p.functionResponse.name]:[]),
    hasOutput:event.output!==undefined
  };
}
export function eventText(event: Event): string {
  return (event.content?.parts??[]).filter(p=>!p.thought).map(p=>p.text??'').join('');
}

