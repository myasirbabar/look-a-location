const express = require("express");
const { check } = require("express-validator");
const placesController = require("../controllers/places-controller");

const router = express.Router();

// Get Place
router.get("/:pid", placesController.getPlaceById);

// Get User Places
router.get("/user/:uid", placesController.getPlacesByUserId);

// Add PLace
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

// Update Place
router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  placesController.updatePlace
);

//Delete Place
router.delete("/:pid", placesController.deletePlace);

module.exports = router;
