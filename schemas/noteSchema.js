import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().max(50).required(),
  content: Joi.string().required(),
  pinned: Joi.boolean().default(false).optional(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().max(50),
  content: Joi.string(),
  pinned: Joi.boolean(),
});
