import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";
import verifyToken from "../middlewares/verifyToken.js";

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  patchProject,
  // getAllTasks,
} from "../controllers/projects.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/projectSchema.js";

const projectsRouter = Router();

projectsRouter
  .route("/")
  .get(verifyToken, getAllProjects)
  .post(verifyToken, validateSchema(createProjectSchema), createProject);

projectsRouter
  .route("/:id")
  .get(verifyToken, getProjectById)
  .put(verifyToken, validateSchema(updateProjectSchema), updateProject)
  .patch(verifyToken, validateSchema(updateProjectSchema), patchProject)
  .delete(verifyToken, deleteProject);

export default projectsRouter;
