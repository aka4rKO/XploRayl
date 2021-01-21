
$( function() {
  $(".tab-nav").click(function() {
    if( $( this ).hasClass( 'active' ) ) {
       return;
    }
    $(".tab-nav").removeClass( 'active' );
    $( this ).addClass( 'active' );
});
});

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
      return obj.poiId == poiId;
    });
  
  
    var latitude = poi["lat"];
    var longitude = poi["lng"];

    var taskList = poi[0].tasks;
    center = { lat: Number(taskList[0].lat), lng: Number(taskList[0].lng) };
    
    const myLatLng = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById("map-container"), {
      zoom: 13,
      center: center,
    });



    var icon = {
      url: "./../../../assets/images/treasure_transparent.png", // url
      scaledSize: new google.maps.Size(50, 50), // scaled size

  };
    taskList.forEach(task=>{
      var latLng = { lat: Number(task.lat), lng: Number(task.lng) };
      new google.maps.Marker({
        position: latLng,
        map,
        title: "Mystery Chest!",
        icon:icon
      });
      const cityCircle = new google.maps.Circle({
        strokeColor: "#04d3d9",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#04d3d9",
        fillOpacity: 0.20,
        map,
        center: latLng,
        radius: 1200
      });
    })

  }



$(document).ready(function(){
  var dataObj = JSON.parse(localStorage.getItem("data"));
    var pois = dataObj["poiObjs"];
    poiId = sessionStorage.getItem("currentId");

    var poi = pois.filter((obj) => {
      return obj.poiId == poiId;
    })

    $('.rating').rating();
  });
      
  
  $(document).ready(function(){
    $(".ui-input-text").css("border", "unset");

    var poiId = JSON.parse(sessionStorage.getItem("currentId"));
  
    var dataObj = JSON.parse(localStorage.getItem("data"));
    var pois = dataObj["poiObjs"];
  
    var poi = pois.filter((obj) => {
      return obj.poiId == poiId;
    });
  

    $("#hunt-name").text(poi[0].name);
    $("#hunt-location").text(poi[0].location);
    $("#hunt-date").text(poi[0].date);
    $('.hunt-home').css('background-image',`url(${poi[0].img})`)

      $("#review-btn" ).click(function() {
           var reviewMessage = $("#review-message").val();
           var ratings = $("#ratingSlider").val()
           var  userObj = JSON.parse(localStorage.getItem("user"));

           var postReqData = {
               id : 12,
               name: userObj.username,
               review : reviewMessage,
               rating:ratings
           }
  
           var ratingsList = JSON.parse(localStorage.getItem("reviews"))
           var ratingsArray = [] ;
  
           if(ratingsList){
               ratingsArray = ratingsList;
           }
           ratingsArray.push(postReqData)
           localStorage.setItem("reviews", JSON.stringify(ratingsArray));
           
           
           poi[0].reviews.push(postReqData);
           localStorage.setItem("data", JSON.stringify(dataObj));
           


           window.location.href = "../profile/profile.html"
          });

    });


  $(document).ready(function(){
      $("#end-hunt" ).click(function() {
           
  
          });
    });
  
    $(document).ready(function () {


      loadTaskList();
      loadUpcoming();
      loadPastHunts();
    }
    );
    
    function loadTaskList() {
      var cardsComp = "";
      var cardList = JSON.parse(localStorage.getItem("task-list"))
      var dataObj = JSON.parse(localStorage.getItem("data"));
      var pois = dataObj["poiObjs"][0];
      var taskList = pois.tasks;
   
    
      if (taskList) {
        taskList.forEach(task => {
          cardsComp += `
          <div class="phone-tab-list-view ">
          <label>${task.name}</label>
          <label style="text-align: right">${task.points} pts</label>
          <img
            class="points-img left-align"
            src=${task.isComplete ? "./../../../assets/images/treasure.png" : "./../../../assets/images/task-disabled.svg"}
            alt=""
          />
        </div>`;
        });
      }
      $("#task-list").append(cardsComp);
    }
  
    function loadUpcoming(){
      var cardsComp ='';
      var user = JSON.parse(localStorage.getItem("user"));
      upcomingList = user.upcomingHunts;

      upcomingList.forEach(hunt=> {
        cardsComp +=
    
      `
      <div class="poi">
                    <img
                      src=${hunt.img_url}
                      alt=""
                    />
                    <div class="poi-info">
                      <div>
                        <div class="card4-text">${hunt.name}</div>
                        <div class="center-vertically-margin-top">
                          <img
                            class="poi-img-icon-color"
                            src="./../../assets/icons/map-pin.svg"
                            alt=""
                          />
                          <span class="card2-text">&nbsp;${hunt.location}</span>
                        </div>
                        <div class="center-vertically-margin-top">
                          <img
                            class=""
                            src="./../../assets/icons/star.png"
                            alt=""
                          />
                          <span class="card2-text">&nbsp;${hunt.rating}</span>
                        </div>
                      </div>

                      <div class="left-column bottom-column">
                        <div class="card1-text">£ ${hunt.price}</div>
                      </div>
                    </div>
                  </div>` });
                  $("#upcoming-list").append(cardsComp);

    }
    function loadPastHunts(){
      var cardsComp ='';
      var user = JSON.parse(localStorage.getItem("user"));
      upcomingList = user.pastHunts;

      upcomingList.forEach(hunt=> {
        cardsComp +=
    
      `
      <div class="poi">
      <img
        src="${hunt.img_url}"
        alt=""
      />
      <div class="poi-info" >
        <div>
          <div class="card4-text">${hunt.name}</div>
          <div class="center-vertically-margin-top">
            <img
              class="poi-img-icon-color"
              src="./../../assets/icons/map-pin.svg"
              alt=""
            />
            <span class="card2-text">&nbsp;${hunt.location}</span>
          </div>
          <div class="center-vertically-margin-top">
            <img
              class=""
              src="./../../assets/icons/star.png"
              alt=""
            />
            <span class="card2-text">&nbsp;${hunt.rating}</span>
          </div>
        </div>

        <div class="left-column bottom-column">
          <p style="color: white !important">Pts. earned</p>
          <div class="card1-text">${hunt.pts}</div>
        </div>
      </div>
    </div>` });


                  
                  $("#past-list").append(cardsComp);

    }

  
  
