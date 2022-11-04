const express = require("express");
const router = express.Router();
const placesController = require("../controllers/places-controller")

// Get Place
router.get("/:pid", placesController.getPlaceById);

// Get User Places
router.get("/user/:uid", placesController.getPlaceByUserId);

// Add PLace
router.post("/", placesController.createPlace)
module.exports = router;
