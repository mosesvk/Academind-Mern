const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/error-http');
const User = require('../models/user');

// const DUMMY_USERS = [
//   {
//     id: 'u1',
//     name: 'Moses Kaumatule',
//     username: 'test',
//     email: 'test@test.com',
//     password: 'testers',
//   },
// ];

const getUsers = async(req, res, next) => {
  let users;
  try {
    //.find is an asynchronous task so we need async await
    // if not, then this will automatically be an error
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed. Please check your data', 422)
    );
  }
  const { name, username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, could not find user', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already with this given email.',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    username,
    email,
    image:
      'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, could not find user', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials. Could not log you in',
      500
    );
    return next(error);
  }

  res.json({ message: 'Logged In' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
