const express = require("express");
const Tournament = require("../models/Tournament");

const router = express.Router();

/*

GET ALL TOURNAMENTS
/api/tournaments

*/

router.get("/", async (req, res) => {
try {

const tournaments =
await Tournament.find()
.sort({ createdAt: -1 });

res.json({
success: true,
count: tournaments.length,
tournaments
});

} catch (error) {
console.error(error);

res.status(500).json({
success: false,
message: "Server Error"
});
}
});

/*

GET SINGLE TOURNAMENT
/api/tournaments/:id

*/

router.get("/:id", async (req, res) => {
try {

const tournament =
await Tournament.findById(
req.params.id
);

if (!tournament) {
return res.status(404).json({
success: false,
message: "Tournament not found"
});
}

res.json({
success: true,
tournament
});

} catch (error) {
console.error(error);

res.status(500).json({
success: false,
message: "Server Error"
});
}
});

/*

CREATE TOURNAMENT
/api/tournaments/create

*/

router.post("/create", async (req, res) => {
try {

const tournament =
await Tournament.create({
title: req.body.title,
type: req.body.type,
description:
req.body.description,

prizePool:
req.body.prizePool,

entryFee:
req.body.entryFee,

totalSlots:
req.body.totalSlots,

startTime:
req.body.startTime,

roomId:
req.body.roomId,

roomPassword:
req.body.roomPassword,

status: "upcoming"
});

res.status(201).json({
success: true,
tournament
});

} catch (error) {
console.error(error);

res.status(500).json({
success: false,
message:
"Failed to create tournament"
});
}
});

/*

JOIN TOURNAMENT
/api/tournaments/join/:id

*/

router.post("/join/:id", async (req, res) => {
try {

const tournament =
await Tournament.findById(
req.params.id
);

if (!tournament) {
return res.status(404).json({
success: false,
message: "Tournament not found"
});
}

if (
tournament.filledSlots >=
tournament.totalSlots
) {
return res.status(400).json({
success: false,
message: "Tournament Full"
});
}

const playerId =
req.body.playerId;

if (
tournament.joinedPlayers.includes(
playerId
)
) {
return res.status(400).json({
success: false,
message:
"Already joined tournament"
});
}

tournament.joinedPlayers.push(
playerId
);

tournament.filledSlots += 1;

await tournament.save();

res.json({
success: true,
message:
"Tournament Joined Successfully"
});

} catch (error) {
console.error(error);

res.status(500).json({
success: false,
message: "Server Error"
});
}
});

/*

PUBLISH ROOM DETAILS
/api/tournaments/publish-room/:id

*/

router.put(
"/publish-room/:id",
async (req, res) => {
try {

const tournament =
await Tournament.findById(
req.params.id
);

if (!tournament) {
return res.status(404).json({
success: false
});
}

tournament.roomId =
req.body.roomId;

tournament.roomPassword =
req.body.roomPassword;

await tournament.save();

res.json({
success: true,
message:
"Room Published"
});

} catch (error) {
console.error(error);

res.status(500).json({
success: false
});
}
}
);

/*

PUBLISH RESULTS
/api/tournaments/results/:id

*/

router.put(
"/results/:id",
async (req, res) => {
try {

const tournament =
await Tournament.findById(
req.params.id
);

if (!tournament) {
return res.status(404).json({
success: false
});
}

tournament.results =
req.body.results;

tournament.resultsPublished =
true;

tournament.status =
"completed";

await tournament.save();

res.json({
success: true,
message:
"Results Published"
});

} catch (error) {
console.error(error);

res.status(500).json({
success: false
});
}
}
);

module.exports = router;
