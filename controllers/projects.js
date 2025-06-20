import { models } from "../db/db_index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const Project = models.Project;

// GET ALL /projects
export const getAllProjects = async (req, res, next) => {
  const projects = await Project.findAll({
    where: { user_id: req.user.id },
    order: [["createdAt", "DESC"]],
  });
  console.log("GET method on /projects: SUCCESSFULL");
  res.status(200).json(projects);
};

// GET ONE /projects/:id
export const getProjectById = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findByPk({
    where: { id, user_id: req.user.id },
  });

  if (!project) {
    return next(new ErrorResponse(`Project not found with id of ${id}`, 404));
  }
  console.log("GET method on /projects/:ID: SUCCESSFULL");
  res.status(200).json(project);
};

// CREATE ONE project
export const createProject = async (req, res, next) => {
  const { title, content, status, deadline, priority, pinned } = req.body;

  const project = await Project.create({
    title,
    content,
    status,
    deadline,
    priority,
    pinned,
    user_id: req.user.id,
  });
  console.log("POST method on /projects: SUCCESSFULL");
  console.log("Created project:", project);
  res.status(201).json(project);
};

// UPDATE ONE project
export const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, status, deadline, priority, pinned } = req.body;

  const project = await Project.findByPk({
    where: { id, user_id: req.user.id },
  });

  if (!project) {
    return next(new ErrorResponse(`Project not found with id of ${id}`, 404));
  }

  await project.update({
    title,
    content,
    status,
    deadline,
    priority,
    pinned,
  });
  console.log("PUT method on /projects/:ID: SUCCESSFULL");
  res.status(200).json(project);
};

// DELETE ONE project
export const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findOne({
    where: { id, user_id: req.user.id },
  });

  if (!project) {
    return next(new ErrorResponse(`Project not found with id of ${id}`, 404));
  }

  await project.destroy();
  console.log("DELETE method on /projects/:ID: SUCCESSFULL");
  res.status(204).json({ success: true });
};

// PATCH project (to update only some fields)
export const patchProject = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const project = await Project.findOne({
    where: { id },
  });

  if (!project) {
    return next(new ErrorResponse(`Project not found with id of ${id}`, 404));
  }
  console.log("UPDATE BODY:", updates);
  await project.update(updates);
  console.log("PATCH method on /projects/:ID: SUCCESSFULL");
  res.status(200).json(project);
};
