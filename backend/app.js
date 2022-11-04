const bodyParser = require("body-parser");
const express = require("express");

const placesRoutes = require('./routes/places-routes')

const app = express();
const port = 5000;

// Body Parser
app.use(bodyParser.json())

// Register MiddleWare For Components
app.use('/api/places',placesRoutes); // Places

// Error Middleware
app.use((error, req,res,next)=>{
  if(res.headerSent){
    return next(error);
  }
  
  res.status(error.code || 500)
  res.json({message: error.message || "Unknown Error Occured"});
})


// INIT SERVER
app.listen(port, () =>
  console.log(`Look a Location app listening on port ${port}!`)
);
