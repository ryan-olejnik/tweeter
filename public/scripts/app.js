function createTweet(tweet){
  // Create HTML tweet:
  var $tweet = $('<article>').addClass('tweet');
  $tweet.append('<header>');
  $tweet.append('<p>').find('p').text(tweet.content.text);
  $tweet.append('<footer>');
  var $h3 = `<h3>${tweet.user.name} - ${tweet.user.handle}</h3>`;
  var $img = `<img src='${tweet.user.avatars.regular}'>`;
  var $foot = `<p>${findDaysAgo(tweet.created_at)}</p>`;
  $tweet.find('header').append($h3);
  $tweet.find('header').append($img);
  $tweet.find('footer').append($foot).addClass('date-tweeted');
  return $tweet;
}

function renderTweets(tweetList){
  $('#tweets-container').empty();
  for (let tweet of tweetList){
    $('#tweets-container').prepend(createTweet(tweet));
  }
}

//----------------------------------------------------------------------

$(document).ready(function(){
  loadTweets();

  // Creating a new Tweet:
  $('#new-tweet-form').on('submit', function(event){
    event.preventDefault();
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

