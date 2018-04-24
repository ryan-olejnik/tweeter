/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var sample_tweet = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// Create tweet:

function createTweet(tweet_info){
  var $tweet = $('<article>').addClass('tweet');
  $tweet.append('<header>');
  $tweet.append('<p>').find('p').text(tweet_info.content.text);
  $tweet.append('<hr>');
  $tweet.append('<footer>');
  $tweet.find('header').append('<h3>').find('h3').text(`${tweet_info.user.name} aka ${tweet_info.user.handle}`);
  $tweet.find('header').append('<img>').find('img').attr('src', tweet_info.user.avatars.regular);
  $tweet.find('footer').append('<p>').addClass('date-tweeted');
  return $tweet;
}

var new_tweet = createTweet(sample_tweet)
console.log(new_tweet[0]);


// Write tweet to index.html:
$(document).ready(function(){
  $('#tweets-container').append(createTweet(sample_tweet));

  
});
