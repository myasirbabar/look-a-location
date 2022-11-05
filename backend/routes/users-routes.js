const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controllers")

// Get All Users
router.get("/", usersController.getUsers);

// Signup
router.post("/signup", usersController.signup)

// Login 
router.post("/login", usersController.login)


module.exports = router;