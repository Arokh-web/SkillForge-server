import { models } from "../db/db_index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const User = models.User;

// GET ALL /users - ADMIN ONLY (checked by  middleware)
export const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  console.log("GET method on /users: SUCCESSFULL");
  res.status(200).json(users);
};

// GET ONE /users/me/ - USER ONLY
export const getAuthenticatedUser = async (req, res) => {
  console.log("GET AUTH USER TRIGGERED");
  const user = req.user; // The user is set by the verifyToken middleware now!
  res.status(200).json(user);
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
  const { username, email, bio } = req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${id}`, 404));
  }

  await user.update({
    username,
    email,
    bio,
  });
  console.log("PATCH method on /users/:ID: SUCCESSFULL");
  console.log("User updated:", user);
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
