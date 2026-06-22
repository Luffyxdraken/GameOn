const express = require("express");

const Notification = require("../models/Notification");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET ALL NOTIFICATIONS
*/
router.get("/", async (req, res) => {

  try {

    const notifications =
      await Notification.find()
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/*
GET USER NOTIFICATIONS
*/
router.get(
  "/user/:username",
  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          $or: [
            {
              targetUser: "all"
            },
            {
              targetUser:
                req.params.username
            }
          ]
        }).sort({
          createdAt: -1
        });

      res.json(notifications);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
CREATE NOTIFICATION
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
        type,
        targetUser
      } = req.body;

      const notification =
        new Notification({
          title,
          message,
          type,
          targetUser
        });

      await notification.save();

      res.status(201).json({
        message:
          "Notification Sent",
        notification
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
MARK AS READ
*/
router.put(
  "/read/:id",
  async (req, res) => {

    try {

      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true
          },
          {
            new: true
          }
        );

      res.json({
        message:
          "Marked As Read",
        notification
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE NOTIFICATION
ADMIN ONLY
*/
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      await Notification.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Notification Deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
