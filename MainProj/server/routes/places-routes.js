const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    u1: "u1",
  },
];

router.get("/pid", (req, res, next) => {
  const placeId = req.params.pid // params -> { pid: 'p1' }
  const place = DUMMY_PLACES.find(item => {
    return item.id === placeId
  })
  res.json({ message: "It Works!" });
});

module.exports = router;
