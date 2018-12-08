function LoadLiBuildTimer(e,time,flag,color_,sound = false,adv_text = null,show_zero = false,navigate_url = null)
{
  if(!show_zero && time-Math.round(Date.now()/1000,0) <= 0) return;
  var t = document.createElement("span");
  if(flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "-";//ー
    e.appendChild(t2);
  }
  t.setAttribute("style","color:" + color_);
  t.setAttribute("sound",sound);
  if(adv_text !== null) t.setAttribute("adv_text",adv_text);
  t.setAttribute("class","travian_js_timer");
  t.setAttribute("value",time - Math.round(Date.now()/1000,0));
  t.innerText = "Loading"
  if(navigate_url != null)
  {
	  t.onclick = function(){ window.location.href = navigate_url}
  }
  e.appendChild(t);
}
function ShowVillageData(li_element)
{
	var a_element = li_element.getElementsByTagName("a")[0];
	var a_element_href = a_element.getAttribute("href");
	var village_id_ = getQueryVariable(a_element_href,"newdid");	
	var village_object = GetVillageObject(village_id_);
	
	var e_p1 = document.createElement("p1");
	e_p1.setAttribute("style","font-size:"+font_size);
	e_p1.setAttribute("class","task_helper_p1")
	li_element.appendChild(e_p1);
	
	switch(default_task_helper_select)
	{
		case 1: Show_Build(village_object,e_p1); return;
		case 2: Show_TroopTrain(village_object,e_p1,village_id_); return;
		case 3: Show_Celebration(village_object,e_p1); return;
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
		if(village_object.Builds[i] < Math.round(Date.now()/1000,0)) continue;
		LoadLiBuildTimer(e_p1,village_object.Builds[i],flag,task_helper_color_list[j],true,null,false);
		flag = true;
		j++;
	}
}

Show_TroopTrain_arr = [[19,29,20,30,21],["#0069FF","#78A5D3","#7700F6","#C574F3","#C84545"],["b","B","s","S","w"]];
function Show_TroopTrain(village_object,e_p1,village_id_)
{
	var flag = false;
	for(var i = 0; i < Show_TroopTrain_arr[0].length; i ++)
	{
		var isshow = village_object["troop_train_checkbox_"+Show_TroopTrain_arr[0][i]];
		if(isshow !== undefined && isshow) 
		{
			LoadLiBuildTimer(	e_p1,
								village_object["troop_train_"+Show_TroopTrain_arr[0][i]],
								flag,
								Show_TroopTrain_arr[1][i],
								false,
								Show_TroopTrain_arr[2][i],
								true,
								"/build.php?newdid=" + village_id_ + "&gid=" +Show_TroopTrain_arr[0][i]);
			flag =true;
		}
	}	
}
function Show_Celebration(village_object,e_p1)
{
	if(	village_object["celebration_24"] == undefined ) return;//||village_object["celebration_24"] < Math.round(Date.now()/1000,0)
	LoadLiBuildTimer(e_p1,village_object["celebration_24"] ,false,task_helper_color_list[0],false,null,false);
}


function task_helper_select_onchange()
{
	localStorage.setItem("default_task_helper_select",window.task_helper_select.value);
	default_task_helper_select = Number(window.task_helper_select.value);
	var listp1 = document.getElementsByClassName("task_helper_p1");
	for(var i =0; i < listp1.length; ) listp1[0].remove();
	for(var i =0; i < window.Current.listVillage.length; i++) ShowVillageData(window.Current.listVillage[i]);
}



var task_helper_color_list = ["Blue","BlueGray","Gray"];
var task_helper_select_list= ["Off","Builds","Troops","Celebration"];

if(window.Current.sidebarBoxVillagelist != null)
{
	window.task_helper_select = document.createElement("select");
	task_helper_select.setAttribute("style","margin-right: 40px;");
	task_helper_select.onchange = task_helper_select_onchange;
	window.Current.sidebarBoxVillagelist.insertAdjacentElement("beforebegin",task_helper_select);
	
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