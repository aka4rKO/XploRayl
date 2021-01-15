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


         $.ajax({
            type: 'POST',
            url: 'https://api.stripe.com/v1/tokens',
            headers: {
              Authorization: 'Bearer sk_test_51HMs5AIDK6dRU6bAiHjaW1hU95a9VHqSWXzChedCrYm2Hb2I0vaotvmOQ8l1YgCy9vWbBQJ1ZvlSjz8w41MO25M500IZSSkvaC'
            },
            "data": {
                "card[number]": `${"4242 4242 4242 4242"}`,
                "card[exp_month]": `${"5"}`,
                "card[exp_year]": `${"2022"}`,
                "card[cvc]": `${"422"}`
              },
            success: function(response){
              console.log('successful payment: ', response);
            },
            error: (response) => { 
              console.log('error payment: ', response);
            }

            
          })

        //   $.ajax({

        //     url : 'http://voicebunny.comeze.com/index.php',
        //     type : 'GET',
        //     data : {
        //         'numberOfWords' : 10
        //     },
        //     dataType:'json',
        //     success : function(data) {              
        //         alert('Data: '+data);
        //     },
        //     error : function(request,error)
        //     {
        //         alert("Request: "+JSON.stringify(request));
        //     }
        // });

        });
  });



  function createCardTokenAndMakePayment(){
    
    var cardnum = selectPaymentMethod.cardnum
    var nameInDesc = selectPaymentMethod.cardname !=null ? selectPaymentMethod.cardname : "Eato"
    var expdt = selectPaymentMethod.expdt
    var cvc = selectPaymentMethod.cvc
    var pc = selectPaymentMethod.pc

    var yyyy = expdt.split('/')[1]
    var mm = expdt.split('/')[0].replace(/0(\d+)/,"")
    cardnum = cardnum.replaceAll(" ","")
    var settings = {
        "url": "https://api.stripe.com/v1/tokens",
        "method": "POST",
        "timeout": 0, 
        "headers": {
          "Authorization": `bearer ${sk_token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "card[number]": `${cardnum}`,
          "card[exp_month]": `${mm}`,
          "card[exp_year]": `${yyyy}`,
          "card[cvc]": `${cvc}`
        }
      };

      console.log(settings)
      console.log("MAKING SERVER REQEST FOR TOKEN")
      $.ajax(settings).done(function (response) {
        console.log(response);
        makePayment(response, nameInDesc)
      }).fail(function (data) {  
        console.log(data)
      })

   

}



function  makePayment(token, name){
     var usPrice = totalPrice/200 * 100
    var settings = {
        "url": "https://api.stripe.com/v1/charges",
        "method": "POST",
        "headers": {
          "Authorization": `Bearer ${sk_token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "amount": usPrice,
          "currency": "usd",
          "description": `Eato Food Purchase by ${name}`,
          "source": token.id
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        document.location.href = '../components/order-status.html'
      }).fail(function(data){

      })
 }







