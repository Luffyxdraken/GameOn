const express = require("express");

const MatchRegistration = require("../models/MatchRegistration");
const Tournament = require("../models/Tournament");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
JOIN TOURNAMENT
*/
router.post("/join", async (req, res) => {

  try {

    const {
      tournamentId,
      teamName,
      captainName,
      captainUID,
      player1,
      player2,
      player3,
      player4,
      contact
    } = req.body;

    const tournament =
      await Tournament.findById(
        tournamentId
      );

    if (!tournament) {

      return res.status(404).json({
        message: "Tournament Not Found"
      });

    }

    const registeredTeams =
      await MatchRegistration.countDocuments({
        tournamentId
      });

    if (
      registeredTeams >=
      tournament.totalSlots
    ) {

      return res.status(400).json({
        message: "Slots Full"
      });

    }

    const registration =
      new MatchRegistration({

        tournamentId,

        teamName,

        captainName,

        captainUID,

        player1,

        player2,

        player3,

        player4,

        contact,

        slotNumber:
          registeredTeams + 1

      });

    await registration.save();

    res.status(201).json({
      message: "Joined Successfully",
      registration
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/*
VIEW REGISTERED TEAMS
*/
router.get(
  "/tournament/:id",
  async (req, res) => {

    try {

      const teams =
        await MatchRegistration.find({
          tournamentId:
            req.params.id
        }).sort({
          slotNumber: 1
        });

      res.json(teams);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
VIEW SINGLE TEAM
*/
router.get(
  "/team/:id",
  async (req, res) => {

    try {

      const team =
        await MatchRegistration.findById(
          req.params.id
        );

      res.json(team);

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

      await MatchRegistration.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Team Removed"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
APPROVE TEAM
ADMIN ONLY
*/
router.put(
  "/approve/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const team =
        await MatchRegistration.findByIdAndUpdate(
          req.params.id,
          {
            status: "approved"
          },
          {
            new: true
          }
        );

      res.json(team);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
REJECT TEAM
ADMIN ONLY
*/
router.put(
  "/reject/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const team =
        await MatchRegistration.findByIdAndUpdate(
          req.params.id,
          {
            status: "rejected"
          },
          {
            new: true
          }
        );

      res.json(team);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
