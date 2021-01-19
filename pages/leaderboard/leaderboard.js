$(document).ready(function () {
  renderLeaderboard();
});

function customSorter(a, b) {
  return b.points - a.points;
}

function renderLeaderboard() {
  var leaderboardFirstThree = "";
  var leaderboardOtherPlaces = "";
  var userObj = JSON.parse(localStorage.getItem("user"));
  var allUsers = userObj["otherUsers"];
  var user = {
    name: userObj["username"],
    points: userObj["totalPoints"],
    isMain: true,
  };
  allUsers.push(user);
  allUsers.sort(customSorter);

  for (i = 1; i <= allUsers.length; i++) {
    if (i == 1 || i == 2 || i == 3) {
      if (allUsers[i - 1].isMain) {
        leaderboardFirstThree += `
        <div class="first-three-place center-row-card main-character">
        <span class="card-text-main-white">${i}</span>
        <img
            src="/assets/images/avatars/profile.jpg"
            alt=""
            class="avatar"
        />
        <span class="card-text-main-white">${allUsers[i - 1].name}</span>
        <span class="card-text-main-white-pts float-right"
            >${allUsers[i - 1].points} Pts.</span
        >
        </div>
            `;
      } else {
        leaderboardFirstThree += `
        <div class="first-three-place center-row-card">
        <span class="card-text-main-white">${i}</span>
        <img
            src="/assets/images/avatars/profile-placeholder.jpg"
            alt=""
            class="avatar"
        />
        <span class="card-text-main-white">${allUsers[i - 1].name}</span>
        <span class="card-text-main-white-pts float-right"
            >${allUsers[i - 1].points} Pts.</span
        >
        </div>
        `;
      }
    } else {
      if (allUsers[i - 1].isMain) {
        leaderboardOtherPlaces += `
            <div
            class="first-three-place other center-row-card main-character"
            >
            <span class="card-text-main-white color-grey-text">${i}</span>
            <img
                src="/assets/images/avatars/profile.jpg"
                alt=""
                class="avatar"
            />
            <span class="card-text-main-white color-grey-text"
                >${allUsers[i - 1].name}</span
            >
            <span
                class="card-text-main-white-pts float-right color-grey-text"
                >${allUsers[i - 1].points} Pts.</span
            >
            </div>
            `;
      } else {
        leaderboardOtherPlaces += `
        <div class="first-three-place other center-row-card">
        <span class="card-text-main-white color-grey-text">${i}</span>
        <img
            src="/assets/images/avatars/profile-placeholder.jpg"
            alt=""
            class="avatar"
        />
        <span class="card-text-main-white color-grey-text"
            >${allUsers[i - 1].name}</span
        >
        <span
            class="card-text-main-white-pts float-right color-grey-text"
            >${allUsers[i - 1].points} Pts.</span
        >
        </div>
        `;
      }
    }
  }

  var pos = allUsers
    .map(function (e) {
      return e.name;
    })
    .indexOf(user.name);

  var mainStickyBar = `
    <span class="card-text-main-white color-grey-text">${pos + 1}</span>
    <img
    src="/assets/images/avatars/profile.jpg"
    alt=""
    class="avatar"
    />
    <span class="card-text-main-white color-grey-text"
    >${user.name}</span
    >
    <span class="card-text-main-white-pts float-right color-grey-text"
    >${user.points} Pts.</span
    >
    `;

  $("#first-three-places").append(leaderboardFirstThree);
  $("#other-places").append(leaderboardOtherPlaces);
  $("#main-char").append(mainStickyBar);
}
