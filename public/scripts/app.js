/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
        $("#tweets-container").prepend($tweet);
    });
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } 

  function createTweetElement(tweet) {
    let ts = new Date(tweet.created_at);
    let todayDate = new Date();
    let daysAgo = parseInt((todayDate - ts) / (1000 * 60 * 60 * 24)); 
    let newDate;

    if (daysAgo <= 1) {
      newDate = "Today";
    } else if (daysAgo > 1 && daysAgo <= 2) {
      newDate = "Yesterday";
    } else if (daysAgo > 2 && daysAgo < 365) {
      newDate = parseInt((todayDate - ts) / (1000 * 60 * 60 * 24)) + " Days Ago";
    } else if (daysAgo >= 365) {
      newDate = parseInt((todayDate - ts) / (1000 * 60 * 60 * 24) / 365) + " Years Ago";
    }

    let article = `<article class="tweet"><header><img class="header-img" src=${tweet.user.avatars.small}><h2 class="header-display">${tweet.user.name}</h2><p class="header-p">${tweet.user.handle}</p></header><section><p class="section-p">${escape(tweet.content.text)}</p></section><footer><p class="footer-p">${newDate}</p><p class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></p></footer></article>`;
    return article;
  }

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' }) 
      .then(function (data){
        renderTweets(data);
    });
  }
  
  loadTweets();

});
