//var village_object = {Storage=80000,Granary=80000
//                        Resource=[27352,12321,24343,20654],//Wood,Clay,Iron,Crop
//  var Builds=[2365664,3335544,23353354]};
function FindActiveVillage(listVillages)
{
  for(var i = 0; i < listVillages.length; i++) if(listVillages[i].getAttribute("class") === " active") return listVillages[i];
  return null; 
}

function getUrlVars(uri)
{
    var vars = [], hash;
    var hashes = uri.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function LoadLiResource(e,value,max)
{
  var res = document.createElement("div");
  var percent = Math.round((value * 100)/max,0);
  if(percent <10) res.innerText = "0"+Math.round((value * 100)/max,0) + "% ";
  else res.innerText = Math.round((value * 100)/max,0) + "% ";
  e.appendChild(res);
}
function LoadLiBuildTimer(e,time,current)
{
    var t = document.createElement("span");
    t.setAttribute("class","timer");
    t.setAttribute("counting","down");
    t.setAttribute("value",time-current);
    e.appendChild(t);
    Travian.TimersAndCounters.initTimer(t);
}
function LoadVillageData(li_element,village_data)
{
  var a = document.createElement("a");
  li_element.appendChild(a);
  LoadLiResource(a,village_data.Resource[0],village_data.Storage);
  LoadLiResource(a,village_data.Resource[1],village_data.Storage);
  LoadLiResource(a,village_data.Resource[2],village_data.Storage);
  LoadLiResource(a,village_data.Resource[3],village_data.Granary);
  var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
  for(var i = 0; i < village_data.Builds.length; i++) LoadLiBuildTimer(a,village_data.Builds[i],current_SecondFrom1970);
}

var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
var listVillage = sidebarBoxVillagelist.getElementsByTagName("li");//list elements village
var active_village = FindActiveVillage(listVillage);
//var villages_data = localStorage.getItem("villages_data");//load from localStorage
for(var i =0; i < listVillage.length; i++)
{
  var id = getUrlVars(listVillage[i].getElementsByTagName("a")[0].getAttribute("href"))["?newdid"];
  console.log(id);
  if(listVillage[i] === active_village)
  {
    //update data current village
    var Wood = Number(document.getElementById("l1").innerText.replace(".","").replace(",",""));
    var Clay = Number(document.getElementById("l2").innerText.replace(".","").replace(",",""));
    var Iron = Number(document.getElementById("l3").innerText.replace(".","").replace(",",""));
    var Crop = Number(document.getElementById("l4").innerText.replace(".","").replace(",",""));
    var Storage_ = Number(document.getElementById("stockBarWarehouse").innerText.replace(".","").replace(",",""));
    var Granary_ = Number(document.getElementById("stockBarGranary").innerText.replace(".","").replace(",",""));
    var build = Number(document.getElementsByClassName("buildDuration");
    var Builds_ = [];
    if(build !== null & build !== undefined)
    {
      var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
      for(var k=0; k < build.length; k++)
      {
        var timeleft = build[k].getElementsByTagName("span")[0].getAttribute("value").toFloat();
        Builds_.push(current_SecondFrom1970 + timeleft);
      }
    }
    var village_object = {Storage : Storage_, Granary : Granary_, ID : id,
                        Resource : [Wood,Clay,Iron,Crop],
                        Builds : Builds_};
    localStorage.setItem("village_"+id,JSON.stringify(village_object));
    console.log("Save data village id:" + id);
  }
  var json_village = localStorage.getItem("village_"+id);
  if(json_village !== null & json_village !== undefined) LoadVillageData(listVillage[i],JSON.parse(json_village));    
}

//Travian.TimersAndCounters.initTimer(element_timer);// <span class="timer" couting="down" value=222></span>
