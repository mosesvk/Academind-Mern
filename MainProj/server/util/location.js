const HttpError = require('../models/error-http')

const API_KEY = 'AIzaSyCWvdYUvMMFnRAaevMBQcp20oLW_0uVKXM';

const getCoordinatesForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/address=${encoodeURIComponent(address)}&key=${API_KEY}`
  );

  const data = response.data

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError('Could not find location for the specified address', 422)
  }
};
