"use strict";

// LIBRARIES & DATABASE URI //
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const {MongoClient} = require("mongodb");
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

const app           = express();

// Middleware to handle URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static("public"));

// Connecting to Mongo and passing the database once connected to factory functions to process
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  // DataHelpers module provides an interface to the database of tweets
  const DataHelpers = require("./lib/data-helpers.js")(db);
  // tweetRoutes is passed DataHelpers object and defines routes it will use to interact with data
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  // Mount the tweets routes at the "/tweets" path prefix
  app.use("/tweets", tweetsRoutes);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
