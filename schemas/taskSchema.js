import Joi from "joi";

const taskSchema = Joi.object({
  project_id: Joi.number().integer().required(),
  title: Joi.string().max(255).required(),
  content: Joi.string().allow("").optional(),
  status: Joi.string().max(25).default("active"),
  deadline: Joi.date().optional(),
  priority: Joi.string().max(25).default("normal"),
  pinned: Joi.boolean().default(false),
});

export default taskSchema;
