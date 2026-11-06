import { Firestore, Timestamp } from '@google-cloud/firestore';
import type { Records, RecordsStore } from '../domain/types.js';
import { validateRecords } from '../domain/types.js';

/** Read-only adapter for the existing Cafe Bot collections. */
export class FirestoreRecordsStore implements RecordsStore {
  constructor(
    private readonly db: Firestore,
    private readonly journeysCollection = 'cafe-user-journeys',
    private readonly wishlistCollection = 'cafe-user-wishlists'
  ) {}
  async read(actorId: string): Promise<Records> {
    // LINE identities are supplied by the verified transport, never by tool arguments.
    if (!actorId || actorId.includes('/')) throw new Error('Invalid actor');
    const [visits, entries] = await Promise.all([
      this.db.collection(this.journeysCollection).doc(actorId).collection('visits')
        .where('status','==','completed').orderBy('completedAt','desc').limit(500).get(),
      this.db.collection(this.wishlistCollection).doc(actorId).collection('entries')
        .orderBy('createdAt','desc').limit(200).get()
    ]);
    const ms = (value: unknown): number | undefined => value instanceof Timestamp ? value.toMillis() : undefined;
    return validateRecords({
      journeys: visits.docs.map(doc=>{
        const d=doc.data();
        return {id:doc.id, ownerId:d.ownerId,conversationId:d.conversationId,cafeTitle:d.cafeTitle,
          cafeUri:d.cafeUri,rating:d.rating,tags:d.tags??[],status:d.status,
          createdAtMs:ms(d.createdAt)!,visitedAtMs:ms(d.visitedAt),completedAtMs:ms(d.completedAt)};
      }),
      wishlistItems: entries.docs.map(doc=>{
        const d=doc.data();
        return {id:doc.id,ownerId:d.ownerId,cafe:d.cafe,createdAtMs:ms(d.createdAt)!};
      }),
      limitReached: visits.size===500 || entries.size===200
    },actorId);
  }
}

