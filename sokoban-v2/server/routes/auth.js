const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth } = require("../middlewares/auth");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    res.status(201).send({ username: user.username, role: user.role, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    res.send({ username: user.username, role: user.role, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/logout", auth, async (req, res) => {
  res.send({ message: "Logged out successfully" });
});

module.exports = router;
