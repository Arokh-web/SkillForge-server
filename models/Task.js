// Define the Task model

export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      content: DataTypes.TEXT,
      status: { type: DataTypes.STRING(25), defaultValue: "active" },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deadline: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      completed_at: DataTypes.DATE,
      priority: { type: DataTypes.STRING(25), defaultValue: "normal" },
      pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { tableName: "tasks" }
  );
  return Task;
};
