import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";
import verifyToken from "../middlewares/verifyToken.js";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProjectId,
  patchTask,
} from "../controllers/tasks.js";

import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema.js";


const tasksRouter = Router();

tasksRouter
  .route("/")
  .get(verifyToken, getAllTasks)
  .post(verifyToken, validateSchema(createTaskSchema), createTask);

tasksRouter
  .route("/:id")
  .get(verifyToken, getTaskById)
  .put(verifyToken, validateSchema(updateTaskSchema), updateTask)
  .patch(verifyToken, validateSchema(updateTaskSchema), patchTask)
  .delete(verifyToken, deleteTask);

tasksRouter.route("/projects/:id").get(verifyToken, getTasksByProjectId);

export default tasksRouter;
