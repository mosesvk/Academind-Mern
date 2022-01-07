const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/error-http");

const app = express();

app.use(bodyParser.json());

// MIDDLEWARE
app.use("/api/places", placesRoutes); // '/api/places'

app.use("/api/users", usersRoutes);

// handles errors for unsupported routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.listen(5555);
