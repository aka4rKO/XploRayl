$(document).ready(function () {
  renderPois();
});

$(function () {
  $(".anchor-external").attr("rel", "external");
});

function setCurrentId(id) {
  sessionStorage.setItem("currentId", id);
}

function renderPois() {
  var popular = "";
  var topRated = "";
  var mostVisited = "";

  var dataObj = JSON.parse(localStorage.getItem("data"));
  var pois = dataObj["poiObjs"];
  var popularHuntIds = dataObj["popularHunts"];
  var topRatedHuntIds = dataObj["topRatedHunts"];
  var mostVisitedHuntIds = dataObj["mostVisitedHunts"];

  pois.forEach(function (item) {
    if (popularHuntIds.includes(item.poiId)) {
      popular += `
      <a class="anchor-external" href="/pages/poi/poi.html" onclick="setCurrentId('${item.poiId}')"
      data-prefetch="true">
        <div class="poi">
          <img src="${item.img}" alt="" />
          <div class="poi-info">
            <div class="card1-text">${item.name}</div>
            <div class="center-vertically-margin-top">
              <img
                class="poi-img-icon-color"
                src="./../../assets/icons/map-pin.svg"
                alt=""
              />
              <span class="card2-text">&nbsp;${item.location}</span>
            </div>
          </div>
        </div>
      </a>`;
    }

    if (topRatedHuntIds.includes(item.poiId)) {
      topRated += `
      <a class="anchor-external" href="/pages/poi/poi.html" onclick="setCurrentId('${item.poiId}')"
      data-prefetch="true">
        <div class="poi">
          <img src="${item.img}" alt="" />
          <div class="poi-info">
            <div class="card1-text">${item.name}</div>
            <div class="center-vertically-margin-top">
              <img
                class="poi-img-icon-color"
                src="./../../assets/icons/map-pin.svg"
                alt=""
              />
              <span class="card2-text">&nbsp;${item.location}</span>
            </div>
          </div>
        </div>
      </a>`;
    }

    if (mostVisitedHuntIds.includes(item.poiId)) {
      mostVisited += `
      <a class="anchor-external" href="/pages/poi/poi.html" onclick="setCurrentId('${item.poiId}')"
      data-prefetch="true">
        <div class="poi">
          <img src="${item.img}" alt="" />
          <div class="poi-info">
            <div class="card1-text">${item.name}</div>
            <div class="center-vertically-margin-top">
              <img
                class="poi-img-icon-color"
                src="./../../assets/icons/map-pin.svg"
                alt=""
              />
              <span class="card2-text">&nbsp;${item.location}</span>
            </div>
          </div>
        </div>
      </a>`;
    }
  });

  $("#popular").append(popular);
  $("#topRated").append(topRated);
  $("#mostVisited").append(mostVisited);
}
