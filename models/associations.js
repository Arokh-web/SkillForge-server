// Define the associations between models

export function setAssociations(models) {
  const { User, Project, Task, Note, TaskNoteJoin } = models;

  // User -> Project
  User.hasMany(Project, {
    foreignKey: "user_id",
  });
  Project.belongsTo(User, {
    foreignKey: "user_id",
  });

  // Task -> Project
  Project.hasMany(Task, {
    foreignKey: "project_id",
  });
  Task.belongsTo(Project, {
    foreignKey: "project_id",
  });

  // Project -> Note
  Project.hasMany(Note, {
    foreignKey: "project_id",
  });
  Note.belongsTo(Project, {
    foreignKey: "project_id",
  });

  // Task -> Note
  Task.belongsToMany(Note, {
    through: TaskNoteJoin,
    foreignKey: "task_id",
    otherKey: "note_id",
  });
  Note.belongsToMany(Task, {
    through: TaskNoteJoin,
    foreignKey: "note_id",
    otherKey: "task_id",
  });
}
