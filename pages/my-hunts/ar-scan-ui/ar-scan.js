$(document).ready(function () {
  var video = document.querySelector("#videoElement");

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }

  $("#logo").click(function () {
    $(".background").toggleClass("background-active");
  });
  var background = document.getElementsByClassName("background")[0];

  document.getElementsByClassName("toggleButton")[0].onclick = function () {
    document.getElementById("logo").style.display = "none";
    background.classList.add("horizTranslate");
    setTimeout(function () {
      background.classList.remove("horizTranslate");
      background.classList.add("vertTranslate");
      setTimeout(function () {
        window.location = "../treasure/treasure.html";
      }, 2000);
    }, 2000);
  };
  console.log("over");
});
