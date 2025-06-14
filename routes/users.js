import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";
import verifyToken from "../middlewares/verifyToken.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(validateSchema(createUserSchema), createUser);

usersRouter
  .route("/:id")
  .patch(verifyToken, validateSchema(updateUserSchema), updateUser)
  .delete(verifyToken, deleteUser);

export default usersRouter;
