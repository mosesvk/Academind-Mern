
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
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid // params -> { pid: 'p1' }

  const place = DUMMY_PLACES.find(item => {
    return item.id === placeId
  })

  if (!place) {
    // from models folder
    return next(new HttpError('Could not find place for the provided id', 404))
  }

  res.json({ place }); // { place } = { place: place }
}

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid

  const place = DUMMY_PLACES.find(item => {
    return item.creator === userId
  })

  if (!place) {
    // from models folder
    return next(new HttpError('Could not find place for the provided user id', 404))
  }

  res.json({place})
}