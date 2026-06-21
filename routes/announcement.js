const express = require("express");

const Announcement = require("../models/Announcement");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET ALL ANNOUNCEMENTS
*/
router.get("/", async (req, res) => {

  try {

    const announcements =
      await Announcement.find()
      .sort({ createdAt: -1 });

    res.json(announcements);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/*
GET PINNED ANNOUNCEMENT
*/
router.get("/pinned", async (req, res) => {

  try {

    const announcement =
      await Announcement.findOne({
        isPinned: true
      });

    res.json(announcement);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/*
CREATE ANNOUNCEMENT
ADMIN ONLY
*/
router.post(
  "/create",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        title,
        message,
        isPinned
      } = req.body;

      const announcement =
        new Announcement({
          title,
          message,
          isPinned
        });

      await announcement.save();

      res.status(201).json({
        message: "Announcement Created",
        announcement
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE ANNOUNCEMENT
ADMIN ONLY
*/
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const announcement =
        await Announcement.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json({
        message: "Announcement Updated",
        announcement
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE ANNOUNCEMENT
ADMIN ONLY
*/
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      await Announcement.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Announcement Deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
