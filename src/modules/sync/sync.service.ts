import { Note } from "../note/note.model";

export const syncData = async (userId: string, data: any) => {
  // Placeholder for more complex sync logic (e.g. handling conflicts, batch updates)
  // For now, we just return the latest notes modified after lastSyncTime

  const { lastSyncTime } = data;
  let query: any = { user: userId };

  if (lastSyncTime) {
    query.updatedAt = { $gt: new Date(lastSyncTime) };
  }

  const updates = await Note.find(query);

  return {
    notes: updates,
    serverTime: new Date().toISOString(),
  };
};
