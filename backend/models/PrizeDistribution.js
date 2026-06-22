const mongoose = require("mongoose");

const prizeDistributionSchema = new mongoose.Schema({

  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },

  prizePool: {
    type: Number,
    required: true,
    default: 0
  },

  firstPrize: {
    type: Number,
    default: 0
  },

  secondPrize: {
    type: Number,
    default: 0
  },

  thirdPrize: {
    type: Number,
    default: 0
  },

  fourthPrize: {
    type: Number,
    default: 0
  },

  fifthPrize: {
    type: Number,
    default: 0
  },

  bonusPrize: {
    type: Number,
    default: 0
  },

  mvpPrize: {
    type: Number,
    default: 0
  },

  description: {
    type: String,
    default: ""
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
  "PrizeDistribution",
  prizeDistributionSchema
);
