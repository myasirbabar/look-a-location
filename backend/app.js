const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
const port = 5000;

// Body Parser
app.use(bodyParser.json());

// Handle CORS Error
app.use((req,res,next) => {
  // Which domain shoudl be allowed
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-Type, Accept, Authorization, X-Requested-With');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
})

// Register MiddleWare For Places
app.use("/api/places", placesRoutes); // Places

// Register MiddleWare For Places
app.use("/api/users", usersRoutes); // Places

// Register MiddleWare For Unknown Routes
app.use((req, res, next) => {
  const error = new HttpError("Could Not Find This Route ", 404);
  throw error;
});

// Error Middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown Error Occured" });
});

// If Database Connection is successfull start backend server
mongoose
  .connect("mongodb+srv://myb:IVcrP8z4PX2a42Q4@cluster0.ossa8dp.mongodb.net/database?retryWrites=true&w=majority")
  .then(() => {
    // INIT SERVER
    app.listen(port, () =>
      console.log(`Look a Location app listening on port ${port}!`)
    );
  })
  .catch(err =>{
    throw new HttpError(err, 404);
  });
