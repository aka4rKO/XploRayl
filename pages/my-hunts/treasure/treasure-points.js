$(document).ready(function () {
    $("#circle")
      .circleProgress({
        value: 0.6,
        size: 160,
        lineCap: "round",
        thickness: 15,
        startAngle: 40.5,
        animationStartValue: 5 - 5,
        fill: {
          gradient: ["cyan", "#04d9d9"],
        },
      })
  });