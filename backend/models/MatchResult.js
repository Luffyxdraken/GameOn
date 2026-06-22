const mongoose = require("mongoose");

const matchResultSchema = new mongoose.Schema({

  scrimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scrim",
    required: true
  },

  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MatchRegistration",
    required: true
  },

  teamName: {
    type: String,
    required: true
  },

  teamTag: {
    type: String,
    default: ""
  },

  position: {
    type: Number,
    required: true
  },

  kills: {
    type: Number,
    default: 0
  },

  positionPoints: {
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

  matchNumber: {
    type: Number,
    default: 1
  },

  published: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "MatchResult",
  matchResultSchema
);
