const express = require("express");

const Chat = require("../models/Chat");
const Notification = require("../models/Notification");
const User = require("../models/User");

const {
  verifyToken
} = require("../middleware/auth");

const router = express.Router();

/*
GET ALL CHATS
*/
router.get("/", async (req, res) => {

  try {

    const chats = await Chat.find({
      deleted: false
    })
    .sort({ createdAt: -1 })
    .limit(100);

    res.json({
      success: true,
      count: chats.length,
      chats
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


/*
SEND MESSAGE
*/
router.post(
  "/send",
  verifyToken,
  async (req, res) => {

    try {

      const {
        message,
        chatType,
        teamId,
        tournamentId
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const mentionsAdmin =
        message.toLowerCase()
        .includes("@admin");

      const chat =
        await Chat.create({

          sender: user._id,

          senderName:
            user.ign || user.username,

          message,

          chatType:
            chatType || "global",

          teamId:
            teamId || null,

          tournamentId:
            tournamentId || null,

          mentionsAdmin

        });

      if (mentionsAdmin) {

        const admins =
          await User.find({
            role: "admin"
          });

        for (const admin of admins) {

          await Notification.create({

            user: admin._id,

            title: "Admin Mention",

            message:
              `${user.ign || user.username} mentioned @admin`,

            type: "admin"

          });

        }

      }

      res.status(201).json({
        success: true,
        message: "Message Sent",
        chat
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/*
GET GLOBAL CHAT
*/
router.get(
  "/global",
  async (req, res) => {

    try {

      const chats =
        await Chat.find({
          chatType: "global",
          deleted: false
        })
        .sort({ createdAt: -1 })
        .limit(100);

      res.json({
        success: true,
        count: chats.length,
        chats
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/*
GET TEAM CHAT
*/
router.get(
  "/team/:teamId",
  async (req, res) => {

    try {

      const chats =
        await Chat.find({
          teamId: req.params.teamId,
          deleted: false
        })
        .sort({ createdAt: -1 })
        .limit(100);

      res.json({
        success: true,
        count: chats.length,
        chats
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/*
GET TOURNAMENT CHAT
*/
router.get(
  "/tournament/:tournamentId",
  async (req, res) => {

    try {

      const chats =
        await Chat.find({
          tournamentId: req.params.tournamentId,
          deleted: false
        })
        .sort({ createdAt: -1 })
        .limit(100);

      res.json({
        success: true,
        count: chats.length,
        chats
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/*
EDIT MESSAGE
*/
router.put(
  "/edit/:id",
  verifyToken,
  async (req, res) => {

    try {

      const chat =
        await Chat.findById(
          req.params.id
        );

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Message not found"
        });
      }

      if (
        chat.sender.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "Not allowed"
        });
      }

      chat.message =
        req.body.message;

      chat.edited = true;

      await chat.save();

      res.json({
        success: true,
        message: "Message Updated",
        chat
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/*
DELETE MESSAGE
*/
router.delete(
  "/delete/:id",
  verifyToken,
  async (req, res) => {

    try {

      const chat =
        await Chat.findById(
          req.params.id
        );

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Message not found"
        });
      }

      if (
        chat.sender.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "Not allowed"
        });
      }

      chat.deleted = true;

      await chat.save();

      res.json({
        success: true,
        message: "Message Deleted"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

module.exports = router;
