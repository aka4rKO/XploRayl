function Validated() {
  var email = $("#userid").val();
  var password = $("#pw").val();

  if (email != "" && password != "") {
    if (email == "arshad" && password == "arshad") {
      window.location = "./../explore/explore.html";
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

function sendEmail() {
  var email = $("#userid").val();

  if (email != "") {
    $(".success").html("verification Code has been successfully sent");
    window.location.replace("verificationCode.html");
  } else {
    if (email == "") {
      $("#fuserid").css("border", "2px solid red");
      $(".useridErr").html("Enter email address");
    } else if (email) {
      $("#fuserid").css("border", "2px solid white");
      $(".useridErr").html("");
    }
  }
}

function callSignUp() {
  var name = $("#fname").val();
  var email = $("#userid").val();
  var password = $("#pw").val();
  var conpassword = $("#conpw").val();

  if (name != "" && email != "" && password != "" && conpassword != "") {
    if (password == conpassword) {
      $(".success").html("Account successfully created");
      window.location.replace("stepper.html");
    } else {
      $("#fconpw").css("border", "2px solid red");
      $(".conpwErr").html("password doesn't match");
    }
  } else {
    if (name == "") {
      $("#ffname").css("border", "2px solid red");
      $(".nameErr").html("Please enter your your name");
    } else if (name) {
      $("#ffname").css("border", "2px solid white");
      $(".nameErr").html("");
    }

    if (email == "") {
      $("#fuserid").css("border", "2px solid red");
      $(".useridErr").html("Please enter your email address");
    } else if (email) {
      $("#fuserid").css("border", "2px solid white");
      $(".useridErr").html("");
    }

    if (password == "") {
      $("#fpw").css("border", "2px solid red");
      $(".pwErr").html("Please enter a password");
    } else if (password) {
      $("#fpw").css("border", "2px solid white");
      $(".pwErr").html("");
    } else if (password.length < 4 && password.length > 0) {
      $(".pwstrength").html("Weak");
      $("#pwstrength").css("color", "red");
    } else if (password.length < 6 && password.length > 0) {
      $(".pwstrength").html("Fair");
      $("#pwstrength").css("color", "yellow");
    } else if (password.length < 8 && password.length > 0) {
      $(".pwstrength").html("Good");
      $("#pwstrength").css("color", "blue");
    } else if (password.length > 8) {
      $(".pwstrength").html("Strong");
      $("#pwstrength").css("color", "green");
    } else if (password.length < 4 && password.length > 0) {
      $(".pwstrength").html("Weak");
      $("#pwstrength").css("color", "red");
    } else if (password.length < 6 && password.length > 0) {
      $(".pwstrength").html("Fair");
      $("#pwstrength").css("color", "yellow");
    } else if (password.length < 8 && password.length > 0) {
      $(".pwstrength").html("Good");
      $("#pwstrength").css("color", "blue");
    } else if (password.length > 8) {
      $(".pwstrength").html("Strong");
      $("#pwstrength").css("color", "green");
    }

    if (conpassword == "") {
      $("#fconpw").css("border", "2px solid red");
      $(".conpwErr").html("Please enter your a password");
    } else if (conpassword != password) {
      $("#fconpw").css("border", "2px solid red");
      $(".conpwErr").html("Password doesn't match");
    } else if (conpassword) {
      $("#fconpw").css("border", "2px solid white");
      $(".conpwErr").html("");
    }
  }

  if (name) {
    $("#fname").css("border", "2px solid white");
    $(".nameErr").html("");
  } else if (email) {
    $("#userid").css("border", "2px solid white");
    $(".useridErr").html("");
  }

  if (password.length < 4 && password.length > 0) {
    $(".pwstrength").html("Weak");
    $("#pwstrength").css("color", "red");
  } else if (password.length < 6 && password.length > 0) {
    $(".pwstrength").html("Fair");
    $("#pwstrength").css("color", "yellow");
  } else if (password.length < 8 && password.length > 0) {
    $(".pwstrength").html("Good");
    $("#pwstrength").css("color", "blue");
  } else if (password.length > 8) {
    $(".pwstrength").html("Strong");
    $("#pwstrength").css("color", "green");
  }
}
