$(document).ready(function () {
  $("#circle").circleProgress({
    value: 0.6,
    size: 190,
    lineCap: "round",
    thickness: 20,
    startAngle: 40.5,
    animationStartValue: 5 - 5,
    fill: {
      gradient: ["cyan", "#04d9d9"],
    },
  });
  var userObj = JSON.parse(localStorage.getItem("user"));
  var rankArr = [
    "Crew Lead",
    "Captain",
    "Quartermaster",
    "First Mate Traveler",
    "Second Mate",
  ];
  $("#user-rank-name").append(rankArr[userObj.ranking - 1]);
});

$(document).ready(function() {
  var  userObj = JSON.parse(localStorage.getItem("user"));
  console.log(userObj);
  $('#points-value').text(userObj.totalPoints)
  $('#user-rank-position').text(userObj.position)
  $('#places-unlocked').text(userObj.placesUnlocked)
  $('#collected').text(userObj.collectables)
  $('#travel-distance').text(userObj.travelDistance)
  $('#task-completed').text(userObj.taskCompleted)
  $('#coupons-count').text(userObj.coupons.length)
  $('#hunt-count').text(userObj.pastHunts.length)
  $('#username').text(userObj.username)
  $('#review-count').text(userObj.coupons.length)
})