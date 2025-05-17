// Import required modules and middlewares
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

// Import database connection
import { sequelize } from "./db/db_index.js";

// Import routes
import notesRouter from "./routes/notes.js";
import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);

app.use(errorHandler);
// Initializing server startup
app.listen(port, () => console.log(`Server is running on port ${port}`));
