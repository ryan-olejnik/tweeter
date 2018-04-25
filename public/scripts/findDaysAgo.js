function findDaysAgo(timeOfTweet){
  var today = new Date();
  var daysDiff = (today - timeOfTweet)/1000/60/60/24;
  let years = 0;
  let months = 0;
  let days = 0;

  while(daysDiff > 365){
      years +=1;
      daysDiff -= 365;
  };

  while(daysDiff > 31){
    months += 1;
    daysDiff -= 31
  };

  return `${years}y, ${months}m, ${Math.round(daysDiff)}d ago`;




};


