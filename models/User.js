import sequelize from "../db/db_index";
import { DataTypes } from "sequelize";

// Define the User model
const User = sequelize.define("User", {
  username: { type: DataTypes.STRING(25), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  password_hash: { type: DataTypes.TEXT, allowNull: false },
  role: DataTypes.STRING(25),
  xp: DataTypes.INTEGER,
  bio: DataTypes.TEXT,
  profile_pic: DataTypes.TEXT,
  created_at: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  updated_at: DataTypes.DATE,
});

export default User;
