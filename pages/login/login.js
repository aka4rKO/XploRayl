function Validated() {
  var email = $("#userid").val();
  var password = $("#pw").val();

  if (email != "" && password != "") {
    if (email == "arshad" && password == "arshad") {
      window.location = "home.html";
    } else {
      $(".credentialErr").html("Wrong password/email");
    }
  } else {
    if (email == "") {
      $("#fuserid").css("border", "2px solid red");
      $(".nameErr").html("Please enter your email address");
    } else if (email) {
      $("#fuserid").css("border", "2px solid white");
      $(".nameErr").html("");
    }

    if (password == "") {
      $("#fpw").css("border", "2px solid red");
      $(".passwordErr").html("Please enter your password");
    } else if (password) {
      $("#fpw").css("border", "2px solid white");
      $(".passwordErr").html("");
    }
  }

  if (password) {
    $("#fpw").css("border", "2px solid white");
    $(".passwordErr").html("");
  } else if (email) {
    $("#fuserid").css("border", "2px solid white");
    $(".nameErr").html("");
  }
}
