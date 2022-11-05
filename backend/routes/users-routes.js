const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");

// Get All Users
router.get("/", usersController.getUsers);

// Signup
router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({min: 6})
  ],
  usersController.signup
);

// Login
router.post(
  "/login",
  [check("email").normalizeEmail().isEmail(), check("password").isLength({min: 6})],
  usersController.login
);

module.exports = router;
