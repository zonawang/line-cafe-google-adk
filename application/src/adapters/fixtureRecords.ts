import type { Records, RecordsStore } from '../domain/types.js';

export const DEMO_NOW = Date.parse('2026-11-06T12:00:00+08:00');
export const DEMO_ACTOR = {userId: 'demo-user', conversationId: 'demo-user'};
const when = (day: number) => Date.parse(`2026-11-${String(day).padStart(2,'0')}T14:00:00+08:00`);
const uri = (name: string) => `https://www.google.com/maps/search/?api=1&query=Demo+Cafe+${name}`;
export function demoRecords(ownerId = DEMO_ACTOR.userId): Records {
  return {
    journeys: [
      {id:'v1',ownerId,conversationId:ownerId,cafeTitle:'示範咖啡 A',cafeUri:uri('A'),rating:5,tags:['quiet','work'],status:'completed',createdAtMs:when(2),visitedAtMs:when(2)},
      {id:'v2',ownerId,conversationId:ownerId,cafeTitle:'示範咖啡 A',cafeUri:uri('A'),rating:4,tags:['work'],status:'completed',createdAtMs:when(4),visitedAtMs:when(4)},
      {id:'v3',ownerId,conversationId:ownerId,cafeTitle:'示範咖啡 B',cafeUri:uri('B'),rating:3,tags:['quiet'],status:'completed',createdAtMs:when(5),visitedAtMs:when(5)}
    ],
    wishlistItems: ['A','D','E'].map(name=>({
      id:'w'+name,ownerId,cafe:{title:`示範咖啡 ${name}`,uri:uri(name)},createdAtMs:when(1)
    }))
  };
}
/** Synthetic records only. Unknown actors always get an empty account. */
export class FixtureRecordsStore implements RecordsStore {
  constructor(private readonly accounts: Record<string,Records> = {[DEMO_ACTOR.userId]:demoRecords()}) {}
  async read(actorId: string): Promise<Records> {
    return structuredClone(this.accounts[actorId] ?? {journeys:[],wishlistItems:[]});
  }
}

