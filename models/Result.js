const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },

  teamName: {
    type: String,
    required: true
  },

  slotNumber: {
    type: Number,
    default: 0
  },

  placement: {
    type: Number,
    required: true
  },

  kills: {
    type: Number,
    default: 0
  },

  placementPoints: {
    type: Number,
    default: 0
  },

  killPoints: {
    type: Number,
    default: 0
  },

  totalPoints: {
    type: Number,
    default: 0
  },

  prize: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Result",
  resultSchema
);
