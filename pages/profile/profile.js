var selectedFavList = [];

$(document).ready(function () {
  $(".favourites").click(function () {
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

  $("#circle").circleProgress({
    value: 0.6,
    size: 190,
    lineCap: "round",
    thickness: 20,
    startAngle: 40.5,
    animationStartValue: 5 - 5,
    fill: {
      gradient: ["cyan", "#04d9d9"],
    },
  });

  //document.getElementsByClassName("ticketClass")[0].onclick = function () {
  var dataLayerArray = {
    ticketId: 1,
    from: "Colombo",
    to: "kandy",
    departureDate: "Fri, 06 Nov 2021",
    seats: "23A, 24A",
    price: "£20.00",
  };
  // Store to local storage ---------------------------------------------------------------
  // var ratingsList = JSON.parse(localStorage.getItem("tickets"))
  // var ratingsArray = [];
  // if(ratingsList){
  //     ratingsArray = ratingsList;
  // }
  // for (let index = 0; index < 6; index++) {
  //   ratingsArray.push(dataLayerArray)
  // }
  // localStorage.setItem("tickets", JSON.stringify(ratingsArray));

  // Retrieve from local storage ---------------------------------------------------------------
  var ticketArr = JSON.parse(localStorage.getItem("tickets"));

  for (var i = 0; i < ticketArr.length; i++) {
    // Define each individual layer
    var dataLayer = ticketArr[i];
    $(".tickets-grid").append(
      '<div id="ticket-card"><p id="ticketId">Ticket #' +
        dataLayer.ticketId +
        '</p><p id="price">' +
        dataLayer.price +
        '</p><p id="from">' +
        dataLayer.from +
        " --> " +
        dataLayer.to +
        '</p><p id="date">' +
        dataLayer.departureDate +
        '</p><p id="seats">' +
        dataLayer.seats +
        "</p></div>"
    );
  }
  //   $("ticketClass").click(function(event){
  //     event.preventDefault();
  //  });

  renderFavourites();
});

function removeFavourite(poiId) {
  console.log("poiId coming in");
  console.log(poiId);
  var favIds = JSON.parse(localStorage.getItem("favourites"));
  console.log("before removing id");
  console.log(favIds);

  favIds = favIds.filter((item) => item != poiId);
  console.log("afer removing id");
  console.log(favIds);

  localStorage.setItem("favourites", JSON.stringify(favIds));
  // $("#snackbar").text("Removed from favourites");
  // $(".snackbar").toggleClass("center-row space-between");
  // setTimeout(function () {
  //   $(".snackbar").removeClass("center-row space-between");
  // }, 2000);

  renderFavourites();
}

function renderFavourites() {
  // $("#poi-list").remove();
  var renderedFavourites = "";
  var favIds = JSON.parse(localStorage.getItem("favourites"));
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  // console.log(pois);
  // console.log(favIds);

  var favPois = pois.filter((poi) => favIds.includes(poi.poiId));

  // console.log("favs pois");
  // console.log(favPois);

  favPois.forEach(function (item) {
    renderedFavourites += `
    <div class="poi">
      <img
        src="${item.img}"
        alt=""
      />
      <div class="poi-info">
        <input class="check" type="checkbox" id="${item.poiId}" value="${item.poiId}" onclick="onSelect('${item.poiId}');">
        <img
          class="favourites"
          src="./../../assets/images/profile/favourites.png"
          alt=""
          onclick="removeFavourite('${item.poiId}')"
        />
        <div class="card1-text">${item.name}</div>
        
      </div>
    </div>
    `;
  });

  // var button = `
  // <button
  //   class="ui-btn hero-btn"
  //   onClick="sendEmail();"
  // >
  //   SHARE
  // </button>
  // `;

  $("#poi-list").empty().append(renderedFavourites);
  // $("#poi-list").append(button);

  // <div class="poi">
  //   <img
  //     src="./../../assets/images/pois/buckingham-palace.jpg"
  //     alt=""
  //   />
  //   <div class="poi-info">
  //     <img
  //       id="favourites"
  //       src="./../../assets/images/profile/favourites.png"
  //       alt=""
  //     />
  //     <div class="card1-text">Seagull Hunt</div>
  //     <img
  //       src="./../../assets/images/profile/rating.png"
  //       alt=""
  //     />
  //   </div>
  // </div>
}

function sendEmail() {
  var renderdListOfFavPois = "<ul>";
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var selectedPois = pois.filter(poi => {
    return selectedFavList.includes(`${poi.poiId}`);
  });

  console.log(selectedPois);
  selectedPois.forEach(item => {
    renderdListOfFavPois += `
    <li>${item.name}</li>
    `;
  });

  renderdListOfFavPois += "</ul>";

  if (selectedPois.length > 0) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "xplorayl@gmail.com",
      Password: "xplorayl123",
      To: "akram.arm.7@gmail.com",
      From: "xplorayl@gmail.com",
      Subject: "List of Favourites",
      Body: renderdListOfFavPois,
    }).then(function (message) {
      console.log(message);

      $("#snackbar").text("Email sent");
      $(".snackbar").toggleClass("center-row space-between");
      setTimeout(function () {
        $(".snackbar").removeClass("center-row space-between");
      }, 2000);
    });
  } else {
    console.log("nothing selected to send");
    $("#snackbar").text("Nothing is selected to send");
      $(".snackbar").toggleClass("center-row space-between");
      setTimeout(function () {
        $(".snackbar").removeClass("center-row space-between");
      }, 2000);
  }
  
}

function onSelect(id) {
  if ($(`#${id}`).is(":checked") == true) {
    console.log(true);

    selectedFavList.push(id);
  } else {
    console.log(false);
    selectedFavList = selectedFavList.filter(item => item != id);
  }

  console.log(selectedFavList);
}
