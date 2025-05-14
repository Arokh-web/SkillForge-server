import sequelize from "../db/db_index";
import { DataTypes } from "sequelize";

// Define the Task model

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING(255), allowNull: false },
  content: DataTypes.TEXT,
  status: { type: DataTypes.STRING(25), defaultValue: "active" },
  deadline: DataTypes.DATE,
  created_at: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  updated_at: DataTypes.DATE,
  completed_at: DataTypes.DATE,
  priority: { type: DataTypes.STRING(25), defaultValue: "normal" },
  pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Task;
