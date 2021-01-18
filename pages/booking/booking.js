$(function() {
    $( "#datepicker" ).datepicker();
  } );

$(function() {
  $("#book-now")
    .on("click", function(){
      window.location.href='order.html';

    $(".train").addClass('train-animation');
  })
    .on("animationend", function(){
    $(".train").removeClass('train-animation');
  });
});

$(function() {
  $("#payment-button")
    .on("click", function(){
      window.location.href='./../payment/add-card.html';
  })
});