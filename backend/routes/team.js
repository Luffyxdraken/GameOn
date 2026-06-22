const express = require("express");

const Team = require("../models/Team");
const User = require("../models/User");

const {
  verifyToken
} = require("../middleware/auth");

const router = express.Router();

/*
CREATE TEAM
*/
router.post(
  "/create",
  verifyToken,
  async (req, res) => {

    try {

      const {
        teamName,
        logo,
        description,
        maxMembers
      } = req.body;

      const existingTeam =
        await Team.findOne({
          teamName
        });

      if (existingTeam) {
        return res.status(400).json({
          message: "Team already exists"
        });
      }

      const team =
        await Team.create({

          teamName,
          logo,
          description,
          maxMembers,

          captain: req.user.id,

          members: [
            req.user.id
          ],

          createdBy: req.user.id

        });

      res.status(201).json(team);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET ALL TEAMS
*/
router.get(
  "/",
  async (req, res) => {

    try {

      const teams =
        await Team.find()
          .populate(
            "captain",
            "username ign"
          );

      res.json(teams);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
SEND JOIN REQUEST
*/
router.post(
  "/join/:teamId",
  verifyToken,
  async (req, res) => {

    try {

      const team =
        await Team.findById(
          req.params.teamId
        );

      if (!team) {
        return res.status(404).json({
          message: "Team not found"
        });
      }

      if (
        team.joinRequests.includes(
          req.user.id
        )
      ) {
        return res.status(400).json({
          message:
            "Request already sent"
        });
      }

      team.joinRequests.push(
        req.user.id
      );

      await team.save();

      res.json({
        message:
          "Join request sent"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
ACCEPT JOIN REQUEST
CAPTAIN ONLY
*/
router.post(
  "/accept/:teamId/:userId",
  verifyToken,
  async (req, res) => {

    try {

      const team =
        await Team.findById(
          req.params.teamId
        );

      if (!team) {
        return res.status(404).json({
          message: "Team not found"
        });
      }

      if (
        team.captain.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message:
            "Captain only"
        });
      }

      team.members.push(
        req.params.userId
      );

      team.joinRequests =
        team.joinRequests.filter(
          id =>
            id.toString() !==
            req.params.userId
        );

      await team.save();

      res.json({
        message:
          "Member added"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
REJECT REQUEST
*/
router.delete(
  "/reject/:teamId/:userId",
  verifyToken,
  async (req, res) => {

    try {

      const team =
        await Team.findById(
          req.params.teamId
        );

      if (!team) {
        return res.status(404).json({
          message: "Team not found"
        });
      }

      if (
        team.captain.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message:
            "Captain only"
        });
      }

      team.joinRequests =
        team.joinRequests.filter(
          id =>
            id.toString() !==
            req.params.userId
        );

      await team.save();

      res.json({
        message:
          "Request rejected"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
REMOVE MEMBER
*/
router.delete(
  "/remove/:teamId/:userId",
  verifyToken,
  async (req, res) => {

    try {

      const team =
        await Team.findById(
          req.params.teamId
        );

      if (!team) {
        return res.status(404).json({
          message: "Team not found"
        });
      }

      if (
        team.captain.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message:
            "Captain only"
        });
      }

      team.members =
        team.members.filter(
          id =>
            id.toString() !==
            req.params.userId
        );

      await team.save();

      res.json({
        message:
          "Member removed"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
LEAVE TEAM
*/
router.post(
  "/leave/:teamId",
  verifyToken,
  async (req, res) => {

    try {

      const team =
        await Team.findById(
          req.params.teamId
        );

      if (!team) {
        return res.status(404).json({
          message: "Team not found"
        });
      }

      team.members =
        team.members.filter(
          id =>
            id.toString() !==
            req.user.id
        );

      await team.save();

      res.json({
        message:
          "Left team successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
TEAM LEADERBOARD
*/
router.get(
  "/leaderboard",
  async (req, res) => {

    try {

      const teams =
        await Team.find()
          .sort({
            points: -1
          });

      res.json(teams);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
