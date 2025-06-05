// Define the User model
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING(25), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      password_hash: { type: DataTypes.TEXT, allowNull: false },
      role: DataTypes.STRING(25),
      xp: DataTypes.INTEGER,
      bio: DataTypes.TEXT,
      profile_pic: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    { tableName: "users" }
  );
  return User;
};
