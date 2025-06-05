import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createUserSchema, signInSchema } from "../schemas/userSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
import { getAuthenticatedUser } from "../controllers/users.js";

// Ensure that all imported modules exist and are correctly exported in their respective files.

const authRouter = Router();

authRouter.route("/signup").post(validateSchema(createUserSchema), signUp);
authRouter.route("/signin").post(validateSchema(signInSchema), signIn);
authRouter.route("/me").get(verifyToken, getAuthenticatedUser);

export default authRouter;
