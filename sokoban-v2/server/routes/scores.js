const express = require("express");
const Score = require("../models/Score");
const Level = require("../models/Level");
const { auth } = require("../middlewares/auth");
const router = express.Router();

// Submit score
router.post("/", auth, async (req, res) => {
  try {
    const { moves } = req.body;
    const latestLevel = await Level.findOne({ isActive: true }).sort({
      createdAt: -1,
    });

    const score = new Score({
      user: req.user._id,
      username: req.user.username,
      level: latestLevel ? latestLevel._id : null,
      moves,
    });
    await score.save();

    res.status(201).send(score);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const latestLevel = await Level.findOne({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!latestLevel) {
      return res.send([]);
    }

    const scores = await Score.find({ level: latestLevel._id })
      .sort({ moves: 1 })
      .limit(10)
      .select("username moves");

    res.send(scores);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
