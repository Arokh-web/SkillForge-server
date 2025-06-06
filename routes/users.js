import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";

const usersRouter = Router();

import {
  createUser,
  getAllUsers,
  // getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(validateSchema(createUserSchema), createUser);

// GET, ADMIN ONLY
usersRouter
  .route("/:id")
  // .get(getUserById)
  .put(validateSchema(updateUserSchema), updateUser)
  .delete(deleteUser);

export default usersRouter;
