const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
{
title: {
type: String,
required: true
},

type: {
type: String,
enum: [
"solo",
"squad",
"guildwar"
],
default: "solo"
},

description: {
type: String,
default: ""
},

prizePool: {
type: Number,
default: 0
},

entryFee: {
type: Number,
default: 0
},

totalSlots: {
type: Number,
default: 12
},

filledSlots: {
type: Number,
default: 0
},

status: {
type: String,
enum: [
"upcoming",
"live",
"completed"
],
default: "upcoming"
},

startTime: {
type: Date
},

roomId: {
type: String,
default: ""
},

roomPassword: {
type: String,
default: ""
},

createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

joinedPlayers: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
],

admins: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
],

resultsPublished: {
type: Boolean,
default: false
},

results: [
{
player: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

position: Number,

kills: {
type: Number,
default: 0
},

points: {
type: Number,
default: 0
}
}
],

chatMessages: [
{
sender: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

message: String,

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
"Tournament",
tournamentSchema
);
