import { models } from "../db/db_index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const User = models.User;
dotenv.config();

// GET /auth/me
export const getUserData = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("GET method on /auth/me SUCCESSFULL");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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
    console.log("POST/SIGNIN method on /auth/signin SUCCESSFULL");
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// POST /auth/signup
export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    console.log("POST/SIGNUP method on /auth/signup SUCCESSFULL");
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
