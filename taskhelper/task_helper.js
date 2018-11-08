function LoadLiBuildTimer(e,time,flag,color_)
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
  t.setAttribute("sound",true);
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
	if(village_object.Builds === undefined) return;
	var e_p1 = document.createElement("p1");
	e_p1.setAttribute("style","font-size:"+font_size);
	li_element.appendChild(e_p1);
	var flag = false;
	var j = 0;
	for(var i = 0; i < village_object.Builds.length; i++) 
	{
		if(village_object.Builds[i] < window.Current.current_SecondFrom1970) continue;
		LoadLiBuildTimer(e_p1,village_object.Builds[i],flag,task_helper_color_list[j]);
		flag = true;
		j++;
	}
}

var task_helper_color_list = ["Blue","BlueGray","Gray"];
var task_helper_select_list= ["Builds","Troops","Celebration"];

if(sidebarBoxVillagelist != null)
{
	var task_helper_select = document.createElement("select");
	task_helper_select.setAttribute("style","margin-right: 200px;");
	sidebarBoxVillagelist.insertAdjacentElement("beforebegin",task_helper_select);
	for(var i = 0; i < task_helper_select_list.length; i++)
	{
		var option_ = document.createElement("option");
		option_.value = i;
		option_.innerText = task_helper_select_list[i];
		task_helper_select.appendChild(option_);
	}
}

if(window.Current.active_village !== null) 
	for(var i =0; i < window.Current.listVillage.length; i++) ShowVillageData(window.Current.listVillage[i]);