const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: true,
  },
  moves: {
    type: Number,
    required: true,
    min: 1,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Score", ScoreSchema);
