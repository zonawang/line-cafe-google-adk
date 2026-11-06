import test from 'node:test';
import assert from 'node:assert/strict';
import { Firestore, Timestamp } from '@google-cloud/firestore';
import { FirestoreRecordsStore } from '../src/adapters/firestoreRecords.js';
import { demoRecords, DEMO_NOW } from '../src/adapters/fixtureRecords.js';
import { buildPassportStats } from '../src/domain/passportStatistics.js';
function database(ownerId='demo-user') {
  const records=demoRecords(ownerId);
  const paths:string[]=[];
  const db={collection:(root:string)=>({doc:(id:string)=>({collection:(child:string)=>{
    paths.push(root+'/'+id+'/'+child);
    const data=child==='visits'
      ?records.journeys.map(j=>({id:j.id,data:()=>({...j,createdAt:Timestamp.fromMillis(j.createdAtMs),visitedAt:Timestamp.fromMillis(j.visitedAtMs!),completedAt:Timestamp.fromMillis(j.visitedAtMs!)})}))
      :records.wishlistItems.map(w=>({id:w.id,data:()=>({...w,createdAt:Timestamp.fromMillis(w.createdAtMs)})}));
    const query={where:()=>query,orderBy:()=>query,limit:()=>query,get:async()=>({docs:data,size:data.length})};
    return query;
  }})})};
  return {db:db as unknown as Firestore,paths};
}
test('existing Firestore timestamps and collection layout retain passport semantics',async()=>{
  const {db,paths}=database();
  const records=await new FirestoreRecordsStore(db).read('demo-user');
  const stats=buildPassportStats({...records,period:'month',nowMs:DEMO_NOW});
  assert.equal(stats.totalVisits,3);assert.equal(stats.wishlistVisitedCount,1);
  assert.deepEqual(paths,['cafe-user-journeys/demo-user/visits','cafe-user-wishlists/demo-user/entries']);
});
test('Firestore adapter rejects a foreign owner even inside the requested path',async()=>{
  const {db}=database('foreign-owner');
  await assert.rejects(new FirestoreRecordsStore(db).read('demo-user'),/owner mismatch/);
});

