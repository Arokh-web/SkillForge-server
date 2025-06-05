import { models } from "../db/db_index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const User = models.User;

// GET ALL /users - ADMIN ONLY
export const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  console.log("GET method on /users: SUCCESSFULL");
  res.status(200).json(users);
};

// GET ONE /users/me/ - USER ONLY

export const getAuthenticatedUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// CREATE ONE user
export const createUser = async (req, res, next) => {
  const { username, email, password_hash, role, xp, bio, profile_pic } =
    req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(
      new ErrorResponse(`User already exists with email ${email}`, 400)
    );
  }

  const user = await User.create({
    username,
    email,
    password_hash,
    role,
    xp,
    bio,
    profile_pic,
  });

  console.log("POST method on /users: SUCCESSFULL");
  res.status(201).json(user);
};

// UPDATE ONE user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password_hash, role, xp, bio, profile_pic } =
    req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${id}`, 404));
  }

  await user.update({
    username,
    email,
    password_hash,
    role,
    xp,
    bio,
    profile_pic,
  });
  console.log("PUT method on /users/:ID: SUCCESSFULL");
  res.status(200).json(user);
};

// DELETE ONE user
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${id}`, 404));
  }

  await user.destroy();
  console.log("DELETE method on /users/:ID: SUCCESSFULL");
  res.status(204).json({ success: true });
};
