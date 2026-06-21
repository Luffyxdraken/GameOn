const express = require("express");

const Scrim = require("../models/Scrim");

const {
  verifyToken
} = require("../middleware/auth");

const router = express.Router();

/*
CREATE SCRIM
*/
router.post(
  "/create",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.create({

          title: req.body.title,
          description: req.body.description,

          gameMode: req.body.gameMode,

          map: req.body.map,

          date: req.body.date,
          time: req.body.time,

          totalSlots:
            req.body.totalSlots,

          prizePool:
            req.body.prizePool,

          perKillPoint:
            req.body.perKillPoint,

          createdBy:
            req.user.id

        });

      res.status(201).json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET ALL SCRIMS
*/
router.get(
  "/",
  async (req, res) => {

    try {

      const scrims =
        await Scrim.find()
        .sort({
          createdAt: -1
        });

      res.json(scrims);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET UPCOMING SCRIMS
*/
router.get(
  "/upcoming",
  async (req, res) => {

    try {

      const scrims =
        await Scrim.find({
          status: "upcoming"
        });

      res.json(scrims);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET LIVE SCRIMS
*/
router.get(
  "/live",
  async (req, res) => {

    try {

      const scrims =
        await Scrim.find({
          status: "live"
        });

      res.json(scrims);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET COMPLETED SCRIMS
*/
router.get(
  "/completed",
  async (req, res) => {

    try {

      const scrims =
        await Scrim.find({
          status: "completed"
        });

      res.json(scrims);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE SCRIM
*/
router.put(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true
          }

        );

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE SCRIM
*/
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      await Scrim.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Scrim deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
CHANGE STATUS
upcoming/live/completed/cancelled
*/
router.put(
  "/status/:id",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findById(
          req.params.id
        );

      if (!scrim) {
        return res.status(404).json({
          message:
            "Scrim not found"
        });
      }

      scrim.status =
        req.body.status;

      await scrim.save();

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE PRIZE POOL
*/
router.put(
  "/prizepool/:id",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findById(
          req.params.id
        );

      scrim.prizePool =
        req.body.prizePool;

      await scrim.save();

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE SLOT COUNT
*/
router.put(
  "/slots/:id",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findById(
          req.params.id
        );

      scrim.totalSlots =
        req.body.totalSlots;

      await scrim.save();

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
RELEASE ROOM DETAILS
*/
router.put(
  "/release-room/:id",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findById(
          req.params.id
        );

      scrim.roomId =
        req.body.roomId;

      scrim.roomPassword =
        req.body.roomPassword;

      scrim.roomReleased = true;

      await scrim.save();

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
HIDE ROOM DETAILS
*/
router.put(
  "/hide-room/:id",
  verifyToken,
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findById(
          req.params.id
        );

      scrim.roomReleased = false;

      await scrim.save();

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET SINGLE SCRIM
*/
router.get(
  "/:id",
  async (req, res) => {

    try {

      const scrim =
        await Scrim.findById(
          req.params.id
        );

      if (!scrim) {
        return res.status(404).json({
          message:
            "Scrim not found"
        });
      }

      res.json(scrim);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
