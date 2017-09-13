//var village_object = {Storage=80000,Granary=80000,ID=2143
//                        Resource=[27352,12321,24343,20654],//Wood,Clay,Iron,Crop
//                        Production=[2800,2800,2800,3000],
//  var Tasks_TimeEnd=[2365664,3335544,23353354]};
function LoadVillageData(li_element,village_data)
{
}

//list elements village
var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
var listVillage = sidebarBoxVillagelist.getElementsByTagName("li");
var active_village = function(){
  for(int i = 0; i < listVillage.length; i++) if(listVillage[i].getAttribute("class") === " active") return listVillage[i];
  return null; }


//refresh data active village




//Travian.TimersAndCounters.initTimer(element_timer);// <span class="timer" couting="down" value=222></span>
