$(document).ready(function () {
  var currentPoiId = JSON.parse(sessionStorage.getItem("currentId"));

  renderPOIInfo();

  $(".like").click(function () {
    $(this).toggleClass("heart");
    var favs = JSON.parse(localStorage.getItem("favourites"));

    var favouriteId = favs.filter((obj) => {
      return obj === currentPoiId;
    });

    if (favouriteId[0] !== currentPoiId) {
      favs.push(currentPoiId);
      localStorage.setItem("favourites", JSON.stringify(favs));
      $("#snackbar").text("Successfully added to favourites");
      $(".snackbar").toggleClass("center-row space-between");
      setTimeout(function () {
        $(".snackbar").removeClass("center-row space-between");
      }, 2000);
    } else {
      var newFavs = favs.filter((obj) => {
        return obj !== currentPoiId;
      });

      localStorage.setItem("favourites", JSON.stringify(newFavs));
      $("#snackbar").text("Removed from favourites");
      $(".snackbar").toggleClass("center-row space-between");
      setTimeout(function () {
        $(".snackbar").removeClass("center-row space-between");
      }, 2000);
    }
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

function renderPOIInfo() {
  var poiId = JSON.parse(sessionStorage.getItem("currentId"));
  console.log(poiId);

  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var poi = pois.filter((obj) => {
    return obj.poiId === poiId;
  });

  var poi = poi[0];
  var reviews = poi["reviews"];
  var fiveStarRating = Number(poi.ratings["5"]);
  var fourStarRating = Number(poi.ratings["4"]);
  var threeStarRating = Number(poi.ratings["3"]);
  var twoStarRating = Number(poi.ratings["2"]);
  var oneStarRating = Number(poi.ratings["1"]);
  var totalRating =
    fiveStarRating +
    fourStarRating +
    threeStarRating +
    twoStarRating +
    oneStarRating;

  var avgRating =
    ((fiveStarRating * 5 +
      fourStarRating * 4 +
      threeStarRating * 3 +
      twoStarRating * 2 +
      oneStarRating * 1) /
    totalRating).toFixed(2);

  console.log(avgRating);

  var mainImg = `
  <div class="poi">
    <img
      src="${poi.img}"
      alt=""
    />
    <div class="poi-info">
      <div>
        <div class="poi-img-main-text">${poi.name}</div>
        <div class="center-vertically-margin-top">
          <img
            class="poi-img-icon-color"
            src="./../../assets/icons/map-pin.svg"
            alt=""
          />
          <span class="card2-text">&nbsp;${poi.location}</span>
        </div>
      </div>
    </div>
  </div>
  `;

  var ratingDesc = `
  <div class="margin-top rating center-vertically">
    <img src="./../../assets/icons/star.svg" alt="" />
    <span class="card3-text">&nbsp;<b>${avgRating}</b>&nbsp;</span>
    <span class="card3-text">(${totalRating} ratings)</span>
  </div>
  <div class="margin-top favourite">
    <img src="./../../assets/icons/share-2.svg" alt="" />

    <div class="snackbar">
      <span class="card1-text" id="snackbar"
        ></span
      >
    </div>
    <i class="like fa fa-heart fa-2x"></i>
  </div>
  <div class="price"><h2>£ ${poi.price}</h2></div>
  <div class="description">
    <p>
    ${poi.description}
    </p>
  </div>
  `;

  var huntDetails = `
  <div class="map-heading">
    <h2 class="margin-bottom map-heading">Hunt details</h2>
  </div>
  <div class="arrival center-row space-between">
    <span>Arrival</span>
    <span> <b>${poi.arrival}</b> </span>
  </div>
  <div class="commute-distance center-row space-between">
    <span>Commute distance</span>
    <span> <b>${poi.commuteDistance} KM</b> </span>
  </div>
  <div class="walking-distance center-row space-between">
    <span>Walking distance</span>
    <span> <b>${poi.walkingDistance} KM</b> </span>
  </div>
  <div class="difficult-level center-row space-between">
    <span>Difficulty level</span>
    <span> <b>${poi.difficultyLevel}</b> </span>
  </div>
  <div class="time center-row space-between">
    <span>Time</span>
    <span> <b>About ${poi.time} hours</b> </span>
  </div>
  `;

  var videoModal = `
  <iframe
    src="${poi.video}"
    class="video-frame"
  ></iframe>
  `;

  var gallery = `
  <h2 class="ui-content">Gallery</h2>
  <div class="gallery-grid">
    <div class="video center-column">
      <a class="" href="#video-modal" rel="modal:open">
        <img class="play-btn" src="/assets/icons/play.svg" alt="" />
      </a>

      <img
        class="vid-img"
        src="${poi.img}"
        alt=""
      />
    </div>
    <div class="img1">
      <img src="https://i.insider.com/5a97e971aae60565008b45c8?width=1100&format=jpeg&auto=webp" alt="" />
    </div>
    <div class="img2">
      <img src="https://loveincorporated.blob.core.windows.net/contentimages/gallery/88fab4d5-a7ba-46a2-9536-4fdd6be870f2-Natural_history_museum-Alexey_Fedorenko-shutterstock.jpg" alt="" />
    </div>
    <div class="img3">
      <img src="https://visitbath.co.uk/images/uploads/site/roman_baths_bath_historic_venues_960x480.jpg" alt="" />
    </div>
    <div class="img4">
      <img src="https://www.blogpreston.co.uk/wp-content/uploads/2011/11/harris-museum-630x364.jpg" alt="" />
    </div>
  </div>
  `;

  var ratingStats = `
  <div class="ratings-reviews-header">
    <h2 class="rating-head ui-content">Ratings & reviews</h2>
  </div>
  <div class="ratings center-row left-column">
    <div class="center-column" style="margin-right: 1em">
      <h1 style="margin: 0">${avgRating}</h1>
      <div class="card3-text">out of 5</div>
    </div>
    <div class="rating-numbers">
      <div class="center-vertically">
        <span class="card3-text">${fiveStarRating}</span>
        <span>
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
        </span>
      </div>
      <div class="center-vertically">
        <span class="card3-text">${fourStarRating}</span>
        <span>
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
        </span>
      </div>
      <div class="center-vertically">
        <span class="card3-text">${threeStarRating}</span>
        <span>
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
        </span>
      </div>
      <div class="center-vertically">
        <span class="card3-text">${twoStarRating}</span>
        <span>
          <img src="./../../assets/icons/star.svg" alt="" />
          <img src="./../../assets/icons/star.svg" alt="" />
        </span>
      </div>
      <div class="center-vertically">
        <span class="card3-text">${oneStarRating}</span>
        <span>
          <img src="./../../assets/icons/star.svg" alt="" />
        </span>
      </div>
    </div>
  </div>
  `;

  var reviewDom = "";
  reviews.forEach(function (item) {
    var renderStars = "";
    for (var i = 0; i < item.rating; i++) {
      renderStars += `
      <img src="./../../assets/icons/star.svg" alt="" />
    `;
    }

    reviewDom += `
    <div class="review-card">
      <span
        ><img
          src="/assets/images/avatars/person-avatar.jpg"
          alt=""
          class="avatar"
      /></span>
      <div class="review-text">${item.name}</div>
      <div>
        <span id="repeat-stars">
          ${renderStars}
        </span>
      </div>
      <p>
        ${item.review}
      </p>
    </div>
    `;
  });

  $("#main-img").append(mainImg);
  $("#rating-desc").append(ratingDesc);
  $("#hunt-details").append(huntDetails);
  $("#video-modal").append(videoModal);
  $("#gallery").append(gallery);
  $("#rating-stats").append(ratingStats);
  $("#reviews").append(reviewDom);
}
