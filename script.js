// Removes the sliding animation issue from the navbar
$(document).ready(function () {
  $(".footer-navbar").removeClass("slideup");
});

// Removes the default ajax loading in anchor tags in mobile jquery
$(function () {
  $(".anchor-external").attr("rel", "external");
});

