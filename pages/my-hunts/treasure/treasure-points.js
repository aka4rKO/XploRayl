$(document).ready(function () {
    $("#circle")
      .circleProgress({
        value: 0.6,
        size: 160,
        lineCap: "round",
        thickness: 15,
        startAngle: 40.5,
        animationStartValue: 5 - 5,
        fill: {
          gradient: ["cyan", "#04d9d9"],
        },
      })
  });

  $(document).ready(function () {
    
    currentId = sessionStorage.getItem("currentId");

    loadTaskList();
  }
  );
  
  function loadTaskList() {
    var cardsComp = "";
    var cardList = JSON.parse(localStorage.getItem("task-list"))
    var dataObj = JSON.parse(localStorage.getItem("data"));
    var pois = dataObj["poiObjs"][0];
    var taskList = pois.tasks;
    var  userObj = JSON.parse(localStorage.getItem("user"));

  var incrementPoints = 0;
    if (taskList) {

      taskList.forEach(task => {

        if(task.isComplete){
          incrementPoints +=  task.points;
    
        cardsComp += `
        <div class="phone-tab-list-view ">
        <label>${task.name}</label>
        <label style="text-align: right">${task.points} pts</label>
        <img
          class="points-img left-align"
          src=${task.isComplete ? "./../../../assets/images/treasure.png" : "./../../../assets/images/task-disabled.svg"}
          alt=""
        />
      </div>`;
    }
      
      });
    }



    $("#taskPoints").text(incrementPoints)
    console.log(userObj);
    var newTotal = incrementPoints  + userObj.totalPoints
    userJson = JSON.stringify(userObj)
    localStorage.setItem("user", userJson)

    
    var dataObj = JSON.parse(localStorage.getItem("data"));
    var pois = dataObj["poiObjs"][0];
    var taskList = pois.tasks;
    for (let i = 0; i < taskList.length; i++) {
      if(!taskList[i].isComplete){
        taskList[i].isComplete = true;
      }
    }
    pois.tasks = taskList;
    dataObj['poiObjs'][0] = pois;
    oldVal = userObj.totalPoints;
    userObj.totalPoints = newTotal;
    userObj.taskCompleted += taskList.length;
    userObj.placesUnlocked += 1;

    newDataObj = JSON.stringify(dataObj)
    localStorage.setItem("data", newDataObj)
    localStorage.setItem("user", JSON.stringify(userObj))

    $("#points-value").text(newTotal)
    $("#task-list").append(cardsComp);
    



    $({someValue: oldVal}).animate({someValue: newTotal}, {
      duration: 1500,
      easing:'swing', // can be anything
      step: function() { // called on every step
          // Update the element's text with rounded-up value:
          $('#points-value').text(commaSeparateNumber(Math.round(this.someValue)));
      }
  });

 function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
  }




  }

  