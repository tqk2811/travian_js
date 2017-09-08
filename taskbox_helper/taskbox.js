var b = document.getElementById("center");
var taskbox = document.createElement('div');

var ALAMI = function(){return{Draggable: function(){}};}();
function elementDraggable(e){ 
  var e = e || window.event;
  var div = taskbox;//ALAMI.Draggable.elemen;
  ALAMI.Draggable.innerX = e.clientX + window.pageXOffset - div.offsetLeft;
  ALAMI.Draggable.innerY = e.clientY + window.pageYOffset - div.offsetTop;

  window.addEventListener('mousemove', elementMove, false);
  window.addEventListener('mouseup', function(){
    window.removeEventListener('mousemove', elementMove, false);
    }, true);

  function elementMove(e){
    div.style.position = 'absolute';
    div.style.left = e.clientX + window.pageXOffset - ALAMI.Draggable.innerX + 'px';
    div.style.top = e.clientY + window.pageYOffset - ALAMI.Draggable.innerY + 'px';
    localstorage.setItem("taskbox_style",taskbox.getAttribute("style"));
  }}

var taskbox_travianjs_ = '<table width="100%" border="1"><tbody><tr><td>Village</td><td>Wood</td><td>clay</td><td>Iron</td><td>Crop</td><td>Build timeleft</td></tr></tbody></table>';
taskbox.innerHTML = taskbox_travianjs_;
taskbox.setAttribute("id","taskbox_travianjs");
var taskbox_style = localstorage.getItem("taskbox_style");
if(taskbox_style !== null) taskbox.setAttribute("style",taskbox_style);
else taskbox.setAttribute("style","position: absolute; opacity: 1; z-index: 6010; left: 243px; top: 161px; background-color:#ffffff; border-radius: 25px");
b.appendChild(taskbox);
taskbox.addEventListener('mousedown', function(e){ALAMI.Draggable.elemen = e.target || e.srcElement; elementDraggable(e);}, false);
