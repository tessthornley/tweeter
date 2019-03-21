$(document).ready(function() {
  /* jQuery used to find compose-tweet textbox and the value of the textbox, 
  then traverse DOM to find the counter element and create variable that subtracts
  the input length of the textbox from the character max. After have conditions to
  indicate whether the counter should be black or red (when character allowance has been
  exceeded).
  */
  $("#compose-tweet").on('input', function() {
    let $composeTweet = $(this);
    let $characterCountdown = $composeTweet.val();
    let $counterElement = $composeTweet.siblings(".counter");
    let $counterValue = $counterElement.text(140 - $characterCountdown.length);
    
    if ($counterValue.text() < 0) {
      $counterElement.addClass("counter-invalid");
    } else if ($counterValue.text() >= 0) {
      $counterElement.removeClass("counter-invalid");
    }
  });
});

