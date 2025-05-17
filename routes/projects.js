import validateSchema from "../middlewares/validateSchema.js";
import Router from "express";

const projectsRouter = Router();
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projects.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/projectSchema.js";

projectsRouter
  .route("/")
  .get(getAllProjects)
  .post(validateSchema(createProjectSchema), createProject);

projectsRouter
  .route("/:id")
  .get(getProjectById)
  .put(validateSchema(updateProjectSchema), updateProject)
  .delete(deleteProject);

export default projectsRouter;
