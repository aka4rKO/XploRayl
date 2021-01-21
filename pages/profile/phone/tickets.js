$(document).ready(function () {
    //  TICKETS
  var userObj = JSON.parse(localStorage.getItem("user"));
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
        moment(ticketObj.departureDate, "DD/MM/YYYY").format("Do MMM YYYY") +
        '</p><p id="seats">Seats: ' +
        ticketObj.seats +
        "</p></div>"
    );
  }
});
