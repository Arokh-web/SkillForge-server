import Joi from "joi";

const projectSchema = Joi.object({
  title: Joi.string().max(50).required(),
  content: Joi.string().required(),
  status: Joi.string().max(25).default("active"),
  deadline: Joi.date().optional(),
  priority: Joi.string().max(25).default("normal"),
  pinned: Joi.boolean().default(false),
});

export default projectSchema;
