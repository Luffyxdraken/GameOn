const express = require("express");
const Announcement = require("../models/Announcement");

const router = express.Router();

/*
GET ALL ANNOUNCEMENTS
/api/announcements
*/

router.get("/", async (req, res) => {
try {

const announcements =
  await Announcement.find()
  .sort({ createdAt: -1 });

res.json({
  success: true,
  announcements
});

} catch (error) {

res.status(500).json({
  success: false,
  message: "Server Error"
});

}
});

/*
CREATE ANNOUNCEMENT
/api/announcements/create
*/

router.post("/create", async (req, res) => {
try {

const announcement =
  await Announcement.create({
    title: req.body.title,
    message: req.body.message
  });

res.json({
  success: true,
  announcement
});

} catch (error) {

res.status(500).json({
  success: false,
  message:
    "Failed to create announcement"
});

}
});

module.exports = router;
