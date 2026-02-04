import { Router } from "express";
import * as noteController from "./note.controller";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

router.use(requireAuth);

router.route("/").post(noteController.createNote).get(noteController.getNotes);

router
  .route("/:id")
  .get(noteController.getNoteById)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

export default router;
