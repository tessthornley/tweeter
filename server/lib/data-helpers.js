"use strict";

// Defines helper functions for saving and getting tweets, using the Mongo database
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet) {
      db.collection("tweets").insertOne(newTweet);
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }
  };
};
