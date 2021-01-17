$("#click_advance").click(function () {
  $("#display_advance").toggle("1000");
  $("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
});

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.12085),
    zoom: 5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 4,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}

$(document).ready(function () {
  $(".like").click(function () {
    $(this).toggleClass("heart");

    sessionStorage.setItem("favourites", "british museum");
    var n = document.querySelector(".snackbar");
    $(".snackbar").toggleClass("center-row space-between");
    setTimeout(function () {
      $(".snackbar").removeClass("center-row space-between");
    }, 2000);
  });

  $(".popup-btn").on("click", function () {
    $(".video-popup").fadeIn("slow");
    return false;
  });

  $(".popup-bg").on("click", function () {
    $(".video-popup").slideUp("slow");
    return false;
  });

  $(".close-btn").on("click", function () {
    $(".video-popup").fadeOut("slow");
    return false;
  });
});
