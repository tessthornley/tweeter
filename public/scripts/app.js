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
    let dateArray = [];
    // The Date.now() function in the tweets.js file was producing a timestamp that was off by several minutes, added extra time to correct
    let newDateObj = moment(tweet.created_at).add(1100, 's').toDate();
    let ts = new Date(newDateObj);
    dateArray.push(ts.getFullYear(), ts.getMonth(), ts.getDate(), ts.getHours(), ts.getMinutes(), ts.getSeconds());
    // Moment.js used to calculate relative time from dateArray
    let daysAgo = moment(dateArray).fromNow();

    // Article structure to interpolate new tweet info into
    let article = `<article class="tweet"><header><img class="header-img" src=${tweet.user.avatars.small}><h2 class="header-display">${tweet.user.name}</h2><p class="header-p">${tweet.user.handle}</p></header><section><p class="section-p">${escape(tweet.content.text)}</p></section><footer><p class="footer-p">${daysAgo}</p><p class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></p></footer></article>`;
    return article;
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
