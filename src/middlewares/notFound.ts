import { Request, Response, NextFunction } from "express";
import { apiResponse } from "../utils/apiResponse";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  apiResponse(res, 404, false, `Not Found - ${req.originalUrl}`);
};
