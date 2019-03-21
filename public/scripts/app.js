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
    let article = `<article class="tweet"><header><img class="header-img" src=${tweet.user.avatars.small}><h2 class="header-display">${tweet.user.name}</h2><p class="header-p">${tweet.user.handle}</p></header><section><p class="section-p">${escape(tweet.content.text)}</p></section><footer><p class="footer-p">${ts.toDateString()}</p><p class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></p></footer></article>`;
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
