const express = require("express");
const User = require("../models/User");

const router = express.Router();

/*
GET ALL USERS
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
MAKE ADMIN
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

module.exports = router;
