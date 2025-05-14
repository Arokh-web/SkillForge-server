import sequelize from "../db/db_index";
import { DataTypes } from "sequelize";

// Define the Task+Notes JOIN model:

const TaskNoteJoin = sequelize.define(
  "TaskNoteJoin",
  {},
  {
    tableName: "task_notes",
    // sequelize will not add the timestamp fields (createdAt, updatedAt) to the table
    // because it is a join table
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["task_id", "note_id"],
      },
    ],
  }
);

export default TaskNoteJoin;
