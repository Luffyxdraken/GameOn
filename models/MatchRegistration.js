const mongoose = require("mongoose");

const matchRegistrationSchema = new mongoose.Schema({

  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },

  teamName: {
    type: String,
    required: true
  },

  captainName: {
    type: String,
    required: true
  },

  captainUID: {
    type: String,
    required: true
  },

  player1: {
    type: String,
    default: ""
  },

  player2: {
    type: String,
    default: ""
  },

  player3: {
    type: String,
    default: ""
  },

  player4: {
    type: String,
    default: ""
  },

  contact: {
    type: String,
    required: true
  },

  slotNumber: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected"
    ],
    default: "approved"
  },

  points: {
    type: Number,
    default: 0
  },

  kills: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "MatchRegistration",
  matchRegistrationSchema
);
