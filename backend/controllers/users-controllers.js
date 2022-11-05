const HttpError = require("../models/http-error");
const {validationResult} = require("express-validator")
const { v4: uuidv4 } = require("uuid");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Muhammad Yasir",
    email: "ybabar1@gmail.com",
	password:"tester1"
  },
  {
    id: "u2",
    name: "Usama Akram",
    email: "ua@gmail.com",
	password:"tester2"
  },
  {
    id: "u3",
    name: "Muhammad Awais",
    email: "awais@gmail.com",
	password:"tester3"
  },
];

const getUsers = (req, res, next) => {
	res.json(DUMMY_USERS)
};

const signup = (req, res, next) => {

	//Validating Express-Validator MiddleWare
	const errors = validationResult(req);
	if(!errors.isEmpty()){
	  throw new HttpError("Invalid Field Values", 422)
	}

	const {name, email, password} = req.body;

	const newUser = {
		id: uuidv4(),
		name,
		email, 
		password
	}
	
	if(DUMMY_USERS.find(p => p.email === email)){
		throw HttpError("User Already Exists", 422)
	}

	DUMMY_USERS.push(newUser)

	res.status(201).json({message: "User Added ! ", DUMMY_USERS})
};

const login = (req, res, next) => {
	
	//Validating Express-Validator MiddleWare
	const errors = validationResult(req);
	if(!errors.isEmpty()){
	  throw new HttpError("Invalid Field Values", 422)
	}

	const {email, password} = req.body;

	const identifiedUser = DUMMY_USERS.find(u=> u.email === email);

	if(!identifiedUser || identifiedUser.password !== password){
		throw new HttpError("Invalid Credential. User Not Found", 401)
	}

	res.json({message: "Logged In "});

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
