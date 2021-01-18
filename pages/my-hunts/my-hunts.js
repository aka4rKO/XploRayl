/* var header = document.getElementById("list-view");
var btns = header.getElementsByClassName("tab-nav");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace("active", "");
  this.className += "active";
  });
} */

$(document).on('click', 'tab-nav', function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
})