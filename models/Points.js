const mongoose = require("mongoose");

const pointsSchema = new mongoose.Schema({

  teamName: {
    type: String,
    required: true
  },

  kills: {
    type: Number,
    default: 0
  },

  placement: {
    type: Number,
    default: 0
  },

  totalPoints: {
    type: Number,
    default: 0
  },

  matchNumber: {
    type: Number,
    default: 1
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Points",
  pointsSchema
);
