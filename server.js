// Import required modules and middlewares
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

// Import database connection
import { sequelize } from "./db/db_index.js";

// Import routes
import noteRouter from "./routes/note.js";

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
app.use("/api/notes", noteRouter);

app.use(errorHandler);
// Initializing server startup
app.listen(port, () => console.log(`Server is running on port ${port}`));
