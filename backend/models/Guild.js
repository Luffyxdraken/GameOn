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
