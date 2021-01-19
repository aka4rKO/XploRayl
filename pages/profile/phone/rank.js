$(document).ready(function () {
  var userObj = JSON.parse(localStorage.getItem("user"));
  if (userObj && userObj.ranking) {
    document.getElementById("rank" + userObj.ranking).className += " active-rank";
    document.getElementById("current-rank-image").src = "/assets/images/ranks/rank"+userObj.ranking+".png";
  }
});
