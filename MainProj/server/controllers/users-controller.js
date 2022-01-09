const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/error-http');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Moses Kaumatule',
    username: 'test',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
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
    existingUser = User.findOne({ email: email });
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
f
  const createdUser = new User({
    name,
    username,
    email,
    image:
      'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, could not find user', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        'Could not identify user. Credentials seem to be wrong',
        401
      )
    );
  }

  res.json({ message: 'Logged In', user: identifiedUser });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
