const express = require("express");

const PrizeDistribution =
  require("../models/PrizeDistribution");

const {
  verifyToken
} = require("../middleware/auth");

const {
  isAdmin
} = require("../middleware/admin");

const router = express.Router();

/*
CREATE PRIZE DISTRIBUTION
*/
router.post(
  "/create",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const prize =
        await PrizeDistribution.create({

          tournamentId:
            req.body.tournamentId,

          prizePool:
            req.body.prizePool,

          firstPrize:
            req.body.firstPrize,

          secondPrize:
            req.body.secondPrize,

          thirdPrize:
            req.body.thirdPrize,

          fourthPrize:
            req.body.fourthPrize,

          fifthPrize:
            req.body.fifthPrize,

          bonusPrize:
            req.body.bonusPrize,

          mvpPrize:
            req.body.mvpPrize,

          description:
            req.body.description,

          createdBy:
            req.user.id

        });

      res.status(201).json(prize);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET ALL PRIZES
*/
router.get(
  "/",
  async (req, res) => {

    try {

      const prizes =
        await PrizeDistribution.find()
        .populate(
          "tournamentId"
        )
        .sort({
          createdAt: -1
        });

      res.json(prizes);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET TOURNAMENT PRIZE
*/
router.get(
  "/tournament/:id",
  async (req, res) => {

    try {

      const prize =
        await PrizeDistribution.findOne({

          tournamentId:
            req.params.id,

          active: true

        });

      res.json(prize);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET SINGLE PRIZE
*/
router.get(
  "/:id",
  async (req, res) => {

    try {

      const prize =
        await PrizeDistribution.findById(
          req.params.id
        );

      res.json(prize);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE PRIZE
*/
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const prize =
        await PrizeDistribution.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true
          }

        );

      res.json(prize);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE PRIZE
*/
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      await PrizeDistribution.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Prize distribution deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
ACTIVATE PRIZE
*/
router.put(
  "/activate/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      await PrizeDistribution.updateMany(
        {},
        {
          active: false
        }
      );

      const prize =
        await PrizeDistribution.findByIdAndUpdate(

          req.params.id,

          {
            active: true
          },

          {
            new: true
          }

        );

      res.json(prize);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
