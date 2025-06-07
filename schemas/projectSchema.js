import Joi from "joi";

export const createProjectSchema = Joi.object({
  title: Joi.string().max(50).required(),
  content: Joi.string().required(),
  status: Joi.string().max(25).default("active"),
  deadline: Joi.date().optional(),
  priority: Joi.string().max(25).default("normal"),
  pinned: Joi.boolean().default(false),
  user_id: Joi.number().required(),
});

export const updateProjectSchema = Joi.object({
  title: Joi.string().max(50),
  content: Joi.string(),
  status: Joi.string().max(25),
  deadline: Joi.date(),
  priority: Joi.string().max(25),
  pinned: Joi.boolean(),
});
