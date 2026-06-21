const express = require("express");

const Points = require("../models/Points");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET LEADERBOARD
*/
router.get("/", async (req, res) => {

  try {

    const leaderboard =
      await Points.find()
      .sort({
        totalPoints: -1,
        kills: -1
      });

    res.json(leaderboard);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/*
ADD TEAM RESULT
ADMIN ONLY
*/
router.post(
  "/add",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        teamName,
        kills,
        placement,
        matchNumber
      } = req.body;

      const totalPoints =
        Number(kills) +
        Number(placement);

      const team =
        new Points({
          teamName,
          kills,
          placement,
          totalPoints,
          matchNumber
        });

      await team.save();

      res.status(201).json({
        message: "Result Added",
        team
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE TEAM RESULT
ADMIN ONLY
*/
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        kills,
        placement
      } = req.body;

      const totalPoints =
        Number(kills) +
        Number(placement);

      const team =
        await Points.findByIdAndUpdate(
          req.params.id,
          {
            kills,
            placement,
            totalPoints
          },
          {
            new: true
          }
        );

      res.json({
        message: "Points Updated",
        team
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE TEAM
ADMIN ONLY
*/
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      await Points.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Team Deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
