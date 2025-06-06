// Import required modules and middlewares
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

// Import database connection
import { sequelize } from "./db/db_index.js";

// Import routes
import notesRouter from "./routes/notes.js";
import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";
import authRouter from "./routes/authRouter.js";

// DATABASE CONNECTION
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDB();

// Define constants and usage of data
dotenv.config();
const port = process.env.API_PORT || 8080;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/auth", authRouter);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(errorHandler);
// Initializing server startup
app.listen(port, () => console.log(`Server is running on port ${port}`));
