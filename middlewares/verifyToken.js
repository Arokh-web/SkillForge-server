import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { models } from "../db/db_index.js";
const User = models.User;

const verifyToken = async (req, res, next) => {
  console.log("verifyToken is", typeof verifyToken);
  console.log("VERIFY TOKEN MIDDLEWARE TRIGGERED");
  console.log("Cookies:", req.cookies);
  console.log("Token:", req.cookies.token);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    // Verifying the token with the secret and saving it as payload
    console.log("Verifying token!");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified!");
    const user = await User.findByPk(payload.userId, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) return res.status(401).json({ error: "Invalid user" });
    console.log("User found:", user);
    req.user = user;
    next();
  } catch (e) {
    console.error("Token verification failed:", e.message);
    return res
      .status(401)
      .json({ error: "Unauthorized access. Invalid token." });
  }
};

export default verifyToken;
