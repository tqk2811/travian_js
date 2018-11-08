function LoadLiBuildTimer(e,time,flag,color_,sound)
{
  if(time-window.Current.current_SecondFrom1970 <= 0) return;
  var t = document.createElement("span");
  if(flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "-";//ー
    e.appendChild(t2);
  }
  t.setAttribute("style","color:" + color_);
  t.setAttribute("sound",sound);
  t.setAttribute("value",time - window.Current.current_SecondFrom1970);
  t.innerText = "Loading"
  e.appendChild(t);  
  window.Current.Timers.push(t);
}
function ShowVillageData(li_element)
{
	var a_element = li_element.getElementsByTagName("a")[0];
	var a_element_href = a_element.getAttribute("href");
	var id_li_element = getQueryVariable(a_element_href,"newdid");	
	var village_object = GetVillageObject(id_li_element);
	
	var e_p1 = document.createElement("p1");
	e_p1.setAttribute("style","font-size:"+font_size);
	task_helper_arr.push(e_p1);
	li_element.appendChild(e_p1);
	
	switch(default_task_helper_select)
	{
		case 0: Show_Build(village_object,e_p1); return;
		case 1: Show_TroopTrain(village_object,e_p1); return;
		case 2: Show_Celebration(village_object,e_p1); return;
		default: return;
	}
}
function Show_Build(village_object,e_p1)
{
	if(village_object.Builds === undefined) return;
	var flag = false;
	var j = 0;
	for(var i = 0; i < village_object.Builds.length; i++) 
	{
		if(village_object.Builds[i] < window.Current.current_SecondFrom1970) continue;
		LoadLiBuildTimer(e_p1,village_object.Builds[i],flag,task_helper_color_list[j],true);
		flag = true;
		j++;
	}
}
function Show_TroopTrain(village_object,e_p1)
{
	
}
function Show_Celebration(village_object,e_p1)
{
	if(	village_object["celebration_24"] == undefined || 
		village_object["celebration_24"] < window.Current.current_SecondFrom1970) return;
	LoadLiBuildTimer(e_p1,village_object["celebration_24"] ,false,task_helper_color_list[0],false);
}


function task_helper_select_onchange()
{
	localStorage.setItem("default_task_helper_select",window.task_helper_select.value);
	default_task_helper_select = Number(window.task_helper_select.value);
	task_helper_arr.forEach(function(c){ c.remove();})
	task_helper_arr =[];
	for(var i =0; i < window.Current.listVillage.length; i++) ShowVillageData(window.Current.listVillage[i]);
}



var task_helper_color_list = ["Blue","BlueGray","Gray"];
var task_helper_select_list= ["Builds","Troops","Celebration"];
var task_helper_arr = [];

if(sidebarBoxVillagelist != null)
{
	window.task_helper_select = document.createElement("select");
	task_helper_select.setAttribute("style","margin-right: 200px;");
	task_helper_select.onchange = task_helper_select_onchange;
	sidebarBoxVillagelist.insertAdjacentElement("beforebegin",task_helper_select);
	
	window.default_task_helper_select = localStorage.getItem("default_task_helper_select");
	if (default_task_helper_select == null) default_task_helper_select = 0;
	else window.default_task_helper_select = Number(default_task_helper_select);
	
	for(var i = 0; i < task_helper_select_list.length; i++)
	{
		var option_ = document.createElement("option");
		option_.value = i;
		if(default_task_helper_select == i) option_.setAttribute("selected","selected");
		option_.innerText = task_helper_select_list[i];
		task_helper_select.appendChild(option_);
	}
}

if(window.Current.active_village !== null) 
	for(var i =0; i < window.Current.listVillage.length; i++) ShowVillageData(window.Current.listVillage[i]);