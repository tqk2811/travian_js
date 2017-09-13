//create box and event
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
    localStorage.setItem("taskbox_style",taskbox.getAttribute("style"));
  }}

var b = document.getElementById("center");
var taskbox = document.createElement('div');
var taskbox_style = localStorage.getItem("taskbox_style");
if(taskbox_style !== null) taskbox.setAttribute("style",taskbox_style);
else taskbox.setAttribute("style","position: absolute; opacity: 1; z-index: 6010; left: 243px; top: 161px; background-color:#ffffff; border-radius: 25px");

var table_ = document.createElement('table');
table_.style.width = '100%';
table_.setAttribute('border', '1');
var tr = document.createElement('tr');
var head = ["Village","Wood","Clay","Iron","Crop","Build TimeLeft"];
for(var i = 0; i < 6; i++)
{
  var td = document.createElement('td');
  td.appendChild(document.createTextNode(head[i]));
  tr.appendChild(td);
}
table_.appendChild(tr);
taskbox.appendChild(table_);
b.appendChild(taskbox);
taskbox.addEventListener('mousedown', function(e){ALAMI.Draggable.elemen = e.target || e.srcElement; elementDraggable(e);}, false);
