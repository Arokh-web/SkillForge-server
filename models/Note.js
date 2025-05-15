import e from "express";
import sequelize from "../db/db_index";
import { DataTypes } from "sequelize";

// Define the Note model:

const Note = sequelize.define("Note", {
  title: DataTypes.STRING(50),
  content: { type: DataTypes.TEXT, allowNull: false },
  pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Note;
