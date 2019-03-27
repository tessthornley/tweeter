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

  // jQuery used to prevent form submit button's default event and later submit with form with AJAX
  $("form").submit(function(event) {
  event.preventDefault();

  /* Conditions to ensure users cannot submit empty tweets or tweets beyond the character limit.
  Error messages will display if conditions are met, otherwise AJAX post request will serialize and submit the
  form to /tweets, then reload the homepage with the new tweet.
  */
  let $textAreaValue = $('#compose-tweet').val();
  if ($textAreaValue.length > 140) {
      $('.error').text("Error! Character count cannot exceed 140. Please compose a tweet of 140 characters or less.");
      $('.error').hide();
      $('.error').slideDown(function () {
        $("form").submit(function(event) {
          $('.error').hide();
          $('.error').slideDown();
        });
      });
      return;
    } else if ($textAreaValue === '') {
      $('.error').text('Error! Textbox is empty. Please enter some characters in the textbox to compose your tweet.');
      $('.error').hide();
      $('.error').slideDown(function () {
        $("form").submit(function(event) {
          $('.error').hide();
          $('.error').slideDown();
        });
      });
      return;
    } else {
      $('.error').hide();
      // AJAX POST request to add tweet to homepage and reload homepage on submit
      $.post("/tweets", $('form').serialize());
      location.reload(true);
    }   
  });
  
  // JS code to toggle the compose-tweet box on and off when compose button is clicked and focus textbox when clicked
  $('.button').click(function () {
    $(".new-tweet").slideToggle(function () {
      $('#compose-tweet').focus();
    });
  });
});

