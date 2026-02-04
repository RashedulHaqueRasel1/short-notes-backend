import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import * as syncService from "./sync.service";
import { syncSchema } from "./sync.validation";

export const sync = asyncHandler(async (req: Request, res: Response) => {
  const validation = syncSchema.safeParse({ body: req.body });
  if (!validation.success) {
    return apiResponse(res, 400, false, validation.error.issues[0].message);
  }

  const result = await syncService.syncData(req.user.id, req.body);
  apiResponse(res, 200, true, "Sync successful", result);
});
