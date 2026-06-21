const express = require("express");

const AdminSettings = require("../models/AdminSettings");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET SETTINGS
*/
router.get(
  "/",
  async (req, res) => {

    try {

      let settings =
        await AdminSettings.findOne();

      if (!settings) {

        settings =
          await AdminSettings.create({});

      }

      res.json(settings);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE SETTINGS
ADMIN ONLY
*/
router.put(
  "/update",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      let settings =
        await AdminSettings.findOne();

      if (!settings) {

        settings =
          await AdminSettings.create({});
      }

      Object.assign(
        settings,
        req.body
      );

      await settings.save();

      res.json({
        message:
          "Settings Updated Successfully",
        settings
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
TOGGLE MAINTENANCE MODE
ADMIN ONLY
*/
router.patch(
  "/maintenance",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      let settings =
        await AdminSettings.findOne();

      if (!settings) {

        settings =
          await AdminSettings.create({});
      }

      settings.maintenanceMode =
        !settings.maintenanceMode;

      await settings.save();

      res.json({
        maintenanceMode:
          settings.maintenanceMode
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
TOGGLE ROOM VISIBILITY
ADMIN ONLY
*/
router.patch(
  "/room-visibility",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      let settings =
        await AdminSettings.findOne();

      if (!settings) {

        settings =
          await AdminSettings.create({});
      }

      settings.showRoomDetails =
        !settings.showRoomDetails;

      await settings.save();

      res.json({
        showRoomDetails:
          settings.showRoomDetails
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
