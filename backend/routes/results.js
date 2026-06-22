const express = require("express");

const Result = require("../models/Result");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();

/*
GET ALL RESULTS
*/
router.get("/", async (req, res) => {

  try {

    const results = await Result.find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: results.length,
      results
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


/*
PUBLISH RESULT
ADMIN ONLY
*/
router.post(
  "/publish",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        tournamentId,
        teamName,
        slotNumber,
        placement,
        kills,
        placementPoints,
        prize
      } = req.body;

      const killPoints = kills;

      const totalPoints =
        Number(placementPoints) +
        Number(killPoints);

      const result =
        await Result.create({

          tournamentId,
          teamName,
          slotNumber,
          placement,
          kills,
          placementPoints,
          killPoints,
          totalPoints,
          prize

        });

      res.status(201).json({
        success: true,
        message: "Result Published",
        result
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
GET RESULTS OF TOURNAMENT
*/
router.get(
  "/tournament/:id",
  async (req, res) => {

    try {

      const results =
        await Result.find({
          tournamentId: req.params.id
        })
        .sort({
          totalPoints: -1,
          kills: -1
        });

      res.json({
        success: true,
        count: results.length,
        results
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
GET TOP 3
*/
router.get(
  "/top3/:id",
  async (req, res) => {

    try {

      const results =
        await Result.find({
          tournamentId: req.params.id
        })
        .sort({
          totalPoints: -1,
          kills: -1
        })
        .limit(3);

      res.json({
        success: true,
        results
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
UPDATE RESULT
ADMIN ONLY
*/
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      const {
        placement,
        kills,
        placementPoints,
        prize
      } = req.body;

      const killPoints = kills;

      const totalPoints =
        Number(placementPoints) +
        Number(killPoints);

      const result =
        await Result.findByIdAndUpdate(
          req.params.id,
          {
            placement,
            kills,
            placementPoints,
            killPoints,
            totalPoints,
            prize
          },
          {
            new: true
          }
        );

      res.json({
        success: true,
        message: "Result Updated",
        result
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
DELETE RESULT
ADMIN ONLY
*/
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {

    try {

      await Result.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message: "Result Deleted"
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
