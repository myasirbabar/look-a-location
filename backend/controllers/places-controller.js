const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getAddressCoords = require("../util/location");
const { v4: uuidv4 } = require("uuid");
const Place = require("../models/place.model");

let DUMMY_PLACES = [
  {
    id: "p1",
    creator: "u1",
    title: "Faculty Of Computing and Inforation Technology - NC",
    description:
      "Offers a diverse knowledge in Computer Science and Related Fields",
    imageURL: "https://pucit.edu.pk/wp-content/uploads/2021/09/dap9_n-1.jpg",
    address:
      "F7J8+53W, Samsani Road, Quaid-i-Azam Campus, لاہور, Lahore, پنجاب",
    location: {
      lat: 31.4804833,
      lng: 74.2630103,
    },
  },
  {
    id: "p2",
    creator: "u2",
    title: "Faculty Of Computing and Inforation Technology - OC",
    description:
      "Offers a diverse knowledge in Computer Science and Related Fields",
    imageURL:
      "https://dailytimes.com.pk/assets/uploads/2022/07/29/2560px-Punjab_University-768x432.jpg",
    address: "Katchery Road، Near Anarkali Bazar، Lahore, 54000, Pakistan",
    location: {
      lat: 31.5703641,
      lng: 74.3074407,
    },
  },
];

const getPlaceById = async (req, res, next) => {
  console.log("Get Places Request In Places");

  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    throw new HttpError("Something Went Wrong ! Could not find a place", 500);
  }

  if (!place) {
    throw new HttpError("Could not Find Place with this Id", 404);
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
    throw new HttpError("Fetching Places failed. Please Try Again", 500);
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
  // getAddressCoordinates might throw error
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

  // Save in database
  try {
    await createPlace.save();
  } catch (err) {
    throw new HttpError("Error Creating Place", 500);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  console.log("Update Place Called");

  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Field Values", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;

  // Getting that place
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    throw new HttpError("Something Went Wrong ! Could not find a place", 500);
  }

  // UPdating Params
  place.title = title;
  place.description = description;

  // Saved updated place
  try {
    await place.save();
  } catch (error) {
    throw new HttpError('Something Went Wrong. Could not update place', 500)
  }

  res.status(200).json({ place: place.toObject({getters: true}) });
};

const deletePlace = (req, res, next) => {
  console.log("Delete Place Called");

  if (!DUMMY_PLACES.find((p) => p.id === req.params.pid)) {
    throw new HttpError("Place With this ID Does not Exist", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== req.params.pid);

  res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
