//read list village
var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
var listVillage = sidebarBoxVillagelist.getElementsByTagName("li");
//load data from localStorage
var active_village = function(){
  for(int i = 0; i < listVillage.length; i++) if(listVillage[i].getAttribute("class") === " active") return listVillage[i];
  return null; }
//refresh data from active village


//Travian.TimersAndCounters.initTimer(element_timer);// <span class="timer" couting="down" value=222></span>
