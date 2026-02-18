const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "mySecretKey";

// Register: api/auth/createUser
router.post(
  "/createUser",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //   Check if user already exists
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(404).json({ message: "This Email already exists." });
      }

      //   Hast Password
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(req.body.password, salt);
      //   Create user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.status(200).json(authToken);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // res.json([]);
  },
);

// Login: api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = await req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "Enter valid credentials." });
    }

    const passCompare = await bcrypt.compare(password, userExists.password);
    if (!passCompare) {
      return res.status(400).json({ message: "Enter valid credentials." });
    }

    const data = {
      user: {
        id: userExists.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  },
);

// Fetch user : api/auth/fetchUser
router.post("/getUser", fetchUser, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
});

module.exports = router;
