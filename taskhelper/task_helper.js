function CreateSoundElement(url_sound)
{
    var v = document.createElement("video");    
    v.src = url_sound;
    v.volume = 1;
    v.hidden = true;
    v.loop = false;
    v.autoplay = false;
    document.body.appendChild(v);
    return v;
}
var ding_sound = CreateSoundElement(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/ding.mp3"));
var ListTimers = [];
var TimerCountingDownNoReload = function()
{
  for(var i = 0; i < ListTimers.length; i ++)
  {
    var num = parseInt(ListTimers[i].getAttribute("value")) - 1;
    if(num < 0) continue;
    else 
    {
      if(num === 0) ding_sound.play();
      var sec_ =num % 60;
      var temp_ = (num - sec_)/60;
      var min_ = temp_ % 60;
      var hour_ = (temp_ - min_)/60;
      var text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
      text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
      if(hour_ > 0)text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
      
      ListTimers[i].innerText = text_;
      ListTimers[i].setAttribute("value",num);
    }
  }
};
function FindActiveVillage(listVillages)
{
  for(var i = 0; i < listVillages.length; i++) if(listVillages[i].getAttribute("class").indexOf("active") >=0) return listVillages[i];
  return null; 
}
function getQueryVariable(q,variable) {
    var query = q.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) 
    {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) return decodeURIComponent(pair[1]);
    }
  return null;
}
function LoadLiResource(e,value,max,flag,arlet)
{
  if(flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "-";
    e.appendChild(t2);
  }
  var res = document.createElement("span");
  var percent = Math.round((value * 100)/max,0);
  if(percent <10) res.innerText = "0"+Math.round((value * 100)/max,0) + "%";
  else res.innerText = Math.round((value * 100)/max,0) + "%";
  res.setAttribute("style", style= arlet ? "color:red":"color:green");
  e.appendChild(res);
}
function LoadLiBuildTimer(e,time,current,flag,color_)
{
  if(time-current <= 0) return;
  var t = document.createElement("span");
  if(flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "-";//ー
    e.appendChild(t2);
  }
  t.setAttribute("style","color:" + color_);
  t.setAttribute("value",time - current);
  e.appendChild(t);  
  ListTimers.push(t);
}

var color_list = ["Blue","BlueGray","Gray"];
function LoadVillageData(li_element,village_data,uri_)
{
	if(!village_data.Show) return;
	var e = document.createElement("p1");
	e.setAttribute("style","font-size:"+font_size);
	li_element.appendChild(e);
	LoadLiResource(e,village_data.Resource[0],village_data.Storage,false,false);
	LoadLiResource(e,village_data.Resource[1],village_data.Storage,true,false);
	LoadLiResource(e,village_data.Resource[2],village_data.Storage,true,false);
	LoadLiResource(e,village_data.Resource[3],village_data.Granary,true,village_data.CropArlet);
  
	var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
	var flag = false;
	var j = 0;
	for(var i = 0; i < village_data.Builds.length; i++) 
	{
		if(village_data.Builds[i] < current_SecondFrom1970) continue;
		LoadLiBuildTimer(e,village_data.Builds[i],current_SecondFrom1970,flag,color_list[j]);
		flag = true;
		j++;
	}
}

function input_e_contentTitle_change(e)
{
	if(e === null || e === undefined) return;
	var id_currentVillage = getQueryVariable(active_village.getElementsByTagName("a")[0].getAttribute("href"),"newdid");
	var data = JSON.parse(localStorage.getItem("village_"+id_currentVillage));
	data.Show = e.checked;
	localStorage.setItem("village_"+id_currentVillage,JSON.stringify(data));
}

var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
//var innerBoxContent_sidebarBoxVillagelist= sidebarBoxVillagelist.getElementsByTagName("innerBox content")[0];
//innerBoxContent_sidebarBoxVillagelist.setAttribute("style","padding:0");
var listVillage = sidebarBoxVillagelist.getElementsByTagName("li");//list elements village
var active_village = FindActiveVillage(listVillage);
var json_village = null;
var id = null;
for(var i =0; i < listVillage.length; i++)
{
  var uri_ = listVillage[i].getElementsByTagName("a")[0].getAttribute("href");
  id = getQueryVariable(uri_,"newdid");
  if(id === null) continue;
  if(listVillage[i] === active_village)
  {
    //update data current village
    var Wood = Number(document.getElementById("l1").innerText.replace(".","").replace(",",""));
    var Clay = Number(document.getElementById("l2").innerText.replace(".","").replace(",",""));
    var Iron = Number(document.getElementById("l3").innerText.replace(".","").replace(",",""));
    var Crop = Number(document.getElementById("l4").innerText.replace(".","").replace(",",""));
	var CropArlet_ = document.getElementById("l4").getAttribute("class").indexOf("alert") >=0 ? true : false;
    var Storage__ = document.getElementById("stockBarWarehouse").innerText.replace(".","").replace(",","");    
    var Granary__ = document.getElementById("stockBarGranary").innerText.replace(".","").replace(",","");
    
    var Storage_ = Number(Storage__.substring(1, Storage__.length -1));
    var Granary_ = Number(Granary__.substring(1, Granary__.length -1));
    var Builds_ = [];
	var b = localStorage.getItem("village_"+id);
	var b_json = null;
	if(b!==null) b_json = JSON.parse(b);
    if (window.location.pathname.indexOf("dorf1.php") > 0 | window.location.pathname.indexOf("dorf2.php") > 0)
	{
		var build = document.getElementsByClassName("buildDuration");
		if(build !== null & build.length !== 0)//read in dorf
		{
			var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
			for(var k=0; k < build.length; k++)
			{
				var timeleft = parseFloat(build[k].getElementsByTagName("span")[0].getAttribute("value"));
				Builds_.push(current_SecondFrom1970 + timeleft);
			}
		}
		
		var e_answersButton = document.getElementById("answersButton");
		if(e_answersButton !== null)
		{
			var e_contentTitle = e_answersButton.parentElement;
			
			var a_e_contentTitle = document.createElement("a1");
			a_e_contentTitle.innerText = "Show";
			var input_e_contentTitle = document.createElement("input");
			input_e_contentTitle.type = "checkbox";
			if(b_json !== null && b_json.Show !== undefined) input_e_contentTitle.checked = b_json.Show;
			else input_e_contentTitle.checked = true;
			input_e_contentTitle.setAttribute("id","input_e_contentTitle");
			input_e_contentTitle.onchange = input_e_contentTitle_change(input_e_contentTitle);
			a_e_contentTitle.appendChild(input_e_contentTitle);
			e_contentTitle.insertAdjacentElement("afterbegin",a_e_contentTitle);
		}
	}
	else if(b_json !== null) Builds_ = b_json.Builds;
	
    var village_object = {Storage : Storage_, 
						Granary : Granary_, 
						ID : id,
                        Resource : [Wood,Clay,Iron,Crop],
                        Builds : Builds_,
						Show : true,
						CropArlet: CropArlet_};
    localStorage.setItem("village_"+id,JSON.stringify(village_object));
    console.log("Save data village id:" + id);
  }
  json_village = localStorage.getItem("village_"+id);
  if(json_village !== null && json_village !== undefined) 
  {
    LoadVillageData(listVillage[i],JSON.parse(json_village),uri_);
    json_village = null;
  }
  id = null;
}
window.setInterval(TimerCountingDownNoReload,1000);