$(document).ready(function() {
  $("#compose-tweet").on('input', function() {
    let $composeTweet = $(this);
    let $characterCountdown = $composeTweet.val();
    let $counterElement = $composeTweet.siblings(".counter");
    let $counterValue = $counterElement.text(140 - $characterCountdown.length);
    
    if ($counterElement.text() < 0) {
      $counterElement.addClass("counter-invalid");
    } else if ($counterElement.text() >= 0) {
      $counterElement.removeClass("counter-invalid");
    }
  });
});

