import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";

const noteRouter = Router();
import { createNote, getAllNotes, getNoteById } from "../controllers/notes.js";
import noteSchema from "../schemas/noteSchema.js";

noteRouter
  .route("/")
  .get(getAllNotes)
  .post(validateSchema(noteSchema), createNote);
noteRouter.route("/:id").get(getNoteById);

// noteRouter.route("/notes/:id").put(updateNote).delete(deleteNote);

export default noteRouter;
