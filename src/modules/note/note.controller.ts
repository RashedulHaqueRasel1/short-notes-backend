import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import * as noteService from "./note.service";
import { createNoteSchema, updateNoteSchema } from "./note.validation";

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const validation = createNoteSchema.safeParse({ body: req.body });
  if (!validation.success) {
    return apiResponse(res, 400, false, validation.error.issues[0].message);
  }

  const note = await noteService.createNote(req.user.id, req.body);
  apiResponse(res, 201, true, "Note created successfully", note);
});

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const notes = await noteService.getNotes(req.user.id);
  apiResponse(res, 200, true, "Notes retrieved successfully", notes);
});

export const getNoteById = asyncHandler(async (req: Request, res: Response) => {
  const note = await noteService.getNoteById(
    req.user.id,
    req.params.id as string,
  );
  apiResponse(res, 200, true, "Note retrieved successfully", note);
});

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const validation = updateNoteSchema.safeParse({ body: req.body });
  if (!validation.success) {
    return apiResponse(res, 400, false, validation.error.issues[0].message);
  }

  const note = await noteService.updateNote(
    req.user.id,
    req.params.id as string,
    req.body,
  );
  apiResponse(res, 200, true, "Note updated successfully", note);
});

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  await noteService.deleteNote(req.user.id, req.params.id as string);
  apiResponse(res, 200, true, "Note deleted successfully");
});
