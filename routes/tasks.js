import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";

const tasksRouter = Router();
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

tasksRouter
  .route("/")
  .get(getAllTasks)
  .post(validateSchema(createTaskSchema), createTask);

tasksRouter
  .route("/:id")
  .get(getTaskById)
  .put(validateSchema(updateTaskSchema), updateTask)
  .patch(validateSchema(updateTaskSchema), patchTask)
  .delete(deleteTask);

tasksRouter.route("/projects/:id").get(getTasksByProjectId);

export default tasksRouter;
