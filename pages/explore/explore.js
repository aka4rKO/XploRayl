$(document).ready(function () {
    renderPois();
  });

function renderPois() {
  var render = "";
  var array = [
    { name: "Azhar Ponnen", age: 12 },
    { name: "Akram Ponnen", age: 12 },
  ];

  array.forEach(function (item) {
      console.log(item)
    render += `<div class="poi">
        <img
          src="./../../assets/images/pois/british-museum.jpg"
          alt=""
        />
        <div class="poi-info">
          <div class="card1-text">${item.name}</div>
          <div class="center-vertically-margin-top">
            <img
              class="poi-img-icon-color"
              src="./../../assets/icons/map-pin.svg"
              alt=""
            />
            <span class="card2-text">${item.name}</span>
          </div>
        </div>
      </div>`;
  });
  $("#repeat-poi").append(render);
    }
