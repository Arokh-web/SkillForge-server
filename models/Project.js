import sequelize from "../db/db_index";
import { DataTypes } from "sequelize";

// Define the Project model

const Project = sequelize.define("Project", {
  title: { type: DataTypes.STRING(50), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING(25), defaultValue: "active" },
  deadline: DataTypes.DATE,
  created_at: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  updated_at: DataTypes.DATE,
  priority: { type: DataTypes.STRING(25), defaultValue: "normal" },
  completed_at: DataTypes.DATE,
  pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Project;
