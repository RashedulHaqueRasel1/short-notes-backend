import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import * as authService from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse({ body: req.body });
  if (!validation.success) {
    return apiResponse(res, 400, false, validation.error.issues[0].message);
  }

  const user = await authService.register(req.body);
  apiResponse(res, 201, true, "User registered successfully", user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse({ body: req.body });
  if (!validation.success) {
    return apiResponse(res, 400, false, validation.error.issues[0].message);
  }

  const user = await authService.login(req.body);
  apiResponse(res, 200, true, "User logged in successfully", user);
});
