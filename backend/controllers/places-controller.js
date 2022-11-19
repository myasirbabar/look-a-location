const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getAddressCoords = require("../util/location");
const Place = require("../models/place.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
  console.log("Get Places Request In Places");

  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Something Went Wrong ! Could not find a place", 500));
  }

  if (!place) {
    return next(new HttpError("Could not Find Place with this Id", 404));
  }

  res.json({ place: place.toObject({ getters: true }) }); // getters = true , to remove _ from _id
};

const getPlacesByUserId = async (req, res, next) => {
  console.log("Get User Places Request In Places");

  const userID = req.params.uid;
  let places;
  try {
    // Find By Creator Id In DB
    places = await Place.find({ creator: userID });
  } catch (error) {
    return next(new HttpError("Fetching Places failed. Please Try Again", 500));
  }

  if (!places || places.length === 0) {
    return next(new HttpError("Could Not Find Any Places for this user", 404));
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })) // since places is a array of places
  });
};

const createPlace = async (req, res, next) => {
  console.log("Create Place Called");

  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // With Async We do not use throw
    return next(new HttpError("Invalid Field Values", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  // getAddressCoordinates might return error
  try {
    coordinates = await getAddressCoords(address);
  } catch (error) {
    return next(error);
  }

  // Creating a place
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://pucit.edu.pk/wp-content/uploads/2021/09/dap9_n-1.jpg",
    creator,
  });

  // Check if user Id exist in DB or not
  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("Error Creating Place", 500));
  }

  if(!user){
    return next(new HttpError("Could Not Find User", 404));
  }


  // Save in database
  try {

    const sess = await mongoose.startSession();
    sess.startTransaction();
    
    await createdPlace.save({session: sess});
    user.places.push(createPlace);
    await user.save({session: sess});

    await sess.commitTransaction();


  } catch (err) {
    return next(new HttpError("Error Creating Place", 500));
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  console.log("Update Place Called");

  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Field Values", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;

  // Getting that place
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Something Went Wrong ! Could not find a place", 500));
  }

  // UPdating Params
  place.title = title;
  place.description = description;

  // Saved updated place
  try {
    await place.save();
  } catch (error) {
    return next(new HttpError('Something Went Wrong. Could not update place', 500));
  }

  res.status(200).json({ place: place.toObject({getters: true}) });
};

const deletePlace = async (req, res, next) => {
  console.log("Delete Place Called");

  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Something Went Wrong ! Could not Delete place", 500));
  }

  try {
    await place.remove();
  } catch (error) {
    return next(new HttpError("Something Went Wrong ! Could not Delete place", 500));
  }

  res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
