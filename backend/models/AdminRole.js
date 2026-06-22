const mongoose = require("mongoose");

const adminRoleSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  role: {
    type: String,
    enum: [
      "owner",
      "admin",
      "moderator"
    ],
    default: "admin"
  },

  permissions: {

    manageUsers: {
      type: Boolean,
      default: false
    },

    manageAdmins: {
      type: Boolean,
      default: false
    },

    manageTournaments: {
      type: Boolean,
      default: true
    },

    manageScrims: {
      type: Boolean,
      default: true
    },

    manageResults: {
      type: Boolean,
      default: true
    },

    manageAnnouncements: {
      type: Boolean,
      default: true
    },

    manageChat: {
      type: Boolean,
      default: true
    },

    manageNotifications: {
      type: Boolean,
      default: true
    }

  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  active: {
    type: Boolean,
    default: true
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "AdminRole",
  adminRoleSchema
);
