import { Router } from "express";
import * as syncController from "./sync.controller";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

router.use(requireAuth);

router.post("/", syncController.sync);

export default router;
