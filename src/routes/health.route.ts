import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      ok: true,
      time: new Date().toISOString(),
    },
  });
});

export default router;
