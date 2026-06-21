const express = require("express");

const Tournament = require("../models/Tournament");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET CURRENT TOURNAMENT
*/
router.get("/", async (req, res) => {
  try {

    const tournament =
      await Tournament.findOne();

    res.json(tournament);

  } catch (error) {

    res.status(500).json({
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
        message: "Tournament Created",
        tournament
      });

    } catch (error) {

      res.status(500).json({
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

      res.json({
        message: "Tournament Updated",
        tournament
      });

    } catch (error) {

      res.status(500).json({
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
        message: "Room Updated",
        tournament
      });

    } catch (error) {

      res.status(500).json({
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
        message: "Results Published",
        tournament
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
