const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Fetching Failed! Please try again later", 500));
  }

  res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Field Values", 422));
  }

  const { name, email, password } = req.body;

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
    image: req.file.path,
    places: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Signup Failed", 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  //Validating Express-Validator MiddleWare
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Field Values", 422));
  }

  const { email, password } = req.body;

  // Check if email already exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Log in Failed ! Please try Again Later", 500));
  }

  // If Already exist
  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Invalid Credentials !", 401));
  }

  res.json({
    message: "Logged In ",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
