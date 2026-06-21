const express = require("express");

const MatchResult = require("../models/MatchResult");

const {
  verifyToken
} = require("../middleware/auth");

const router = express.Router();

/*
ADD RESULT
*/
router.post(
  "/create",
  verifyToken,
  async (req, res) => {

    try {

      const {

        scrimId,
        registrationId,
        teamName,
        teamTag,

        position,
        kills,

        positionPoints,
        matchNumber

      } = req.body;

      const killPoints = kills;

      const totalPoints =
        positionPoints + killPoints;

      const result =
        await MatchResult.create({

          scrimId,
          registrationId,

          teamName,
          teamTag,

          position,
          kills,

          positionPoints,
          killPoints,

          totalPoints,

          matchNumber,

          createdBy:
            req.user.id

        });

      res.status(201).json(result);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET RESULTS BY SCRIM
*/
router.get(
  "/scrim/:scrimId",
  async (req, res) => {

    try {

      const results =
        await MatchResult.find({

          scrimId:
            req.params.scrimId

        })
        .sort({
          totalPoints: -1
        });

      res.json(results);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET SINGLE RESULT
*/
router.get(
  "/:id",
  async (req, res) => {

    try {

      const result =
        await MatchResult.findById(
          req.params.id
        );

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
EDIT RESULT
*/
router.put(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      const result =
        await MatchResult.findById(
          req.params.id
        );

      if (!result) {

        return res.status(404).json({
          message: "Result not found"
        });

      }

      result.position =
        req.body.position;

      result.kills =
        req.body.kills;

      result.positionPoints =
        req.body.positionPoints;

      result.killPoints =
        req.body.kills;

      result.totalPoints =
        result.positionPoints +
        result.killPoints;

      await result.save();

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE RESULT
*/
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      await MatchResult.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Result deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
PUBLISH RESULT
*/
router.put(
  "/publish/:id",
  verifyToken,
  async (req, res) => {

    try {

      const result =
        await MatchResult.findById(
          req.params.id
        );

      result.published = true;

      await result.save();

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
LEADERBOARD
*/
router.get(
  "/leaderboard/:scrimId",
  async (req, res) => {

    try {

      const results =
        await MatchResult.find({

          scrimId:
            req.params.scrimId,

          published: true

        })
        .sort({
          totalPoints: -1,
          kills: -1
        });

      res.json(results);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
TOP 3
*/
router.get(
  "/top3/:scrimId",
  async (req, res) => {

    try {

      const results =
        await MatchResult.find({

          scrimId:
            req.params.scrimId,

          published: true

        })
        .sort({
          totalPoints: -1,
          kills: -1
        })
        .limit(3);

      res.json(results);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
