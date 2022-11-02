const bodyParser = require("body-parser");
const express = require("express");

const placesRoutes = require('./routes/places-routes')

const app = express();
const port = 5000;

// Register MiddleWare For Components
app.use('/api/places',placesRoutes); // Places


// INIT SERVER
app.listen(port, () =>
  console.log(`Look a Location app listening on port ${port}!`)
);
