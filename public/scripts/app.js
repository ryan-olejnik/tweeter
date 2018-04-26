// Create tweet:

function createTweet(tweet){
  var $tweet = $('<article>').addClass('tweet');
  $tweet.append('<header>');
  $tweet.append('<p>').find('p').text(tweet.content.text);
  $tweet.append('<footer>');
  $tweet.find('header').append('<h3>').find('h3').text(`${tweet.user.name} aka ${tweet.user.handle}`);
  $tweet.find('header').append('<img>').find('img').attr('src', tweet.user.avatars.regular);
  $tweet.find('footer').append('<p>').addClass('date-tweeted').find('p').text(findDaysAgo(tweet.created_at));
  // CHANGES TO MAKE: create children seperately (with text), and then append them to article so that if additional <p> are added, they are not targeted
  return $tweet;
}

function renderTweets(tweetList){
  $('#tweets-container').empty();
  for (let tweet of tweetList){
    $('#tweets-container').prepend(createTweet(tweet));
    // console.log(tweet);
  }
}

//-------------------------------------------------------------

$(document).ready(function(){
  loadTweets();

  // Creating a new Tweet:
  $('#new-tweet-form').on('submit', function(event){
    // Prevent the form from sending  POST request to the server, and redirecting the page
    event.preventDefault();
    // alert('tweet was clicked');
    // console.log(event);

    var tweet = $(this).serialize();
    var tweetLength = $(this).find('textarea').val().length;

    if (tweetLength > 140){
      alert('Maximum 140 characters!!');
    }
    else if (tweetLength === 0){
      alert('Nothing to tweet....');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweet,

        success: function(data, status, jqXHR){
          console.log('Tweet successfully posted to tweet database!\n status:', status);
          loadTweets();
        },

        error: function(jqXHR, status, error){
          console.log('Tweet was NOT posted to tweet database\nstatus:', status, '\nError thrown:', error);
        }
      });
    $(this).find('textarea').val('');
  }
  $('#new-tweet-form').find('textarea').focus();
  $('#counter').text(140);
  });


  function loadTweets(){
    // GET list of tweets from /tweets:
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(data){
        console.log('Tweets in in-memory-db.js loaded to home page!');
        renderTweets(data);

      }
    });
  }

  //Toggle new-tweet section visibility:
  $('#toggle-newTweet-view').on('click', function() {
    $('.new-tweet').slideToggle(150);
    $('.new-tweet').find('textarea').focus();

  });



});

