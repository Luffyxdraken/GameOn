const express = require("express");
const User = require("../models/User");

const router = express.Router();

/*
GET LEADERBOARD
/api/users/leaderboard
*/

router.get(
"/leaderboard",
async (req, res) => {
try {

const players =
  await User.find()
  .select("-password")
  .sort({
    points: -1
  });

res.json({
  success: true,
  players
});

} catch (error) {

res.status(500).json({
  success: false,
  message: "Server Error"
});

}
});

/*
GET ALL USERS
/api/users
*/

router.get("/", async (req, res) => {
try {

const users =
  await User.find()
  .select("-password");

res.json({
  success: true,
  count: users.length,
  users
});

} catch (error) {

res.status(500).json({
  success: false,
  message: "Server Error"
});

}
});

/*
GET SINGLE USER
/api/users/:id
*/

router.get("/:id", async (req, res) => {
try {

const user =
  await User.findById(
    req.params.id
  ).select("-password");

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}

res.json({
  success: true,
  user
});

} catch (error) {

res.status(500).json({
  success: false,
  message: "Server Error"
});

}
});

/*
MAKE ADMIN
/api/users/make-admin/:id
*/

router.put(
"/make-admin/:id",
async (req, res) => {
try {

const user =
  await User.findById(
    req.params.id
  );

if (!user) {
  return res.status(404).json({
    success: false
  });
}

user.role = "admin";

await user.save();

res.json({
  success: true,
  message:
    "User promoted to admin"
});

} catch (error) {

res.status(500).json({
  success: false
});

}
});

/*
REMOVE ADMIN
/api/users/remove-admin/:id
*/

router.put(
"/remove-admin/:id",
async (req, res) => {
try {

const user =
  await User.findById(
    req.params.id
  );

if (!user) {
  return res.status(404).json({
    success: false
  });
}

user.role = "player";

await user.save();

res.json({
  success: true,
  message:
    "Admin removed"
});

} catch (error) {

res.status(500).json({
  success: false
});

}
});

/*
LEADERBOARD
*/

router.get(
"/leaderboard",
async (req,res) => {

try {

const users =
await User.find()
.sort({
points:-1
})
.limit(100)
.select(
"username kills wins points kd"
);

res.json({
success:true,
users
});

} catch(error) {

res.status(500).json({
success:false
});

}

});

module.exports = router;
