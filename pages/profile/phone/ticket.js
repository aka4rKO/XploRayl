$(document).ready(function () {
    var dataLayerArray = 
      {
        ticketId: 1,
        from: "Colombo",
        to: "kandy",
        departureDate: "Fri, 06 Nov 2021",
        seats: "23A, 24A",
        price: "£20.00",
      }
  // Store to local storage ---------------------------------------------------------------
  // var ratingsList = JSON.parse(localStorage.getItem("tickets"))
  // var ratingsArray = [] ;
  // if(ratingsList){
  //     ratingsArray = ratingsList;
  // }
  // for (let index = 0; index < 6; index++) {
  //   ratingsArray.push(dataLayerArray)
  // }
  // localStorage.setItem("tickets", JSON.stringify(ratingsArray));

  // Retrieve from local storage ---------------------------------------------------------------
  var ticketArr = JSON.parse(localStorage.getItem('tickets'));

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
});