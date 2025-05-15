import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().max(25).required(),
  email: Joi.string().email().required(),
  password_hash: Joi.string().min(5).required(), 
  role: Joi.string().max(25).optional(),
  xp: Joi.number().integer().min(0).optional(),
  bio: Joi.string().optional().allow(""),
  profile_pic: Joi.string().uri().optional(),
});

export default userSchema;