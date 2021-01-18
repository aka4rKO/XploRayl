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
        document.getElementById("my_div").className="show";
      }, 2000);
    }, 2000);
  };
  document.getElementById("my_div").onclick = function () {
    window.location.href = "../../ar/ar.html";
  }
});
//
// window.onload=function()  //executes when the page finishes loading
// {
// 	setTimeout(func1, 2000);  //sets a timer which calls function func1 after 2,000 milliseconds = 2 secs.
// };
// function func1()
// {
	
// }

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