function findDaysAgo(timeOfTweet){
  var today = new Date();
  var daysDiff = (today - timeOfTweet)/1000/60/60/24;
  return Math.round(daysDiff);
};


