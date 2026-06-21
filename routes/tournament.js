const express = require("express");
const Tournament = require("../models/Tournament");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET ALL TOURNAMENTS
*/
router.get("/", async (req, res) => {
  try {

    const tournaments = await Tournament.find({});

    res.status(200).json({
      success: true,
      count: tournaments.length,
      tournaments
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

/*
GET SINGLE TOURNAMENT
*/
router.get("/:id", async (req, res) => {
  try {

    const tournament = await Tournament.findById(
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

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

/*
CREATE TOURNAMENT
ADMIN ONLY
*/
router.post(
  "/create",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const tournament =
        new Tournament(req.body);

      await tournament.save();

      res.status(201).json({
        success: true,
        message: "Tournament Created",
        tournament
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
UPDATE TOURNAMENT
ADMIN ONLY
*/
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const tournament =
        await Tournament.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: "Tournament not found"
        });
      }

      res.json({
        success: true,
        message: "Tournament Updated",
        tournament
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
UPDATE ROOM DETAILS
ADMIN ONLY
*/
router.put(
  "/room/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        roomId,
        roomPassword
      } = req.body;

      const tournament =
        await Tournament.findByIdAndUpdate(
          req.params.id,
          {
            roomId,
            roomPassword
          },
          { new: true }
        );

      res.json({
        success: true,
        message: "Room Updated",
        tournament
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
PUBLISH RESULTS
ADMIN ONLY
*/
router.put(
  "/result/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        firstPlace,
        secondPlace,
        thirdPlace
      } = req.body;

      const tournament =
        await Tournament.findByIdAndUpdate(
          req.params.id,
          {
            firstPlace,
            secondPlace,
            thirdPlace,
            status: "Completed"
          },
          { new: true }
        );

      res.json({
        success: true,
        message: "Results Published",
        tournament
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
