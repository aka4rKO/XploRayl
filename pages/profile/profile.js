$(document).ready(function () {
  $('h1').load('newnew.html');
  $("#circle")
    .circleProgress({
      value: 0.6,
      size: 190,
      lineCap: "round",
      thickness: 20,
      startAngle: 40.5,
      animationStartValue: 5 - 5,
      fill: {
        gradient: ["cyan", "#04d9d9"],
      },
    })
});


