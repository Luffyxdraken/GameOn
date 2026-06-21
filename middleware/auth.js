const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {

    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }
};

const isAdmin = (req, res, next) => {

  if (
    req.user.role === "admin" ||
    req.user.role === "owner"
  ) {
    return next();
  }

  return res.status(403).json({
    message: "Admin access required"
  });
};

const isOwner = (req, res, next) => {

  if (req.user.role === "owner") {
    return next();
  }

  return res.status(403).json({
    message: "Owner access required"
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isOwner
};
