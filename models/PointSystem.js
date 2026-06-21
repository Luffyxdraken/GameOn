const mongoose = require("mongoose");

const pointSystemSchema = new mongoose.Schema({

  name: {
    type: String,
    default: "Default"
  },

  killPoint: {
    type: Number,
    default: 1
  },

  placements: {

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
      default: 5
    },

    seventh: {
      type: Number,
      default: 4
    },

    eighth: {
      type: Number,
      default: 3
    },

    ninth: {
      type: Number,
      default: 2
    },

    tenth: {
      type: Number,
      default: 1
    }

  },

  active: {
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
  "PointSystem",
  pointSystemSchema
);
