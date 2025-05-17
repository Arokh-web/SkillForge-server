import { models } from "../db/db_index.js";
import ErrorResponse from "../utils/errorResponse.js";

const Note = models.Note;

// GET ALL /notes
export const getAllNotes = async (req, res, next) => {
  const notes = await Note.findAll();
  console.log("GET method on /notes: SUCCESSFULL");
  res.status(200).json(notes);
};

// GET ONE /notes/:id
export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findByPk(id);

  if (!note) {
    return new ErrorResponse(`Note not found with id of ${id}`, 404);
  }
  console.log("GET method on /notes/:ID: SUCCESSFULL");
  res.status(200).json(note);
};

// CREATE ONE note
export const createNote = async (req, res, next) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    pinned,
  });
  console.log("POST method on /notes: SUCCESSFULL");
  res.status(201).json(note);
};
