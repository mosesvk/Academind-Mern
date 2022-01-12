const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  // Authorization: 'Bearer TOKEN' so we can access that TOKEN by going into authorization[1]
  let token;
  try {
    token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new HttpError('authorization.split undefined. check req.'))
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share')
    req.userData = { userId: decodedToken.userId }
    next();

  } catch (err) {
    const error = new HttpError('Authorization failed!', 401);
    return next(error);
  }
};
