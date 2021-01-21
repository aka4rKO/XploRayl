var selectedFavList = [];

$(document).ready(function () {
  renderFavourites();
});

function removeFavourite(poiId) {
  console.log("poiId coming in");
  console.log(poiId);
  var favIds = JSON.parse(localStorage.getItem("favourites"));
  console.log("before removing id");
  console.log(favIds);

  favIds = favIds.filter((item) => item != poiId);
  console.log("afer removing id");
  console.log(favIds);

  localStorage.setItem("favourites", JSON.stringify(favIds));
  // $("#snackbar").text("Removed from favourites");
  // $(".snackbar").toggleClass("center-row space-between");
  // setTimeout(function () {
  //   $(".snackbar").removeClass("center-row space-between");
  // }, 2000);

  renderFavourites();
}

function renderFavourites() {
  // $("#poi-list").remove();
  var renderedFavourites = "";
  var favIds = JSON.parse(localStorage.getItem("favourites"));
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  // console.log(pois);
  // console.log(favIds);

  var favPois = pois.filter((poi) => favIds.includes(poi.poiId));

  // console.log("favs pois");
  // console.log(favPois);

  if (favPois.length > 0) {
    favPois.forEach(function (item) {
      renderedFavourites += `
        <div class="poi">
          <img
            src="${item.img}"
            alt=""
          />
          <div class="poi-info">
          <div class="poi-grid-style">
            <input class="check" type="checkbox" id="${item.poiId}" value="${item.poiId}" onclick="onSelect('${item.poiId}');">
            <img
            style="padding-left:50px"
              class="favourites"
              src="/assets/images/profile/favourites.png"
              alt=""
              onclick="removeFavourite('${item.poiId}')"
            />
          </div>
            <div class="card1-text">${item.name}</div>
          </div>
        </div>
        `;
    });
  } else {
    renderedFavourites = `
    <div class="center-column no-favs"><p>No favourites added!</p></div>
    `;
  }

  // var button = `
  // <button
  //   class="ui-btn hero-btn"
  //   onClick="sendEmail();"
  // >
  //   SHARE
  // </button>
  // `;

  $("#poi-list").empty().append(renderedFavourites);
  // $("#poi-list").append(button);

  // <div class="poi">
  //   <img
  //     src="./../../assets/images/pois/buckingham-palace.jpg"
  //     alt=""
  //   />
  //   <div class="poi-info">
  //     <img
  //       id="favourites"
  //       src="./../../assets/images/profile/favourites.png"
  //       alt=""
  //     />
  //     <div class="card1-text">Seagull Hunt</div>
  //     <img
  //       src="./../../assets/images/profile/rating.png"
  //       alt=""
  //     />
  //   </div>
  // </div>
}

function sendEmail() {
  var renderdListOfFavPois = "<ul>";
  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];

  var selectedPois = pois.filter((poi) => {
    return selectedFavList.includes(`${poi.poiId}`);
  });

  console.log(selectedPois);
  selectedPois.forEach((item) => {
    renderdListOfFavPois += `
      <li>${item.name}</li>
      `;
  });

  renderdListOfFavPois += "</ul>";

  if (selectedPois.length > 0) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "xplorayl@gmail.com",
      Password: "xplorayl123",
      To: "akram.arm.7@gmail.com",
      From: "xplorayl@gmail.com",
      Subject: "List of Favourites",
      Body: renderdListOfFavPois,
    }).then(function (message) {
      console.log(message);

      $("#snackbar").text("Email sent");
      $(".snackbar").toggleClass("center-row space-between");
      setTimeout(function () {
        $(".snackbar").removeClass("center-row space-between");
      }, 2000);
    });
  } else {
    console.log("nothing selected to send");
    $("#snackbar").text("Nothing is selected to send");
    $(".snackbar").toggleClass("center-row space-between");
    setTimeout(function () {
      $(".snackbar").removeClass("center-row space-between");
    }, 2000);
  }
}

function onSelect(id) {
  if ($(`#${id}`).is(":checked") == true) {
    console.log(true);

    selectedFavList.push(id);
  } else {
    console.log(false);
    selectedFavList = selectedFavList.filter((item) => item != id);
  }

  console.log(selectedFavList);
}
