import { models } from "../db/db_index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const User = models.User;
dotenv.config();

// POST /auth/signin
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findByPk(decoded.userId);
    console.log("POST/SIGNIN method on /auth/signin SUCCESSFULL");
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 6 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

// POST /auth/signup
export const signUp = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      role: role || "user",
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    console.log("POST/SIGNUP method on /auth/signup SUCCESSFULL");
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 6 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /auth/signout
export const signOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 6 * 24 * 60 * 60 * 1000,
    });
    console.log("POST/SIGNOUT method on /auth/signout SUCCESSFULL");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    return res.status(500).json({ error: "Failed to log out" });
  }
};
