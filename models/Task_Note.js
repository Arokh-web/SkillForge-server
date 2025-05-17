// Define the Task+Notes JOIN model:

export default (sequelize, DataTypes) => {
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
  return TaskNoteJoin;
};
