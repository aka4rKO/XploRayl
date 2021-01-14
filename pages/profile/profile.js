$(document).ready(function () {
    $('#circle').circleProgress({
        value: 0.6,
        size: 190,
        lineCap: "round",
        thickness: 20,
        startAngle: 2,
        animationStartValue: 5 - 5,
        fill: {
          gradient: ["cyan", "#04d9d9"]
        }
 }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
      });
  });