const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/*
REGISTER
*/
router.post("/register", async (req, res) => {
try {
const {
username,
email,
password
} = req.body;

if (!username || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "All fields are required"
  });
}

const existingUser = await User.findOne({
  $or: [
    { email },
    { username }
  ]
});

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists"
  });
}

const hashedPassword =
  await bcrypt.hash(password, 10);

let role = "player";

if (
  email === "luffy@world.com"
) {
  role = "superadmin";
}

const user = await User.create({
  username,
  email,
  password: hashedPassword,
  role
});

const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "30d"
  }
);

res.status(201).json({
  success: true,
  token,
  user
});

} catch (error) {
console.error(error);

res.status(500).json({
  success: false,
  message: error.message
});

}
});

/*
LOGIN
*/
router.post("/login", async (req, res) => {
try {

const {
  email,
  password
} = req.body;

const user =
  await User.findOne({ email });

if (!user) {
  return res.status(400).json({
    success: false,
    message: "Invalid credentials"
  });
}

const match =
  await bcrypt.compare(
    password,
    user.password
  );

if (!match) {
  return res.status(400).json({
    success: false,
    message: "Invalid credentials"
  });
}

const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "30d"
  }
);

res.json({
  success: true,
  token,
  user
});

} catch (error) {
console.error(error);

res.status(500).json({
  success: false,
  message: error.message
});

}
});

module.exports = router;
