const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: [
      "admin",
      "announcement",
      "match",
      "result",
      "warning"
    ],
    default: "announcement"
  },

  targetUser: {
    type: String,
    default: "all"
  },

  isRead: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: String,
    default: "System"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
