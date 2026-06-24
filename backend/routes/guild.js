const express = require("express");
const Guild = require("../models/Guild");
const User = require("../models/User");

const router = express.Router();

/*
GET ALL GUILDS
*/

router.get("/", async (req, res) => {
try {

const guilds =
  await Guild.find()
  .populate("leader", "username")
  .populate("members", "username");

res.json({
  success: true,
  guilds
});

} catch (error) {

res.status(500).json({
  success: false
});

}
});

/*
CREATE GUILD
*/

router.post("/create", async (req, res) => {
try {

const guild =
  await Guild.create({
    name: req.body.name,
    description:
      req.body.description,
    leader:
      req.body.userId,
    members: [
      req.body.userId
    ]
  });

await User.findByIdAndUpdate(
  req.body.userId,
  {
    guild: guild._id
  }
);

res.json({
  success: true,
  guild
});

} catch (error) {

res.status(500).json({
  success: false,
  message:
    "Guild creation failed"
});

}
});

/*
JOIN GUILD
*/

router.post("/join/:id", async (req, res) => {
try {

const guild =
  await Guild.findById(
    req.params.id
  );

if (!guild) {
  return res.status(404).json({
    success: false
  });
}

if (
  guild.members.includes(
    req.body.userId
  )
) {
  return res.status(400).json({
    success: false,
    message:
      "Already joined"
  });
}

guild.members.push(
  req.body.userId
);

await guild.save();

await User.findByIdAndUpdate(
  req.body.userId,
  {
    guild: guild._id
  }
);

res.json({
  success: true,
  message:
    "Guild joined"
});

} catch (error) {

res.status(500).json({
  success: false
});

}
});

  /*
DELETE GUILD
*/
router.delete(
"/delete/:id",
async (req, res) => {
try {

await Guild.findByIdAndDelete(
req.params.id
);

res.json({
success:true,
message:"Guild Deleted"
});

} catch(error) {

res.status(500).json({
success:false
});

}
});

module.exports = router;
