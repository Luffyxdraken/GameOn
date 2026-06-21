const mongoose = require("mongoose");

const adminSettingsSchema = new mongoose.Schema({

  /*
  Tournament Settings
  */
  prizePool: {
    type: Number,
    default: 0
  },

  registrationFee: {
    type: Number,
    default: 0
  },

  maxSlots: {
    type: Number,
    default: 48
  },

  killPoint: {
    type: Number,
    default: 1
  },

  /*
  Placement Points
  */
  placementPoints: {

    first: {
      type: Number,
      default: 15
    },

    second: {
      type: Number,
      default: 12
    },

    third: {
      type: Number,
      default: 10
    },

    fourth: {
      type: Number,
      default: 8
    },

    fifth: {
      type: Number,
      default: 6
    },

    sixth: {
      type: Number,
      default: 4
    },

    seventh: {
      type: Number,
      default: 2
    },

    eighth: {
      type: Number,
      default: 1
    }

  },

  /*
  Room Visibility
  */
  showRoomDetails: {
    type: Boolean,
    default: false
  },

  roomReleaseTime: {
    type: Date,
    default: null
  },

  /*
  Notifications
  */
  adminTagNotifications: {
    type: Boolean,
    default: true
  },

  /*
  Site Settings
  */
  siteName: {
    type: String,
    default: "PR eSports"
  },

  maintenanceMode: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "AdminSettings",
  adminSettingsSchema
);
