import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import setAssociations from "../models/associations";
import Note from "../models/Note";
import User from "../models/User";
import Project from "../models/Project";
import Task from "../models/Task";
import TaskNoteJoin from "../models/Task_Note";
import { DataTypes } from "sequelize";

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
