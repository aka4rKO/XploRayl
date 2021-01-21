$(document).ready(function () {
  var currentId = sessionStorage.getItem("currentId");
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var poi = pois.filter((obj) => {
    return obj.poiId == currentId;
  });
  renderDeparture();

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

function renderDeparture() {
  var dropdowns = "";
  var locationList = JSON.parse(localStorage.getItem("data"))["trainStations"];
  console.log(locationList);
  locationList.forEach((element) => {
    dropdowns += `
    <option value=${element}>${element}</option>
    `;
  });

  $("#dept").append(dropdowns);
}

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
  $("#couponName").empty().append(name);
  $("#couponAmount").empty().append(`£ ${amount}`);

  sessionStorage.setItem("couponAmt", amount);

  var tot = sessionStorage.getItem("total");
  $("#subTotal").empty().append(`£ ${tot}`);
  $("#total")
    .empty()
    .append(`£ ${tot - amount}`);
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

function create_custom_dropdowns() {
  $("select").each(function (i, select) {
    if (!$(this).next().hasClass("dropdown-select")) {
      $(this).after(
        '<div class="dropdown-select wide ' +
          ($(this).attr("class") || "") +
          '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
      );
      var dropdown = $(this).next();
      var options = $(select).find("option");
      var selected = $(this).find("option:selected");
      dropdown
        .find(".current")
        .html(selected.data("display-text") || selected.text());
      options.each(function (j, o) {
        var display = $(o).data("display-text") || "";
        dropdown
          .find("ul")
          .append(
            '<li class="option ' +
              ($(o).is(":selected") ? "selected" : "") +
              '" data-value="' +
              $(o).val() +
              '" data-display-text="' +
              display +
              '">' +
              $(o).text() +
              "</li>"
          );
      });
    }
  });

  $(".dropdown-select ul").before(
    '<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text"></div>'
  );
}

// Event listeners

// Open/close
$(document).on("click", ".dropdown-select", function (event) {
  if ($(event.target).hasClass("dd-searchbox")) {
    return;
  }
  $(".dropdown-select").not($(this)).removeClass("open");
  $(this).toggleClass("open");
  if ($(this).hasClass("open")) {
    $(this).find(".option").attr("tabindex", 0);
    $(this).find(".selected").focus();
  } else {
    $(this).find(".option").removeAttr("tabindex");
    $(this).focus();
  }
});

// Close when clicking outside
$(document).on("click", function (event) {
  if ($(event.target).closest(".dropdown-select").length === 0) {
    $(".dropdown-select").removeClass("open");
    $(".dropdown-select .option").removeAttr("tabindex");
  }
  event.stopPropagation();
});

function filter() {
  var valThis = $("#txtSearchValue").val();
  $(".dropdown-select ul > li").each(function () {
    var text = $(this).text();
    text.toLowerCase().indexOf(valThis.toLowerCase()) > -1
      ? $(this).show()
      : $(this).hide();
  });
}
// Search

// Option click
$(document).on("click", ".dropdown-select .option", function (event) {
  $(this).closest(".list").find(".selected").removeClass("selected");
  $(this).addClass("selected");
  var text = $(this).data("display-text") || $(this).text();
  $(this).closest(".dropdown-select").find(".current").text(text);
  $(this)
    .closest(".dropdown-select")
    .prev("select")
    .val($(this).data("value"))
    .trigger("change");
});

// Keyboard events
$(document).on("keydown", ".dropdown-select", function (event) {
  var focused_option = $(
    $(this).find(".list .option:focus")[0] ||
      $(this).find(".list .option.selected")[0]
  );
  // Space or Enter
  //if (event.keyCode == 32 || event.keyCode == 13) {
  if (event.keyCode == 13) {
    if ($(this).hasClass("open")) {
      focused_option.trigger("click");
    } else {
      $(this).trigger("click");
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      var focused_option = $(
        $(this).find(".list .option:focus")[0] ||
          $(this).find(".list .option.selected")[0]
      );
      focused_option.prev().focus();
    }
    return false;
    // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass("open")) {
      $(this).trigger("click");
    }
    return false;
  }
});

$(document).ready(function () {
  create_custom_dropdowns();
});
