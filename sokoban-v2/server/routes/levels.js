const express = require("express");
const { defaultLevel } = require("../../client/src/data/levels");
const Level = require("../models/Level");
const { auth, admin } = require("../middlewares/auth");
const router = express.Router();

// Get latest active level
router.get("/latest", async (req, res) => {
  try {
    const level = await Level.findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .populate("createdBy", "username");

    if (!level) {
      return res.send({
        layout: defaultLevel,
        createdAt: new Date(),
        createdBy: { username: "system" },
      });
    }

    res.send(level);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Create new level (admin only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const { layout } = req.body;
    if (
      !Array.isArray(layout) ||
      layout.length === 0 ||
      !Array.isArray(layout[0])
    ) {
      throw new Error("Invalid level layout format");
    }

    await Level.updateMany({ isActive: true }, { isActive: false });

    const level = new Level({
      layout,
      createdBy: req.user._id,
    });
    await level.save();

    res.status(201).send(level);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
