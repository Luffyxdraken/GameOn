const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

  teamName: {
    type: String,
    required: true,
    unique: true
  },

  logo: {
    type: String,
    default: ""
  },

  description: {
    type: String,
    default: ""
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  coLeaders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  joinRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  maxMembers: {
    type: Number,
    default: 10
  },

  points: {
    type: Number,
    default: 0
  },

  wins: {
    type: Number,
    default: 0
  },

  matchesPlayed: {
    type: Number,
    default: 0
  },

  isRecruiting: {
    type: Boolean,
    default: true
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
  "Team",
  teamSchema
);
