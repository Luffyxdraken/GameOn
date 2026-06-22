const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
username: {
type: String,
required: true,
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

uid: {
type: String,
default: ""
},

profilePhoto: {
type: String,
default: ""
},

bio: {
type: String,
default: ""
},

role: {
type: String,
enum: [
"player",
"admin",
"superadmin"
],
default: "player"
},

guild: {
type: mongoose.Schema.Types.ObjectId,
ref: "Team",
default: null
},

notifications: [
{
message: String,
read: {
type: Boolean,
default: false
},

  createdAt: {
    type: Date,
    default: Date.now
  }
}

]
},
{
timestamps: true
}
);

module.exports = mongoose.model(
"User",
userSchema
);
