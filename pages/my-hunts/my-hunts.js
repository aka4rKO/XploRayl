/* var header = document.getElementById("list-view");
var btns = header.getElementsByClassName("tab-nav");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace("active", "");
  this.className += "active";
  });
} */

$(document).on('click', 'tab-nav', function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
})
function myMap() {
    var mapProp = {
      center: new google.maps.LatLng(51.508742, -0.12085),
      zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }
  
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



$(document).ready(function(){
    $('.rating').rating();
  });
      
  
  $(document).ready(function(){
      $("#review-btn" ).click(function() {
           var reviewMessage = $("#review-message").val();
           var ratings = $("#ratingSlider").val()
  
           var postReqData = {
               id : 12,
               reviewMessage : reviewMessage,
               ratings:ratings
           }
  
           var ratingsList = JSON.parse(localStorage.getItem("reviews"))
           var ratingsArray = [] ;
  
           if(ratingsList){
               ratingsArray = ratingsList;
           }
           ratingsArray.push(postReqData)
           localStorage.setItem("reviews", JSON.stringify(ratingsArray));
           console.log(ratingsArray);
           window.location.href = "../profile/profile.html"

  
          });

    });


  $(document).ready(function(){
      $("#end-hunt" ).click(function() {
           
  
          });
    });
  
  
  
    
  
  
  
