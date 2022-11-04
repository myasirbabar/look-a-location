const express = require("express");
const router = express.Router();
const placesController = require("../controllers/places-controller")

// Get Place
router.get("/:pid", placesController.getPlaceById);

// Get User Places
router.get("/user/:uid", placesController.getPlaceByUserId);

// Add PLace
router.post("/", placesController.createPlace)

// Update Place
router.patch("/:pid", placesController.updatePlace)

//Delete Place
router.delete("/:pid", placesController.deletePlace)

module.exports = router;