import { Note } from "./note.model";
import { AppError } from "../../utils/AppError";

export const createNote = async (userId: string, data: any) => {
  const note = await Note.create({
    user: userId,
    ...data,
  });
  return note;
};

export const getNotes = async (userId: string) => {
  return await Note.find({ user: userId }).sort({ createdAt: -1 });
};

export const getNoteById = async (userId: string, noteId: string) => {
  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) {
    throw new AppError(404, "Note not found");
  }
  return note;
};

export const updateNote = async (userId: string, noteId: string, data: any) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    data,
    { new: true, runValidators: true },
  );

  if (!note) {
    throw new AppError(404, "Note not found");
  }
  return note;
};

export const deleteNote = async (userId: string, noteId: string) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

  if (!note) {
    throw new AppError(404, "Note not found");
  }
  return note;
};
