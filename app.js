require('dotenv').config();
const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors');
app.use(cors());

const dbConnection = require('./db/dbConfig');

// User routes middleware file
const userRoutes = require("./Routes/user_route");

// Question routes middleware file
const questionRoutes = require("./Routes/questionRoute");

// Authentication middleware file 
const authMiddleware = require('./middleware/authMiddleware');

// JSON middleware to extract JSON data
app.use(express.json());

// User routes middleware
app.use("/api/users", userRoutes);

// Question routes middleware
app.use("/api/questions",  questionRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test'");
    await app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on ${port}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

start();

app.get("/", (req, res) => {
  res.send("Welcome");
});
