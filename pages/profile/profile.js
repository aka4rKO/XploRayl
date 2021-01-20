var selectedFavList = [];
var  userObj = JSON.parse(localStorage.getItem("user"));

$(document).ready(function() {



  var  userObj = JSON.parse(localStorage.getItem("user"));
  console.log(userObj);
  $('#total-points-value').text(userObj.totalPoints)
  $('#user-rank-position').text(userObj.position)
  $('#places-unlocked').text(userObj.placesUnlocked)
  $('#collected').text(userObj.collectables)
  $('#travel-distance').text(userObj.travelDistance)
  $('#task-completed').text(userObj.taskCompleted)
  $('#coupons-count').text(userObj.coupons.length)
  $('#hunt-count').text(userObj.pastHunts.length)
  $('#username').text(userObj.username)
  $('#review-count').text(userObj.coupons.length)
})
// Add card ----------------------------------------------
$(document).ready(function () {
  $(".ui-input-text").css("border", "unset");

  loadCardList();
});

function loadCardList() {
  var cardsComp = "";
  var cardList = JSON.parse(localStorage.getItem("cardList"));
  if (cardList) {
    cardList.forEach((card) => {
      cardsComp += `
    <div class="order-field center-row placeholder-text">
      <div class="add-card-placeholder label-text">
          <span class="card-number">•••• •••• •••• ${card.last4}</span>
          <span class="card-exp">${card.exp_month}/${card.exp_year}</span>
          <label class="radio-btn">
            <input type="radio" checked="checked" name="radio">
            <span class="checkmark"></span>
          </label>
      </div>
    </div>`;
    });
  }
  $("#card-list").append(cardsComp);
}

function saveCard() {
  var cardName = $("#cardName").val();
  var cardNumber = $("#cardNumber").val();
  var expiryDate = $("#expiryDate").val();

  var expiryArray = expiryDate.split("/");
  var cvv = $("#cvc").val();
  $.ajax({
    type: "POST",
    url: "https://api.stripe.com/v1/tokens",
    headers: {
      Authorization:
        "Bearer sk_test_51HMs5AIDK6dRU6bAiHjaW1hU95a9VHqSWXzChedCrYm2Hb2I0vaotvmOQ8l1YgCy9vWbBQJ1ZvlSjz8w41MO25M500IZSSkvaC",
    },
    data: {
      "card[number]": `${cardNumber}`,
      "card[exp_month]": `${Number(expiryArray[0])}`,
      "card[exp_year]": `${Number(expiryArray[1])}`,
      "card[cvc]": `${cvv}`,
      "card[name]": `${cardName}`,
    },
    success: function (response) {
      console.log("Card Added Successfully: ", response);

      var postReqData = {
        tokenId: response.id,
        id: response.card.id,
        exp_month: response.card.exp_month,
        exp_year: response.card.exp_year,
        last4: response.card.last4,
        name: cardName,
      };

      var cardList = [];
      if (localStorage.getItem("cardList")) {
        var cardList = JSON.parse(localStorage.getItem("cardList"));
      }
      var cardsArray = [];

      if (cardList) {
        cardsArray = cardList;
      }
      cardsArray.push(postReqData);
      localStorage.setItem("cardList", JSON.stringify(cardsArray));
      console.log(cardsArray);
    },
    error: (response) => {
      console.log("error payment: ", response.responseJSON.error.message);
      $(".cardErr").html(response.responseJSON.error.message);
    },
  });
  loadCardList();
}

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
  var userObj = JSON.parse(localStorage.getItem("user"));
  if (userObj && userObj.ranking) {
    document.getElementById("rank" + userObj.ranking).className +=
      " active-rank";
    document.getElementById("current-rank-image").src =
      "/assets/images/ranks/rank" + userObj.ranking + ".png";
  }
  var userObj = JSON.parse(localStorage.getItem("user"));
  var rankArr = [
    "Crew Lead",
    "Captain",
    "Quartermaster",
    "First Mate Traveler",
    "Second Mate",
  ];
  $("#user-rank-name").append(rankArr[userObj.ranking - 1]);

  // Retrieve from local storage ---------------------------------------------------------------
  //  TICKETS
  for (var i = 0; i < userObj.tickets.length; i++) {
    // Define each individual layer
    var ticketObj = userObj.tickets[i];
    $(".tickets-grid").append(
      '<div id="ticket-card"><p id="ticketId">Ticket #' +
        ticketObj.ticketId +
        '</p><p id="price">$' +
        ticketObj.price +
        '.00</p><p id="from">' +
        ticketObj.from +
        " > " +
        ticketObj.to +
        '</p><p id="date">Departure: ' +
        moment(ticketObj.departureDate, 'DD/MM/YYYY').format("Do MMM YYYY")
         +
        '</p><p id="seats">Seats: ' +
        ticketObj.seats +
        "</p></div>"
    );
  }

  //  COUPONS
  for (var i = 0; i < userObj.coupons.length; i++) {
    // Define each individual layer
    var couponObj = userObj.coupons[i];
    $(".coupons-grid").append(
      '<div id="coupon-card"><img id="coupon-img" src="./../../assets/images/coin.png" alt="coupon" /><h2 id="coupon-name">' +
        couponObj.name +
        '</h2><p id="coupon-validity">Valid till ' +
        moment(couponObj.expiryDate, 'DD/MM/YYYY').format("Do MMM YYYY")
        +
        '</p><p id="coupon-code">Code: ' +
        couponObj.code +
        '</p><h2 id="coupon-price">$' +
        couponObj.amount +
        "</h2></div>"
    );
  }
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

  if (favPois.length > 0) {
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
  } else {
    renderedFavourites = `
    <div class="center-column no-favs"><p>No favourites added!</p></div>
    `;
  }

  

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

  var selectedPois = pois.filter((poi) => {
    return selectedFavList.includes(`${poi.poiId}`);
  });

  console.log(selectedPois);
  selectedPois.forEach((item) => {
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
    selectedFavList = selectedFavList.filter((item) => item != id);
  }

  console.log(selectedFavList);
}
