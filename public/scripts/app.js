// var sample_tweet = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

// const tweetList = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

// Create tweet:

function createTweet(tweet){
  var $tweet = $('<article>').addClass('tweet');
  $tweet.append('<header>');
  $tweet.append('<p>').find('p').text(tweet.content.text);
  $tweet.append('<footer>');
  $tweet.find('header').append('<h3>').find('h3').text(`${tweet.user.name} aka ${tweet.user.handle}`);
  $tweet.find('header').append('<img>').find('img').attr('src', tweet.user.avatars.regular);
  $tweet.find('footer').append('<p>').addClass('date-tweeted').find('p').text(findDaysAgo(tweet.created_at));
  // create children seperately (with text), and then append them to article so that if additional <p> are added, they are not targeted
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
    $('.new-tweet').toggleClass('hidden');

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
    // alert('button clicked!');
    $('.new-tweet').toggleClass('hidden');
    $('.new-tweet').find('textarea').focus();

  });



});

