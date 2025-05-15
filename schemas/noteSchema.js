import Joi from "joi";

const noteSchema = Joi.object({
  title: Joi.string().max(50).required(),
  content: Joi.string().required(),
  pinned: Joi.boolean().default(false),
});

export default noteSchema;
