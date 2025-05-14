// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import database connection
import sequelize from "./db/db_index.js";

// Import routes

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

// Initializing server startup
app.listen(port, () => console.log(`Server is running on port ${port}`));
