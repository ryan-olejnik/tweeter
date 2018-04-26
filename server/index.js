"use strict";

// Basic express and Mongo setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require('mongodb').MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db)=> {
  if (err){
    console.log('Failed to connect to Mongo Database', MONGODB_URI);
  }
  console.log('Connected to Mongo Database located at:', MONGODB_URI);

  var DataHelpers = require("./lib/data-helpers.js")(db);
  
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
});



