import Joi from "joi";

export const createTaskSchema = Joi.object({
  project_id: Joi.number().integer().required(),
  title: Joi.string().max(255).required(),
  content: Joi.string().allow("").optional(),
  status: Joi.string().max(25).default("active"),
  deadline: Joi.date().optional(),
  priority: Joi.string().max(25).default("normal"),
  pinned: Joi.boolean().default(false),
});

export const updateTaskSchema = Joi.object({
  project_id: Joi.number().integer(),
  title: Joi.string().max(255),
  content: Joi.string().allow(""),
  status: Joi.string().max(25),
  deadline: Joi.date().optional(),
  priority: Joi.string().max(25),
  pinned: Joi.boolean(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  completed_at: Joi.date().optional(),
});
