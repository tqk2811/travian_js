//sidebarBoxActiveVillage
function Change_sidebarBoxActiveVillage_Button(index){
	var item = list_sidebarBoxActiveVillage[index];
	if (item.length > 0 && item[0] !== undefined)
	{
		var attibute_class = item[0].getAttribute("class");
		if(attibute_class.search("disable") > 0) { return;}
		item[0].setAttribute("class",attibute_class.replace("Black","White").replace("gold","green"));
		item[0].setAttribute("onclick","Change_sidebarBoxActiveVillage_Button_onclick(\""+item[1]+"\")");
		$("#"+item[0].id).off("click");
	}
}
function Change_sidebarBoxActiveVillage_Button_onclick(uri){window.location = uri;}

var list_sidebarBoxActiveVillage = [
	[document.getElementsByClassName("layoutButton workshopBlack gold  ")[0],"/build.php?gid=21"],//workshop
	[document.getElementsByClassName("layoutButton stableBlack gold  ")[0],"/build.php?gid=20"],//stable
	[document.getElementsByClassName("layoutButton barracksBlack gold  ")[0],"/build.php?gid=19"],//barracks
	[document.getElementsByClassName("layoutButton marketBlack gold  ")[0],"/build.php?gid=17"]//market
]
var sidebarBoxActiveVillage = document.getElementById("sidebarBoxActiveVillage");
if(sidebarBoxActiveVillage !== null){
	var innerBox_header_sidebarBoxActiveVillage = sidebarBoxActiveVillage.getElementsByClassName("innerBox header ")[0];
	for(var i = 0; i < list_sidebarBoxActiveVillage.length; i++) Change_sidebarBoxActiveVillage_Button(i);
}




//sidebarBoxLinklist
var storage_linkerlisttop = localStorage.getItem("linkerlisttop") == "true";
var sidebarBoxLinklist_ = document.getElementById("sidebarBoxLinklist");
if(sidebarBoxLinklist_ !== null){
	if(storage_linkerlisttop == true) sidebarBeforeContent_swap(storage_linkerlisttop); 	
	var BoxLinklist_InnerBox = sidebarBoxLinklist_.getElementsByClassName("sidebarBoxInnerBox")[0];
	var innerBox_content = BoxLinklist_InnerBox.getElementsByClassName("innerBox content")[0];
	
	var linklistNotice_ = innerBox_content.getElementsByClassName("linklistNotice");	
	if(linklistNotice_.length > 0)
	{
		linklistNotice_[0].remove();
		window.ul_linkerlist = document.createElement("ul");
		innerBox_content.appendChild(ul_linkerlist);
		for(var i = 0;i < list_sidebarBoxLinklist.length;i++) AddLinkerList(list_sidebarBoxLinklist[i]);
	}
	window.checkbox_linkerlisttop = document.createElement("input");
	checkbox_linkerlisttop.setAttribute("type","checkbox");
	checkbox_linkerlisttop.checked = storage_linkerlisttop;
	checkbox_linkerlisttop.onchange = checkbox_linkerlisttop_change;	
	var label_checkbox_linkerlisttop = document.createElement("label");
	label_checkbox_linkerlisttop.innerText = "Bring to top";
	
	innerBox_content.appendChild(checkbox_linkerlisttop);
	innerBox_content.appendChild(label_checkbox_linkerlisttop);
}

function checkbox_linkerlisttop_change(){
	localStorage.setItem("linkerlisttop",checkbox_linkerlisttop.checked);
	storage_linkerlisttop = checkbox_linkerlisttop.checked;
	sidebarBeforeContent_swap(checkbox_linkerlisttop.checked);
}

function sidebarBeforeContent_swap(flag){
	if(flag) TJS.MoveElementUp(sidebarBoxLinklist_,5);//move to top
	else TJS.MoveElementDown(sidebarBoxLinklist_,5);// back to bot
}

function AddLinkerList(item){
    var li_ = document.createElement('li');
    var aTag = document.createElement('a');
    aTag.setAttribute('href',item[1]);
    aTag.innerHTML = item[0];
    li_.appendChild(aTag);
    ul_linkerlist.appendChild(li_);
}



//task_helper
function LoadLiBuildTimer(li_obj){
  if(!li_obj.show_zero && li_obj.time - TJS.CurrentSec() <= 0) return;
  var t = document.createElement("span");
  if(li_obj.flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "-";//ー
    li_obj.e.appendChild(t2);
  }
  t.setAttribute("style","color:" + li_obj.color);
  t.setAttribute("sound",li_obj.sound);
  if(li_obj.adv_text !== null) t.setAttribute("adv_text",li_obj.adv_text);
  t.setAttribute("class",TJS.Const.ClassTimer);
  t.setAttribute("value",li_obj.time - TJS.CurrentSec());
  t.innerText = "Loading"
  if(li_obj.navigate_url != null) t.onclick = function(){ window.location.href = li_obj.navigate_url}
  li_obj.e.appendChild(t);
}
function LoadLi(li_obj){
	var t = document.createElement("span");
	if(li_obj.flag){
		var t2 = document.createElement("span");
		t2.innerText = "-";//ー
		li_obj.e.appendChild(t2);
	}
	t.setAttribute("style","color:" + li_obj.color);
	t.innerText = li_obj.text;
	li_obj.e.appendChild(t);
}

function ShowVillageData(li_element){
	var a_element = li_element.getElementsByTagName("a")[0];
	var a_element_href = a_element.getAttribute("href");
	var village_id_ = TJS.getParameterByName(a_element_href,"newdid");	
	var village_object = TJS.LSGetObject("village",village_id_);
	
	var e_p1 = document.createElement("p1");
	e_p1.setAttribute("style","font-size:"+font_size);
	e_p1.setAttribute("class",TJS.Const.ClassTaskHelper_p1)
	li_element.appendChild(e_p1);
	
	switch(default_task_helper_select)
	{
		case 1: Show_Build(village_object,e_p1); return;
		case 2: Show_TroopTrain(village_object,e_p1,village_id_); return;
		case 3: Show_Celebration(village_object,e_p1,village_id_); return;
		case 4: Show_Resource(village_object,e_p1,village_id_); return;
		case 5: Show_AttackRed(village_object,e_p1,village_id_); return;
		default: return;
	}
}
function Show_Build(village_object,e_p1){
	if(village_object.Builds === undefined) return;
	var flag = false;
	var j = 0;
	var obj;
	for(var i = 0; i < village_object.Builds.length; i++) 
	{
		if(village_object.Builds[i] < TJS.CurrentSec()) continue;
		obj = TJS.GetLiBuildTimerObject();
			obj.e = e_p1;
			obj.time = village_object.Builds[i];
			obj.flag = flag;
			obj.color = TJS.Const.task_helper_color_list[j];
			obj.sound = true;		
		LoadLiBuildTimer(obj);
		flag = true;
		j++;
	}	
	if(village_object["demolish"] !== undefined && village_object["demolish"] > TJS.CurrentSec())
	{
		obj = TJS.GetLiBuildTimerObject();
			obj.e = e_p1;
			obj.time = village_object["demolish"];
			obj.flag = flag;
			obj.color = "#FF8080";
			obj.sound = true;
			LoadLiBuildTimer(obj);
	}
}
function Show_TroopTrain(village_object,e_p1,village_id_){
	var flag = false;
	for(var i = 0; i < TJS.Const.Show_TroopTrain_arr[0].length; i ++)
	{
		var isshow = village_object[TJS.Const.LS_trooptrain_checkbox+Show_TroopTrain_arr[0][i]];
		if(isshow !== undefined && isshow) 
		{
			var obj = TJS.GetLiBuildTimerObject();
				obj.e = e_p1;
				obj.time = village_object[TJS.Const.LS_trooptrain + TJS.Const.Show_TroopTrain_arr[0][i]];
				obj.flag = flag;
				obj.color = TJS.Const.Show_TroopTrain_arr[1][i];
				obj.adv_text = TJS.Const.Show_TroopTrain_arr[2][i];
				obj.show_zero = true;
				obj.navigate_url = "/build.php?newdid=" + village_id_ + "&gid=" + TJS.Const.Show_TroopTrain_arr[0][i];				
			LoadLiBuildTimer(obj);
			flag =true;
		}
	}	
}
function Show_Celebration(village_object,e_p1,village_id_){
	if(	village_object["celebration_24"] == undefined ) return;//||village_object["celebration_24"] < TJS.CurrentSec()
	var obj = TJS.GetLiBuildTimerObject();
		obj.e = e_p1;
		obj.time = village_object["celebration_24"];
		obj.color = TJS.Const.task_helper_color_list[0];
		obj.show_zero = true;
		obj.navigate_url = "/build.php?newdid="+village_id_+"&gid=24";
	LoadLiBuildTimer(obj);
}
function Show_Resource(village_object,e_p1,village_id_){
	if(village_object["res"] == undefined) return;
	flag = false;
	for(var i = 0; i < village_object["res"].length; i++)
	{
		var li_obj = {};
		li_obj.text = village_object["res"][i]%1000 +"k";
		li_obj.flag = flag;
		li_obj.e = e_p1;
		li_obj.color = TJS.Const.task_helper_color_list[0];		
		LoadLi(li_obj);
		flag = true;
	}
}
function Show_AttackRed(village_object,e_p1,village_id_){
	
}

function task_helper_select_onchange(){
	localStorage.setItem("default_task_helper_select",window.task_helper_select.value);
	default_task_helper_select = Number(window.task_helper_select.value);
	var listp1 = document.getElementsByClassName(TJS.Const.ClassTaskHelper_p1);
	for(var i =0; i < listp1.length; ) listp1[0].remove();
	for(var i =0; i < TJS.CurrentData.listVillage.length; i++) ShowVillageData(TJS.CurrentData.listVillage[i]);
}

function show_culture(){
	var expansionSlotInfos = TJS.CurrentData.sidebarBoxVillagelist.getElementsByClassName("expansionSlotInfo");
	var boxTitles = TJS.CurrentData.sidebarBoxVillagelist.getElementsByClassName("boxTitle");
	if(expansionSlotInfos.length == 1 && boxTitles.length == 1)
	{
		var tooltip_text = expansionSlotInfos[0]._travianTooltip.text.replaceAll("‬/‭","/").replaceAll("‬‬","").match(/\d+.\/\d+$/);
		boxTitles[0].innerText = tooltip_text;
	}
}

if(TJS.CurrentData.sidebarBoxVillagelist != null){
	window.task_helper_select = document.createElement("select");
	task_helper_select.setAttribute("title","Hot key: Q");
	task_helper_select.onchange = task_helper_select_onchange;
	
	show_culture();
	
	var e_div = document.createElement("div");
	e_div.setAttribute("align","right");
	var trade_img = document.createElement("img"); 
	trade_img.src = httpGetGithubCdnUri("src/ratio.gif");
	trade_img.setAttribute("onclick","npc_helper.Trade()");
	trade_img.setAttribute("style","margin-right: 5px;")
	e_div.appendChild(trade_img);
	e_div.appendChild(task_helper_select);
	document.getElementById("sidebarAfterContent").insertAdjacentElement("beforebegin",e_div);
	//TJS.CurrentData.sidebarBoxVillagelist.insertAdjacentElement("beforebegin",e_div);
	
	window.default_task_helper_select = localStorage.getItem("default_task_helper_select");
	if (default_task_helper_select == null) default_task_helper_select = 0;
	else window.default_task_helper_select = Number(default_task_helper_select);
	
	for(var i = 0; i < TJS.Const.task_helper_select_list.length; i++)
	{
		var option_ = document.createElement("option");
		option_.value = i;
		if(default_task_helper_select == i) option_.setAttribute("selected","selected");
		option_.innerText = TJS.Const.task_helper_select_list[i];
		task_helper_select.appendChild(option_);
	}
}
window.setTimeout(function(){ 
								if(TJS.CurrentData.active_village !== null) 
									for(var i =0; i < TJS.CurrentData.listVillage.length; i++) ShowVillageData(TJS.CurrentData.listVillage[i]);
							},TJS.CurrentData.Timeout);



