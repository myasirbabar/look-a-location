const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

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

const getPlaceById = (req, res, next) => {
  console.log("Get Places Request In Places");

  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("Could not Find Place with this Id", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  console.log("Get User Places Request In Places");

  const userID = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userID;
  });
  if (!places || places.length === 0) {
    return next(new HttpError("Could Not Find Any Places for this user", 404));
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  console.log("Create Place Called");
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  console.log("Update Place Called");
  const { title, description } = req.body;

  const UpdatedPlace = { ...DUMMY_PLACES.find((p) => p.id === req.params.pid) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === req.params.pid);

  UpdatedPlace.title = title;
  UpdatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place });
};

const deletePlace = (req, res, next) => {
  console.log("Delete Place Called");

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== req.params.pid);

  res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
