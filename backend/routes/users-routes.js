const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");
const fileUpload = require('../middleware/file-upload');

// Get All Users
router.get("/", usersController.getUsers);

// Signup
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({min: 5})
  ],
  usersController.signup
);

// Login
router.post(
  "/login",
  [check("email").normalizeEmail().isEmail(), check("password").isLength({min: 5})],
  usersController.login
);

module.exports = router;
