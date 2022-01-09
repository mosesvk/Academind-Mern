//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require('express-validator')

const HttpError = require("../models/error-http");
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // params -> { pid: 'p1' }

  const place = DUMMY_PLACES.find((item) => {
    return item.id === placeId;
  });

  if (!place) {
    // from models folder
    return next(new HttpError("Could not find place for the provided id", 404));
  }

  res.json({ place }); // { place } = { place: place }
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((item) => {
    return item.creator === userId;
  });

  if (!places || places.length === 0) {
    // from models folder
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );
  }

  res.json({ places });
};

const createPlace = async  (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    return next(new HttpError('Invalid inputs passed, please check your data', 422))
  }
  // taken from the bodyParser in main app.js
  const { title, description, address, creator } = req.body;

  // using google api to extract coordinates address
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch(error) {
    return next(error);
  }

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    return next(new HttpError('Invalid inputs passed, please check your data', 422))
  }
  // taken from the bodyParser in main app.js
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {...DUMMY_PLACES.find(item => item.id === placeId)};
  const placeIndex = DUMMY_PLACES.findIndex(item => item.id === placeId)
  updatedPlace.title = title
  updatedPlace.description = description

  DUMMY_PLACES[placeIndex] = updatedPlace

  res.status(200).json({place: updatedPlace})
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const deletedPlace = DUMMY_PLACES.find(item => item.id === placeId)
  if (!deletedPlace) {
    return next(new HttpError('Could not find a place for that id', 404))
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(item => item.id === placeId)

  res.status(200).json({message: 'Deleted place: ', place: deletedPlace})
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
