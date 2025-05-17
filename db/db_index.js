import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

// Import models
import { setAssociations } from "../models/associations.js";
import Note from "../models/Note.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import TaskNoteJoin from "../models/Task_Note.js";

dotenv.config();

// set DB-URI for seuqelize
const sequelize = new Sequelize(process.env.DB_URI_NEON);

// Initialize models
const models = {
  User: User(sequelize, DataTypes),
  Project: Project(sequelize, DataTypes),
  Task: Task(sequelize, DataTypes),
  Note: Note(sequelize, DataTypes),
  TaskNoteJoin: TaskNoteJoin(sequelize, DataTypes),
};
setAssociations(models);

export { sequelize, models };
