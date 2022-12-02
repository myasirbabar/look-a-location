const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password,12)
    
  } catch (error) {
    return next(new HttpError("Could not create user", 500));
  }
  // Create new User
  const newUser = new User({
    name,
    email,
    password:hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log(error)
    return next(new HttpError("Signup Failed", 500));
  }

  let token;
  try {
    token = jwt.sign({userId: newUser.id, email: newUser.email}, process.env.JWT_KEY, {expiresIn:'1h'});
  } catch (error) {
    return next(new HttpError("Signup Failed", 500));
  }

  res.status(201).json({userId: newUser.id, email: newUser.email, token:token});
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
  if (!existingUser) {
    return next(new HttpError("Invalid Credentials !", 403));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError("Could Not log in. ", 500));
  }

  if(!isValidPassword){
    return next(new HttpError("Invalid Credentials !", 403));
  }

  let token;
  try {
    token = jwt.sign({userId: existingUser.id, email: existingUser.email}, process.env.JWT_KEY, {expiresIn:'1h'});
  } catch (error) {
    return next(new HttpError("Login Failed", 500));
  }

  res.json({
    userId:existingUser.id,
    email:existingUser.email,
    token:token
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
