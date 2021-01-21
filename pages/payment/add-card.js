var ticket;

$(document).ready(function () {
  $(".ui-input-text").css("border", "unset");

  loadCardList();
  loadInfo();

  $("#save-card").click(() => {
    saveCard();
  });
});

function loadInfo() {
  console.log();
  var passengers = Number(sessionStorage.getItem("passengers"));
  var treasureAmt = Number(sessionStorage.getItem("treasureMapAmt"));
  var couponAmt = Number(sessionStorage.getItem("couponAmt"));

  var ticketId = Math.floor(Math.random() * 100);
  var from = sessionStorage.getItem("departure");
  var to = sessionStorage.getItem("arrival");
  var date = sessionStorage.getItem("date");
  var totalTicketPrice = passengers * 2 + treasureAmt - couponAmt;

  $("#orderCard").append(`
  <div class="div1 card3-text">Order #${Math.floor(Math.random() * 100)}</div>
  <div class="div2 card3-text">Ticket</div>
  <div class="div3 right-align light-card-text">${passengers} seats</div>
  <div class="div4 right-align card3-text">£ ${passengers * 2}</div>
  <div class="div5 card3-text">Treasure Map</div>
  <div class="div6 right-align light-card-text">1</div>
  <div class="div7 right-align card3-text">£ ${treasureAmt}</div>
  <div class="div8 right-align light-card-text">Coupon</div>
  <div class="div9 right-align card3-text">£ ${sessionStorage.getItem(
    "couponAmt"
  )}</div>
  <div class="div10 card3-text center-vertically">
    <img
      src="/assets/icons/checkbox-selected.png"
      alt=""
    />&nbsp;Confirmed
  </div>
  <div class="div11 right-align light-card-text">Total</div>
  <div class="div12 right-align card3-text">£ ${totalTicketPrice}</div>
  `);

  var currentId = sessionStorage.getItem("currentId");
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var poi = pois.filter((obj) => {
    return obj.poiId == currentId;
  });

  $("#tikInfoCard").append(`
  <div class="tik-info card3-text">Ticket Information</div>
  <div class="card3-text">From</div>
  <div class="right-align light-card-text">${from}</div>
  <div class="card3-text">To</div>
  <div class="right-align light-card-text">${to}</div>
  <div class="card3-text">Date</div>
  <div class="right-align light-card-text">${date}</div>
  <div class="card3-text">Seats</div>
  <div class="right-align light-card-text">${passengers}</div>
  <div class="card3-text center-vertically marg-top">
    <img
      src="/assets/icons/checkbox-selected.png"
      alt=""
    />&nbsp;Booked
  </div>
  <div class="right-align light-card-text marg-top">Ticket #${ticketId}</div>
  `);

  ticket = {
    ticketId: ticketId,
    from: from,
    to: to,
    departureDate: date,
    seats: passengers,
    price: totalTicketPrice,
  };
}

function loadCardList() {
  var cardsComp = "";
  var cardList = JSON.parse(localStorage.getItem("cardList"));
  if (cardList) {
    cardList.forEach((card) => {
      cardsComp += `
    <div class="order-field center-row placeholder-text ">
      <div class="add-card-placeholder label-text ">
        <label class="radio-btn">
          <span class="card-number">•••• •••• •••• ${card.last4}</span>
          <span class="card-exp">${card.exp_month}/${card.exp_year}</span>
          <span class="cardName">${(card.name).split(' ')[0]}</span>
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
      location.reload();

      console.log(cardsArray);
    },
    error: (response) => {
      console.log("error payment: ", response.responseJSON.error.message);
      $(".cardErr").html(response.responseJSON.error.message);
    },
  });

  // no need to specify document ready
}

$(document).ready(function () {
  $("#book-now").on("click", function () {
    cardList = [];
    if (localStorage.getItem("cardList")) {
      cardList = localStorage.getItem("cardList");
    }
    var card = JSON.parse(cardList)[0];
    var amount = sessionStorage.getItem("total");
    var currency = sessionStorage.getItem("total");
    $.ajax({
      type: "POST",
      url: "https://api.stripe.com/v1/charges",
      headers: {
        Authorization:
          "Bearer sk_test_51HMs5AIDK6dRU6bAiHjaW1hU95a9VHqSWXzChedCrYm2Hb2I0vaotvmOQ8l1YgCy9vWbBQJ1ZvlSjz8w41MO25M500IZSSkvaC",
      },
      data: {
        amount: amount,
        currency: "GBP",
        source: card.tokenId,
      },
      success: function (response) {
        console.log("Successfully Purchased: ", response);
      },
      error: (response) => {
        console.log("error payment: ", response.responseJSON.error.message);
        $(".cardErr").html(response.responseJSON.error.message);
      },
    });
    location.href = "./success.html";
  });
});

$(document).ready(function () {
  $("#success-ok-btn").on("click", function () {
    loadInfo();
    location.href = "./confirmation.html";
  });
});
$(document).ready(function () {
  $("#goto-hunt").on("click", function () {
    var userObj = JSON.parse(localStorage.getItem("user"));
    var tickets = userObj["tickets"];
    console.log(userObj);
    tickets.push(ticket);

    userObj["tickets"] = tickets;
    console.log(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    location.href = "./../my-hunts/my-hunts.html";
  });
});
