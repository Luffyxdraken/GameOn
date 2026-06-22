const express = require("express");

const PointSystem = require("../models/PointSystem");

const {
  verifyToken
} = require("../middleware/auth");

const router = express.Router();

/*
CREATE POINT SYSTEM
*/
router.post(
  "/create",
  verifyToken,
  async (req, res) => {

    try {

      const pointSystem =
        await PointSystem.create({

          name: req.body.name,

          killPoint: req.body.killPoint,

          placements: req.body.placements,

          createdBy: req.user.id

        });

      res.status(201).json(
        pointSystem
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET ALL POINT SYSTEMS
*/
router.get(
  "/",
  async (req, res) => {

    try {

      const systems =
        await PointSystem.find()
        .sort({
          createdAt: -1
        });

      res.json(systems);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET ACTIVE POINT SYSTEM
*/
router.get(
  "/active",
  async (req, res) => {

    try {

      const system =
        await PointSystem.findOne({
          active: true
        });

      res.json(system);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
GET SINGLE POINT SYSTEM
*/
router.get(
  "/:id",
  async (req, res) => {

    try {

      const system =
        await PointSystem.findById(
          req.params.id
        );

      res.json(system);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
UPDATE POINT SYSTEM
*/
router.put(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      const system =
        await PointSystem.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true
          }

        );

      res.json(system);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
SET ACTIVE POINT SYSTEM
*/
router.put(
  "/activate/:id",
  verifyToken,
  async (req, res) => {

    try {

      await PointSystem.updateMany(
        {},
        {
          active: false
        }
      );

      const system =
        await PointSystem.findByIdAndUpdate(

          req.params.id,

          {
            active: true
          },

          {
            new: true
          }

        );

      res.json(system);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
DELETE POINT SYSTEM
*/
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      await PointSystem.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Point system deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
