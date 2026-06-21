const express = require("express");

const AdminRole = require("../models/AdminRole");

const User = require("../models/User");

const {
  verifyToken
} = require("../middleware/auth");

const router = express.Router();

/*
CHECK OWNER
*/
async function isOwner(userId) {

  const owner =
    await AdminRole.findOne({

      userId,

      role: "owner",

      active: true

    });

  return !!owner;

}

/*
GET ALL ADMINS
*/
router.get(
  "/",
  verifyToken,
  async (req, res) => {

    try {

      const admins =
        await AdminRole.find({
          active: true
        })
        .populate(
          "userId",
          "username email ign"
        );

      res.json(admins);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
ADD ADMIN
OWNER ONLY
*/
router.post(
  "/add",
  verifyToken,
  async (req, res) => {

    try {

      const owner =
        await isOwner(
          req.user.id
        );

      if (!owner) {

        return res.status(403).json({
          message:
            "Only owner can add admins"
        });

      }

      const {

        userId,
        role

      } = req.body;

      const exists =
        await AdminRole.findOne({
          userId
        });

      if (exists) {

        return res.status(400).json({
          message:
            "Already admin"
        });

      }

      const admin =
        await AdminRole.create({

          userId,

          role:
            role || "admin",

          addedBy:
            req.user.id

        });

      res.status(201).json(
        admin
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
REMOVE ADMIN
OWNER ONLY
*/
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {

    try {

      const owner =
        await isOwner(
          req.user.id
        );

      if (!owner) {

        return res.status(403).json({
          message:
            "Only owner can remove admins"
        });

      }

      const admin =
        await AdminRole.findById(
          req.params.id
        );

      if (!admin) {

        return res.status(404).json({
          message:
            "Admin not found"
        });

      }

      if (
        admin.role === "owner"
      ) {

        return res.status(400).json({
          message:
            "Owner cannot be removed"
        });

      }

      await AdminRole.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Admin removed"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
CHANGE ROLE
OWNER ONLY
*/
router.put(
  "/role/:id",
  verifyToken,
  async (req, res) => {

    try {

      const owner =
        await isOwner(
          req.user.id
        );

      if (!owner) {

        return res.status(403).json({
          message:
            "Only owner can change roles"
        });

      }

      const admin =
        await AdminRole.findById(
          req.params.id
        );

      if (!admin) {

        return res.status(404).json({
          message:
            "Admin not found"
        });

      }

      admin.role =
        req.body.role;

      await admin.save();

      res.json(admin);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/*
CHECK MY ROLE
*/
router.get(
  "/me/role",
  verifyToken,
  async (req, res) => {

    try {

      const role =
        await AdminRole.findOne({

          userId:
            req.user.id,

          active: true

        });

      res.json(
        role || {
          role: "member"
        }
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;
