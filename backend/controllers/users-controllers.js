const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Muhammad Yasir",
    email: "ybabar1@gmail.com",
    password: "tester1",
  },
  {
    id: "u2",
    name: "Usama Akram",
    email: "ua@gmail.com",
    password: "tester2",
  },
  {
    id: "u3",
    name: "Muhammad Awais",
    email: "awais@gmail.com",
    password: "tester3",
  },
];

const getUsers = (req, res, next) => {
  res.json(DUMMY_USERS);
};

const signup = async (req, res, next) => {
  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Field Values", 422));
  }

  const { name, email, password,places } = req.body;

  // Check if email already exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Sign up Failed ! Please try Again Later", 500));
  }

  // If Already exist
  if (existingUser) {
    return next(new HttpError("User Exists Alredy !", 422));
  }

  // Create new User
  const newUser = new User({
    name,
    email,
    password,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOJWdWQyCnVGZ2iMwrA24be1XHiruDZIf71lMcul7&s",
    places,
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Signup Failed", 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Field Values", 422));
  }

  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Invalid Credential. User Not Found", 401));
  }

  res.json({ message: "Logged In " });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
