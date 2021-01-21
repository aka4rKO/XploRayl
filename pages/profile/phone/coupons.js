$(document).ready(function () {
  //  COUPONS
  var userObj = JSON.parse(localStorage.getItem("user"));
  for (var i = 0; i < userObj.coupons.length; i++) {
    // Define each individual layer
    var couponObj = userObj.coupons[i];
    $(".coupons-grid").append(
      '<div id="coupon-card"><img id="coupon-img" src="./../../../assets/images/coin.png" alt="coupon" /><h2 id="coupon-name">' +
        couponObj.name +
        '</h2><p id="coupon-validity">Valid till ' +
        moment(couponObj.expiryDate, "DD/MM/YYYY").format("Do MMM YYYY") +
        '</p><p id="coupon-code">Code: ' +
        couponObj.code +
        '</p><h2 id="coupon-price">$' +
        couponObj.amount +
        "</h2></div>"
    );
  }
});
