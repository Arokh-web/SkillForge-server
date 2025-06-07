// Define the Project model

export default (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      title: { type: DataTypes.STRING(50), allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.STRING(25), defaultValue: "active" },
      deadline: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      priority: { type: DataTypes.STRING(25), defaultValue: "normal" },
      completed_at: DataTypes.DATE,
      pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { tableName: "projects" }
  );
  return Project;
};
