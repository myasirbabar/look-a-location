const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// Body Parser
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

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
  // Delete File Stored if any error occurs
  // Because File first stored
  // and then is saved in database, but if the error occurs
  // Then we should roll back the file upload
  if(req.file){
    fs.unlink(req.file.path, (err)=>{
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown Error Occured" });
});

// If Database Connection is successfull start backend server
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ossa8dp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    // INIT SERVER
    app.listen(port, () =>
      console.log(`Look a Location app listening on port ${port}!`)
    );
  })
  .catch(err =>{
    throw new HttpError(err, 404);
  });
