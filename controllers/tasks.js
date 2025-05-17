import { models } from "../db/db_index.js";
import ErrorResponse from "../utils/errorResponse.js";

const Task = models.Task;

// GET ALL /tasks
export const getAllTasks = async (req, res, next) => {
  const tasks = await Task.findAll();
  console.log("GET method on /tasks: SUCCESSFULL");
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
