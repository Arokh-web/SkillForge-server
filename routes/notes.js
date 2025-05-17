import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";

const notesRouter = Router();
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notes.js";
import { createNoteSchema, updateNoteSchema } from "../schemas/noteSchema.js";

notesRouter
  .route("/")
  .get(getAllNotes)
  .post(validateSchema(createNoteSchema), createNote);

notesRouter
  .route("/:id")
  .get(getNoteById)
  .put(validateSchema(updateNoteSchema), updateNote)
  .delete(deleteNote);

export default notesRouter;
