const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  banner: {
    type: String,
    default: "",
  },

  game: {
    type: String,
    default: "Free Fire Max",
  },

  tier: {
    type: String,
    default: "Tier 3",
  },

  prizePool: {
    type: Number,
    default: 0,
  },

  entryFee: {
    type: Number,
    default: 0,
  },

  totalSlots: {
    type: Number,
    default: 12,
  },

  filledSlots: {
    type: Number,
    default: 0,
  },

  registrationOpen: {
    type: Boolean,
    default: true,
  },

  status: {
    type: String,
    default: "Upcoming",
  },

  description: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model(
  "Tournament",
  TournamentSchema
);
