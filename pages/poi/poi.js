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

$(document).ready(function () {
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
