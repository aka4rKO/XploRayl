$(document).ready(function(){
  $('.rating').rating();
});
    

$(document).ready(function(){
    $("#review-btn" ).click(function() {
         var reviewMessage = $("#review-message").val();
         var ratings = $("#ratingSlider").val()

         var postReqData = {
             id : 12,
             reviewMessage : reviewMessage,
             ratings:ratings
         }

         var ratingsList = JSON.parse(localStorage.getItem("reviews"))
         var ratingsArray = [] ;

         if(ratingsList){
             ratingsArray = ratingsList;
         }
         ratingsArray.push(postReqData)
         localStorage.setItem("reviews", JSON.stringify(ratingsArray));
         console.log(ratingsArray);


        });
  });

  


  


