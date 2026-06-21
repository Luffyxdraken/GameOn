const AdminRole = require("../models/AdminRole");

/*
ANY ADMIN
*/
const isAdmin = async (
  req,
  res,
  next
) => {

  try {

    const admin =
      await AdminRole.findOne({

        userId:
          req.user.id,

        active: true

      });

    if (!admin) {

      return res.status(403).json({
        message:
          "Admin access required"
      });

    }

    req.adminRole =
      admin;

    next();

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

/*
OWNER ONLY
*/
const isOwner = async (
  req,
  res,
  next
) => {

  try {

    const owner =
      await AdminRole.findOne({

        userId:
          req.user.id,

        role: "owner",

        active: true

      });

    if (!owner) {

      return res.status(403).json({
        message:
          "Owner access required"
      });

    }

    req.adminRole =
      owner;

    next();

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

/*
PERMISSION CHECK
*/
const hasPermission =
  (permission) =>
  async (
    req,
    res,
    next
  ) => {

    try {

      const admin =
        await AdminRole.findOne({

          userId:
            req.user.id,

          active: true

        });

      if (!admin) {

        return res.status(403).json({
          message:
            "Admin access required"
        });

      }

      if (
        admin.role ===
        "owner"
      ) {

        return next();

      }

      if (
        !admin.permissions[
          permission
        ]
      ) {

        return res.status(403).json({
          message:
            "Permission denied"
        });

      }

      req.adminRole =
        admin;

      next();

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

module.exports = {

  isAdmin,

  isOwner,

  hasPermission

};
