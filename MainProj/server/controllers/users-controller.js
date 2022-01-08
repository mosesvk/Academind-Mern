const { v4: uuidv4 } = require("uuid");
const { validationResult } = require('express-validator')

const HttpError = require('../models/error-http')

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Moses Kaumatule",
    username: 'test',
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed. Please check your data', 422))
  }

  const {name, username, email, password} = req.body;

  const hasUser = DUMMY_USERS.find(user => user.email === email)
  if (hasUser) {
    return next(new HttpError('This email is already in use', 422))
  }

  const createdUser = {
    id: uuidv4(),
    name, 
    username,
    email, 
    password
  }

  DUMMY_USERS.push(createdUser)

  res.status(201).json({message: 'Successfully added user', user: createdUser})
};

const login = (req, res, next) => {
  const {email, password} = req.body;

  const identifiedUser = DUMMY_USERS.find(user => user.email === email)
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError('Could not identify user. Credentials seem to be wrong', 401))
  }

  res.json({message: 'Logged In', user: identifiedUser})
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
