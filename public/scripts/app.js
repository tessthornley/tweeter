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


  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } 

  /* Function that takes in the data passed from the loadTweet GET request to the renderTweet function;
  inserts the info of the new tweet into the existing article structure, then returns the value.
  */
  function createTweetElement(tweet) {
    let ts = new Date(tweet.created_at);
    let todayDate = new Date();
    let daysAgo = parseInt((todayDate - ts) / (1000 * 60 * 60 * 24)); 
    let newDate;

    // Logic to display how many days ago a tweet was submitted
    if (daysAgo <= 1) {
      newDate = "Today";
    } else if (daysAgo === 1) {
      newDate = "Yesterday";
    } else if (daysAgo >= 2 && daysAgo < 365) {
      newDate = parseInt((todayDate - ts) / (1000 * 60 * 60 * 24)) + " Days Ago";
    } else if (daysAgo >= 365) {
      newDate = parseInt((todayDate - ts) / (1000 * 60 * 60 * 24) / 365) + " Years Ago";
    }

    // Article structure to interpolate new tweet info into
    let article = `<article class="tweet"><header><img class="header-img" src=${tweet.user.avatars.small}><h2 class="header-display">${tweet.user.name}</h2><p class="header-p">${tweet.user.handle}</p></header><section><p class="section-p">${escape(tweet.content.text)}</p></section><footer><p class="footer-p">${newDate}</p><p class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></p></footer></article>`;
    return article;
  }

  /* Function that makes AJAX GET request to /tweets; once this is received the promise passes
  the data to the renderTweets function to process */
  function loadTweets(callback) {
    $.ajax('/tweets', { method: 'GET' }) 
      .then(function (data){
        callback(data);
    });
  }
  
  loadTweets(renderTweets);

});
