import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  role: Joi.string().max(25).optional(),
  xp: Joi.number().integer().min(0).optional(),
  bio: Joi.string().optional().allow(""),
  profile_pic: Joi.string().uri().optional(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().max(25),
  email: Joi.string().email(),
  password: Joi.string().min(5),
  role: Joi.string().max(25),
  xp: Joi.number().integer().min(0),
  bio: Joi.string().allow(""),
  profile_pic: Joi.string().uri(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
