import { z } from 'zod';

export const journeyTag = z.enum(['quiet', 'outlets', 'work', 'revisit']);
export type JourneyTag = z.infer<typeof journeyTag>;
export const cafeSchema = z.object({title: z.string().min(1), uri: z.string().url()}).passthrough();
export const journeySchema = z.object({
  id: z.string(), ownerId: z.string(), conversationId: z.string(),
  cafeTitle: z.string(), cafeUri: z.string(), rating: z.number().int().min(1).max(5).optional(),
  tags: z.array(journeyTag), status: z.enum(['draft', 'completed']),
  createdAtMs: z.number().finite(), visitedAtMs: z.number().finite().optional(),
  completedAtMs: z.number().finite().optional()
});
export const wishlistSchema = z.object({
  id: z.string(), ownerId: z.string(), cafe: cafeSchema, createdAtMs: z.number().finite()
});
export type CafeJourney = z.infer<typeof journeySchema>;
export type WishlistItem = z.infer<typeof wishlistSchema>;
export type Records = {journeys: CafeJourney[]; wishlistItems: WishlistItem[]; limitReached?: boolean};
export interface RecordsStore { read(actorId: string): Promise<Records>; }
export type Actor = {userId: string; conversationId: string};
export function assertActor(actor: Actor): void {
  if (!actor.userId || !actor.conversationId) throw new Error('Missing trusted actor');
}
export function validateRecords(records: Records, actorId: string): Records {
  const journeys = z.array(journeySchema).parse(records.journeys);
  const wishlistItems = z.array(wishlistSchema).parse(records.wishlistItems);
  if (journeys.some(j => j.ownerId !== actorId) || wishlistItems.some(w => w.ownerId !== actorId)) {
    throw new Error('Record owner mismatch');
  }
  return {journeys, wishlistItems, limitReached: Boolean(records.limitReached)};
}

