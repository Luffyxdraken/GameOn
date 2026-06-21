const mongoose = require("mongoose");

const scrimSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  gameMode: {
    type: String,
    enum: [
      "solo",
      "duo",
      "squad"
    ],
    default: "squad"
  },

  map: {
    type: String,
    default: "Bermuda"
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: [
      "upcoming",
      "live",
      "completed",
      "cancelled"
    ],
    default: "upcoming"
  },

  totalSlots: {
    type: Number,
    required: true
  },

  filledSlots: {
    type: Number,
    default: 0
  },

  prizePool: {
    type: Number,
    default: 0
  },

  perKillPoint: {
    type: Number,
    default: 1
  },

  roomId: {
    type: String,
    default: ""
  },

  roomPassword: {
    type: String,
    default: ""
  },

  roomReleased: {
    type: Boolean,
    default: false
  },

  registrations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "MatchRegistration"
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "Scrim",
  scrimSchema
);
