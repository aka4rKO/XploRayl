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


function initMap() {
  var poiId = JSON.parse(sessionStorage.getItem("currentId"));

  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var poi = pois.filter((obj) => {
    return obj.poiId === poiId;
  });

  var poi = poi[0];

  var latitude = poi["lat"];
  var longitude = poi["lng"];

  const myLatLng = { lat: latitude, lng: longitude };
  const map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 12,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}