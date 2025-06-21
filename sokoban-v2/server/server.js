const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const levelRoutes = require("./routes/levels");
const scoreRoutes = require("./routes/scores");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/levels", levelRoutes);
app.use("/api/scores", scoreRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Sokoban Game API");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
