const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  ign: {
    type: String,
    required: true
  },

  uid: {
    type: Number,
    required: true
  },

  role: {
    type: String,
    enum: ["superadmin", "admin", "member"],
    default: "member"
  },

  status: {
    type: String,
    enum: ["active", "banned"],
    default: "active"
  },

  points: {
    type: Number,
    default: 0
  },

  kills: {
    type: Number,
    default: 0
  },

  tournamentsPlayed: {
    type: Number,
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);
