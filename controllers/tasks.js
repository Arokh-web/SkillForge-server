import { models } from "../db/db_index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const Task = models.Task;
const Project = models.Project;

// GET ALL /tasks (for all projects; admin only!)
export const getAllTasks = async (req, res, next) => {
  const tasks = await Task.findAll();
  console.log("GET method on /tasks: SUCCESSFULL");
  res.status(200).json(tasks);
};

// GET ALL /projects/:id/tasks (for one project)
export const getTasksByProjectId = async (req, res, next) => {
  const { id } = req.params;
  console.log("Project ID:", id);
  console.log("User ID:", req.user.id);

  const project = await Project.findOne({
    where: { id, user_id: req.user.id },
  });

  if (!project) {
    return next(new ErrorResponse(`Project not found with id of ${id}`, 404));
  }

  const tasks = await Task.findAll({
    where: { project_id: id },
    order: [["createdAt", "DESC"]],
  });

  console.log("GET method on /projects/:ID/tasks: SUCCESSFULL");
  res.status(200).json(tasks);
};

// GET ONE /tasks/:id
export const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${id}`, 404));
  }
  console.log("GET method on /tasks/:ID: SUCCESSFULL");
  res.status(200).json(task);
};

// CREATE ONE task
export const createTask = async (req, res, next) => {
  const { project_id, title, content, status, deadline, priority, pinned } =
    req.body;

  const task = await Task.create({
    project_id,
    title,
    content,
    status,
    deadline,
    priority,
    pinned,
  });
  console.log("POST method on /tasks: SUCCESSFULL");
  res.status(201).json(task);
};

// UPDATE ONE task
export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { project_id, title, content, status, deadline, priority, pinned } =
    req.body;

  const task = await Task.findByPk(id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${id}`, 404));
  }

  await task.update({
    project_id,
    title,
    content,
    status,
    deadline,
    priority,
    pinned,
  });
  console.log("PUT method on /tasks/:ID: SUCCESSFULL");
  res.status(200).json(task);
};

// PATCH task (to update only some fields)
export const patchTask = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const task = await Task.findByPk(id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${id}`, 404));
  }
  console.log("UPDATE BODY:", updates);
  await task.update(updates);
  console.log("PATCH method on /tasks/:ID: SUCCESSFULL");
  res.status(200).json(task);
};

// DELETE ONE task
export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${id}`, 404));
  }

  await task.destroy();
  console.log("DELETE method on /tasks/:ID: SUCCESSFULL");
  res.status(204).json({ success: true });
};
