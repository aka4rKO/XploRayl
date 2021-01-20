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
  $("#book-now").on("click", function () {
    cardList = [];
    if (localStorage.getItem("cardList")) {
      cardList = localStorage.getItem("cardList");
    }
    var card = JSON.parse(cardList)[cardList.length - 1];

    $.ajax({
      type: "POST",
      url: "https://api.stripe.com/v1/charges",
      headers: {
        Authorization:
          "Bearer sk_test_51HMs5AIDK6dRU6bAiHjaW1hU95a9VHqSWXzChedCrYm2Hb2I0vaotvmOQ8l1YgCy9vWbBQJ1ZvlSjz8w41MO25M500IZSSkvaC",
      },
      data: {
        amount: 2000,
        currency: "usd",
        source: "tok_1IAlAEIDK6dRU6bAwLiVhYBT",
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
    location.href = "./confirmation.html";
  });
});
$(document).ready(function () {
  $("#goto-hunt").on("click", function () {
    location.href = "./../my-hunts/my-hunts.html";
  });
});
