const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/error-http');

const url =
  'mongodb+srv://mosesvk:Lukifanga2656@cluster0.4gc6f.mongodb.net/places?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.json());

// MIDDLEWARE
app.use('/api/places', placesRoutes); // '/api/places'

app.use('/api/users', usersRoutes);

// handles errors for unsupported routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(5555);
  })
  .catch((err) => console.log(err));
