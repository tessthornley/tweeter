/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {
  /* Function that takes in tweets passed from the loadTweets GET request and passes them into the createTweetElement function;
  the returned value of this function is a new tweet article, which will be prepending to the webpage.
  */
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
        $("#tweets-container").prepend($tweet);
    });
  }

  // Preventing cross-site scripting with escape function
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } 

  /* Function that takes in the data passed from the loadTweet GET request to the renderTweet function;
  inserts the info of the new tweet into the existing article structure, then returns the value.
  */
  function createTweetElement(tweet) {
    // Article structure to interpolate new tweet info into
    let article = `<article class="tweet"><header><img class="header-img" src=${tweet.user.avatars.small}><h2 class="header-display">${tweet.user.name}</h2><p class="header-p">${tweet.user.handle}</p></header><section><p class="section-p">${escape(tweet.content.text)}</p></section><footer><p class="footer-p">${calculateTimeAgo(tweet.created_at)}</p><p class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></p></footer></article>`;
    return article;
  }

  function calculateTimeAgo(date) {
    let dateArray = [];
    dateArray.push(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate(), new Date(date).getHours(), new Date(date).getMinutes(), new Date(date).getSeconds());
    // Moment.js used to calculate relative time from dateArray
    let daysAgo = moment(dateArray).fromNow();
    return daysAgo;
  }

  /* Function that uses jQuery to make an AJAX GET request to /tweets; once this is received the promise passes
  the data to the renderTweets function to process */
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' }) 
      .then(function (data) {
        renderTweets(data);
    });
  }
  
  loadTweets();

});
