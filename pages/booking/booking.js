$(document).ready(function () {
  var currentId = sessionStorage.getItem("currentId");
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var poi = pois.filter((obj) => {
    return obj.poiId == currentId;
  });

  var passengers = sessionStorage.getItem("passengers");

  $("#arrival").append(poi[0].arrival);
  $("#treasureMap").append(`£ ${poi[0].price}`);
  $("#trainTicketPrice").append(`£ ${2 * passengers}`);

  sessionStorage.setItem("arrival", poi[0].arrival);
  sessionStorage.setItem("treasureMapAmt", poi[0].price);

  var tot = Number(poi[0].price) + Number(2 * passengers);
  sessionStorage.setItem("total", tot);

  $("#subTotal").append(`£ ${tot}`);
  $("#total").append(`£ ${tot}`);

  renderCoupons();
});

function renderCoupons() {
  var couponsRendered = "";

  var userObj = JSON.parse(localStorage.getItem("user"));
  var coupons = userObj["coupons"];

  coupons.forEach((element) => {
    couponsRendered += `
    <a href="#" rel="modal:close" onclick="applyCoupon('${element.name}', '${element.code}', '${element.amount}', '${element.expiryDate}');">
      <div class="coupon-card">
        <img
          class="coupon-img"
          src="./../../assets/images/coin.png"
          alt="coupon"
        />
        <h2 class="coupon-name">${element.name}</h2>
        <p class="coupon-validity">Valid till ${element.expiryDate}</p>
        <p class="coupon-code">${element.code}</p>
        <h2 class="coupon-price">£ ${element.amount}</h2>
      </div>
    </a>
    `;
  });

  $("#coupons").append(couponsRendered);
}

function applyCoupon(name, code, amount, expiryDate) {
  console.log(name);
  $("#couponName").append(name);
  $("#couponAmount").append(`£ ${amount}`);

  var tot = sessionStorage.getItem("total");
  $("#subTotal").empty().append(`£ ${tot}`);
  $("#total").empty().append(`£ ${tot - amount}`);
}

$(function () {
  $("#datepicker").datepicker();
});

$(function () {
  $("#book-now").on("click", function () {
    var dept = $("#dept").val();
    var date = $("#datepicker").val();
    var passengers = $("#passengers").val();

    sessionStorage.setItem("departure", dept);
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("passengers", passengers);

    $(".train").addClass("train-animation");

    setTimeout(function () {
      window.location.href = "order.html";
    }, 1200);
  });
});

$(function () {
  $("#payment-button").on("click", function () {
    window.location.href = "./../payment/add-card.html";
  });
});
