const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  createdBy: {
    type: String,
    default: "Admin"
  },

  isPinned: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Announcement",
  announcementSchema
);
