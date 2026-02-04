import { z } from "zod";

export const syncSchema = z.object({
  body: z.object({
    lastSyncTime: z.string().optional(),
    changes: z
      .object({
        notes: z.array(z.any()).optional(),
      })
      .optional(),
  }),
});
