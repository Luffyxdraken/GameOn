const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
unique: true
},

description: {
type: String,
default: ""
},

logo: {
type: String,
default: ""
},

leader: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

members: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
],

chatMessages: [
{
sender: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

message: {
type: String,
required: true
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
"Guild",
guildSchema
);
