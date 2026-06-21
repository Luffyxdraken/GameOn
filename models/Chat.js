const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  senderName: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  chatType: {
    type: String,
    enum: [
      "global",
      "team",
      "tournament",
      "admin"
    ],
    default: "global"
  },

  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null
  },

  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    default: null
  },

  mentionsAdmin: {
    type: Boolean,
    default: false
  },

  edited: {
    type: Boolean,
    default: false
  },

  deleted: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "Chat",
  chatSchema
);
