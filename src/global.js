//sidebarBoxActiveVillage
if(!TJS.CurrentData.isPlus)
	for(let i = 0; i < TJS.CurrentData.list_sidebarBoxActiveVillage.length; i++){
		let attibute_class = TJS.CurrentData.list_sidebarBoxActiveVillage[i][0].getAttribute("class");
		if(attibute_class.search("disable") > 0) continue;
		TJS.CurrentData.list_sidebarBoxActiveVillage[i][0].setAttribute("class",attibute_class.replace("Black","White").replace("gold","green"));
		TJS.CurrentData.list_sidebarBoxActiveVillage[i][0].setAttribute("onclick","window.location =\""+TJS.CurrentData.list_sidebarBoxActiveVillage[i][1] +"\"");
		$("#"+TJS.CurrentData.list_sidebarBoxActiveVillage[i][0].id).off("click");
	}

//sidebarBoxLinklist
let sidebarBoxLinklist_ = document.getElementById("sidebarBoxLinklist");
if(sidebarBoxLinklist_){
	let innerBox_content = sidebarBoxLinklist_.getElementsByClassName("content")[0];
	
	let linklistNotice_ = innerBox_content.getElementsByClassName("linklistNotice");	
	if(linklistNotice_.length > 0)
	{
		linklistNotice_[0].remove();
		window.ul_linkerlist = document.createElement("ul");
		innerBox_content.appendChild(ul_linkerlist);
		for(let i = 0;i < list_sidebarBoxLinklist.length;i++) AddLinkerList(list_sidebarBoxLinklist[i]);
	}
	window.checkbox_linkerlisttop = document.createElement("input");
	checkbox_linkerlisttop.setAttribute("type","checkbox");
	TJS.InitCheckboxOnclick(checkbox_linkerlisttop,"linkerlisttop",function(){sidebarBeforeContent_swap(checkbox_linkerlisttop.checked);},true);
	if(checkbox_linkerlisttop.checked) sidebarBeforeContent_swap(checkbox_linkerlisttop.checked);
	let label_checkbox_linkerlisttop = document.createElement("label");
	label_checkbox_linkerlisttop.innerText = "Bring to top";
	
	innerBox_content.appendChild(checkbox_linkerlisttop);
	innerBox_content.appendChild(label_checkbox_linkerlisttop);
}
function sidebarBeforeContent_swap(flag){
	if(flag) TJS.MoveElementUp(sidebarBoxLinklist_,5);//move to top
	else TJS.MoveElementDown(sidebarBoxLinklist_,5);// back to bot
}
function AddLinkerList(item){
    let li_ = document.createElement('li');
    let aTag = document.createElement('a');
    aTag.setAttribute('href',item[1]);
    aTag.innerHTML = item[0];
    li_.appendChild(aTag);
    ul_linkerlist.appendChild(li_);
};

//task_helper
let global_loader = false;
function LoadLiBuildTimer(li_obj){
  if(!li_obj.show_zero && li_obj.time - TJS.CurrentSec() <= 0) return;
  let t = document.createElement("span");
  if(li_obj.flag)
  {
    let t2 = document.createElement("span");
    t2.innerText = "-";//ー
    li_obj.e.appendChild(t2);
  }
  t.setAttribute("style","color:" + li_obj.color);
  t.setAttribute("sound",li_obj.sound);
  if(li_obj.adv_text ) t.setAttribute("adv_text",li_obj.adv_text);
  t.setAttribute("class",TJS.Const.ClassTimer);
  t.setAttribute("value",li_obj.time - TJS.CurrentSec());
  t.innerText = "Loading"
  if(li_obj.navigate_url ) t.onclick = function(){ window.location.href = li_obj.navigate_url}
  li_obj.e.appendChild(t);
}
function LoadLi(li_obj){
	let t = document.createElement("span");
	if(li_obj.flag){
		let t2 = document.createElement("span");
		t2.innerText = "-";//ー
		li_obj.e.appendChild(t2);
	}
	t.setAttribute("style","color:" + li_obj.color);
	t.innerText = li_obj.text;
	li_obj.e.appendChild(t);
}

function ShowVillageData(li_element){
	let a_element = li_element.getElementsByTagName("a")[0];
	let a_element_href = a_element.getAttribute("href");
	let village_id_ = TJS.getParameterByName(a_element_href,"newdid");	
	let village_object = TJS.LSGetObject("village",village_id_);
	
	let e_p1 = document.createElement("div");
	e_p1.setAttribute("class",TJS.Const.ClassTaskHelper_p1)
	li_element.appendChild(e_p1);
	
	
	if(!global_loader && !TJS.CurrentData.isPlus && village_object["attack1"] ){
		let timeend = false;
		if(village_object["attack1"].timeend < TJS.CurrentSec()) timeend = true;
		if(!timeend | village_object["attack1"].count - 1 > 0) 
		{
			if(topbar)li_element.getElementsByTagName("svg")[0].style.display = "block";
			else li_element.getElementsByTagName("img")[0].setAttribute("src",TJS.attacks_img);
		}
	}
	switch(Number(window.task_helper_select.value))
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
	let flag = false;
	let j = 0;
	let obj;
	if(village_object.Builds ) for(let i = 0; i < village_object.Builds.length; i++) 
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
	if(village_object["demolish"]  && village_object["demolish"] > TJS.CurrentSec())
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
	let flag = false;
	for(let i = 0; i < TJS.Const.Show_TroopTrain_arr[0].length; i ++)
	{
		let checkbox_status = village_object["checkbox_status"];
		if(checkbox_status )
		{
			let isshow = checkbox_status[TJS.Const.LS_trooptrain_checkbox + TJS.Const.Show_TroopTrain_arr[0][i]];
			if(isshow  && isshow) 
			{
				let obj = TJS.GetLiBuildTimerObject();
					obj.e = e_p1;
					obj.time = village_object[TJS.Const.LS_trooptrain + TJS.Const.Show_TroopTrain_arr[0][i]];
					obj.flag = flag;
					obj.color = TJS.Const.Show_TroopTrain_arr[1][i];
					obj.adv_text = TJS.Const.Show_TroopTrain_arr[2][i] + ":%s";
					obj.show_zero = true;
					obj.navigate_url = "/build.php?newdid=" + village_id_ + "&gid=" + TJS.Const.Show_TroopTrain_arr[0][i];				
				LoadLiBuildTimer(obj);
				flag =true;
			}
		}
	}	
}
function Show_Celebration(village_object,e_p1,village_id_){
	if(!village_object["celebration_24"]) return;//||village_object["celebration_24"] < TJS.CurrentSec()
	let obj = TJS.GetLiBuildTimerObject();
		obj.e = e_p1;
		obj.time = village_object["celebration_24"];
		obj.color = TJS.Const.task_helper_color_list[0];
		obj.show_zero = true;
		obj.navigate_url = "/build.php?newdid="+village_id_+"&gid=24";
	LoadLiBuildTimer(obj);
}
function Show_Resource(village_object,e_p1,village_id_){
	if(!village_object["res"]) return;
	flag = false;
	for(let i = 0; i < village_object["res"].length; i++)
	{
		let li_obj = {};
		li_obj.text = Math.round(village_object["res"][i] / 1000) +"k";
		li_obj.flag = flag;
		li_obj.e = e_p1;
		li_obj.color = TJS.Const.task_helper_color_list[0];		
		LoadLi(li_obj);
		flag = true;
	}
}
function Show_AttackRed(village_object,e_p1,village_id_){
	if(!village_object["attack1"]) return;
	let timeend = false;
	if(village_object["attack1"].timeend < TJS.CurrentSec()) timeend = true;
	
	let t = document.createElement("span");	
	t.setAttribute("style","color:" + "Red");
	let t2 = document.createElement("span");
	if(!timeend)
	{
		t.innerText = village_object["attack1"].count + " attack in ";
		t2.setAttribute("class",TJS.Const.ClassTimer);
		t2.setAttribute("value",village_object["attack1"].timeend - TJS.CurrentSec());
	}
	else 
	{
		if(village_object["attack1"].count - 1 <= 0) return;
		else
		{
			t.innerText = (village_object["attack1"].count - 1) + " attack in ???";
		}
	}
	e_p1.appendChild(t);
	if(!timeend)e_p1.appendChild(t2);
}
function task_helper_select_onchange(){
	TJS.CurrentData.account_object["task_helper_select"] = window.task_helper_select.value;
	TJS.SaveCurrentAccount();
	let listp1 = document.getElementsByClassName(TJS.Const.ClassTaskHelper_p1);
	for(let i =0; i < listp1.length; ) listp1[0].remove();
	for(let i =0; i < TJS.CurrentData.listVillage.length; i++) ShowVillageData(TJS.CurrentData.listVillage[i]);
}

function show_culture(){
	let expansionSlotInfos = TJS.CurrentData.sidebarBoxVillagelist.getElementsByClassName("expansionSlotInfo");
	let boxTitles = TJS.CurrentData.sidebarBoxVillagelist.getElementsByClassName("boxTitle");
	if(expansionSlotInfos.length == 1 && boxTitles.length == 1){
		let villages_text = expansionSlotInfos[0].getElementsByClassName("slots")[0].innerText.replaceAll("‬/‭","/").replaceAll("‬‬","").match(/\d+\/\d+$/);//‭‭6‬/‭8‬‬
		let tooltip_text = expansionSlotInfos[0]._travianTooltip.text.replaceAll("‬/‭","/").replaceAll("‬‬","").match(/\d+\/\d+$/);
		boxTitles[0].innerText = villages_text + " (" + tooltip_text + ")";
		boxTitles[0].setAttribute("style","font-size: small;width:75%");
		if(TJS.CurrentData.village_object["celebration_24"]){
			let span_timer = document.createElement("span");
			span_timer.setAttribute("value",TJS.CurrentData.village_object["celebration_24"] - TJS.CurrentSec());
			span_timer.setAttribute("class",TJS.Const.ClassTimer);
			span_timer.setAttribute("adv_text","%s ");
			span_timer.setAttribute("sound",false);
			span_timer.setAttribute("style","float:right;padding-right: 8px;width:25%;text-align: right;");
			span_timer.setAttribute("onclick","window.location.href = \"/build.php?gid=24\"");
			boxTitles[0].insertAdjacentElement("beforebegin",span_timer);
		}
	}
}
function menu_top_right(){
	let e_div = document.createElement("div");
	e_div.setAttribute("align","right");
	if(topbar) 
	{
		e_div.setAttribute("style","float:right;width:100%;grid-column-start: 3;grid-row-start: 2;");
		topbar.appendChild(e_div);
	}
	else //old version
	{
		e_div.setAttribute("style","float:right;width:20%;grid-column-start: 3;grid-row-start: 2;");
		document.getElementById("center").insertAdjacentElement("afterbegin",e_div);
	}
	
	let update_img = document.createElement("div");
	update_img.innerHTML = '<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m443.317 272.859v-33.718c0-4.506-2.928-8.489-7.229-9.833l-38.199-11.937c-3.173-.992-5.652-3.461-6.706-6.614-2.114-6.324-4.659-12.451-7.601-18.346-1.486-2.977-1.482-6.478.062-9.426l18.571-35.453c2.091-3.991 1.345-8.878-1.841-12.065l-23.842-23.842c-3.186-3.186-8.073-3.932-12.065-1.841l-35.453 18.571c-2.948 1.544-6.448 1.548-9.426.062-5.894-2.942-12.021-5.486-18.346-7.601-3.153-1.054-5.623-3.533-6.614-6.706l-11.937-38.199c-1.344-4.301-5.327-7.229-9.833-7.229h-33.718c-4.506 0-8.489 2.928-9.833 7.229l-11.937 38.199c-.992 3.173-3.461 5.652-6.614 6.706-6.324 2.114-12.451 4.659-18.346 7.601-2.977 1.486-6.478 1.482-9.426-.062l-35.453-18.571c-3.991-2.091-8.878-1.345-12.065 1.841l-23.842 23.842c-3.186 3.186-3.932 8.073-1.841 12.065l18.571 35.453c1.544 2.948 1.548 6.448.062 9.426-2.942 5.894-5.486 12.021-7.601 18.346-1.054 3.153-3.533 5.623-6.706 6.614l-38.199 11.937c-4.301 1.344-7.229 5.327-7.229 9.833v33.718c0 4.506 2.928 8.489 7.229 9.833l38.199 11.937c3.173.992 5.652 3.461 6.706 6.614 2.114 6.324 4.659 12.451 7.601 18.345 1.486 2.977 1.482 6.478-.062 9.426l-18.571 35.453c-2.091 3.991-1.345 8.878 1.841 12.065l23.842 23.842c3.186 3.186 8.073 3.932 12.065 1.841l35.453-18.571c2.948-1.544 6.448-1.548 9.426-.062 5.894 2.942 12.021 5.486 18.346 7.601 3.153 1.054 5.623 3.533 6.614 6.706l11.937 38.199c1.344 4.301 5.327 7.229 9.833 7.229h33.718c4.506 0 8.489-2.928 9.833-7.229l11.937-38.199c.992-3.173 3.461-5.652 6.614-6.706 6.324-2.114 12.451-4.659 18.346-7.601 2.977-1.486 6.478-1.482 9.426.062l35.453 18.571c3.991 2.091 8.878 1.345 12.065-1.841l23.842-23.842c3.186-3.186 3.932-8.073 1.841-12.065l-18.571-35.453c-1.544-2.948-1.548-6.448-.062-9.426 2.942-5.894 5.486-12.021 7.601-18.346 1.054-3.153 3.533-5.623 6.706-6.614l38.199-11.937c4.301-1.343 7.229-5.326 7.229-9.832zm-187.317 47.661c-35.634 0-64.52-28.887-64.52-64.52s28.887-64.52 64.52-64.52c35.634 0 64.52 28.887 64.52 64.52s-28.886 64.52-64.52 64.52z" fill="#f7e365"/><path d="m443.317 272.859v-33.718c0-4.506-2.928-8.489-7.229-9.833l-38.199-11.937c-3.173-.992-5.652-3.461-6.706-6.614-2.114-6.324-4.659-12.451-7.601-18.346-1.486-2.977-1.482-6.478.062-9.426l18.571-35.453c2.091-3.991 1.345-8.878-1.841-12.065l-23.842-23.842c-3.186-3.186-8.073-3.932-12.065-1.841l-10.502 5.501c6.931 19.831 10.634 41.178 10.448 63.417-.853 101.827-83.884 184.857-185.71 185.71-22.239.186-43.586-3.517-63.417-10.448l-5.501 10.502c-2.091 3.991-1.345 8.878 1.841 12.065l23.842 23.842c3.186 3.186 8.073 3.932 12.065 1.841l35.453-18.571c2.948-1.544 6.448-1.548 9.426-.062 5.894 2.942 12.021 5.486 18.346 7.601 3.153 1.054 5.623 3.533 6.614 6.706l11.937 38.199c1.344 4.301 5.327 7.229 9.833 7.229h33.718c4.506 0 8.489-2.928 9.833-7.229l11.937-38.199c.992-3.173 3.461-5.652 6.614-6.706 6.324-2.114 12.451-4.659 18.346-7.601 2.977-1.486 6.478-1.482 9.426.062l35.453 18.571c3.991 2.091 8.878 1.345 12.065-1.841l23.842-23.842c3.186-3.186 3.932-8.073 1.841-12.065l-18.571-35.453c-1.544-2.948-1.548-6.448-.062-9.426 2.942-5.894 5.486-12.021 7.601-18.346 1.054-3.153 3.533-5.623 6.706-6.614l38.199-11.937c4.299-1.342 7.227-5.325 7.227-9.831z" fill="#f3d332"/><path d="m256 162.341c-51.644 0-93.659 42.015-93.659 93.659s42.015 93.659 93.659 93.659 93.659-42.015 93.659-93.659-42.015-93.659-93.659-93.659zm0 143.61c-27.587 0-49.951-22.364-49.951-49.951s22.364-49.951 49.951-49.951 49.951 22.364 49.951 49.951-22.364 49.951-49.951 49.951z" fill="#dbb72b"/></g><path d="m256 0c-70.692 0-134.692 28.654-181.019 74.981l-13.509-13.509c-6.556-6.556-17.765-1.913-17.765 7.359v60.062c0 9.271 11.209 13.914 17.765 7.359l37.389-37.389-.334-.334c42.062-42.062 97.986-65.226 157.469-65.227 59.055-.001 115.722 23.472 157.479 65.231 40.145 40.147 63.075 92.922 65.079 149.366.16 4.508 3.811 8.101 8.321 8.101h16.659c4.68 0 8.478-3.859 8.325-8.537-4.502-137.433-117.331-247.463-255.859-247.463z" fill="#88f2a9"/><path d="m256 512c70.692 0 134.692-28.654 181.019-74.981l13.508 13.508c6.556 6.556 17.765 1.913 17.765-7.359v-60.062c0-9.271-11.209-13.914-17.765-7.359l-37.389 37.389.334.334c-42.062 42.062-97.986 65.226-157.469 65.227-59.055.001-115.722-23.472-157.479-65.231-40.145-40.147-63.075-92.922-65.079-149.366-.16-4.508-3.811-8.101-8.321-8.101h-16.66c-4.68 0-8.478 3.859-8.325 8.537 4.504 137.434 117.333 247.464 255.861 247.464z" fill="#80e29e"/></g></svg>';
	update_img.setAttribute("title","Click to update");
	update_img.onclick = function(){
		if(window.confirm("Do you want to update?"))
		{
			let num = Number(UpdateNum) + 1;
			localStorage.setItem("UpdateNum", num);
			window.location.href = window.location.href;
		}
	}
	update_img.setAttribute("style","float: left; height: 21px;");
	
	window.task_helper_select = document.createElement("select");
	task_helper_select.setAttribute("title","Hot key: Q");
	task_helper_select.setAttribute("style","float: right;");
	task_helper_select.onchange = task_helper_select_onchange;
	
	e_div.appendChild(update_img);
	e_div.appendChild(task_helper_select);

	if(!TJS.CurrentData.account_object["task_helper_select"]) TJS.CurrentData.account_object["task_helper_select"] = 0;
	for(let i = 0; i < TJS.Const.task_helper_select_list.length; i++){
		let option_ = document.createElement("option");
		option_.value = i;
		option_.innerText = TJS.Const.task_helper_select_list[i];
		task_helper_select.appendChild(option_);
	}
	window.task_helper_select.value = TJS.CurrentData.account_object["task_helper_select"];
}
function dorf1_get_attack1(){//not save
	let movements = document.getElementById("movements");
	let att_obj = {};
	if(movements ){
		let trs = movements.getElementsByTagName("tr");
		for(let i = 0; i< trs.length;i++){
			let att1s = trs[i].getElementsByClassName("att1");
			if(att1s.length == 1){
				let timers = trs[i].getElementsByClassName("timer");
				att_obj.timeend = Number(timers[0].getAttribute("value")) + TJS.CurrentSec();
				att_obj.count = Number(trs[i].getElementsByClassName("a1")[0].innerText.match(/\d+/));
				break;
			}else{
				att_obj.timeend = 0;
				att_obj.count = 0;			
			}
		}
	}else{
		att_obj.timeend = 0;
		att_obj.count = 0;		
	}	
	TJS.CurrentData.village_object["attack1"] = att_obj;
}
function ReadDataBuilding(){//not save
	let Builds_ = [];
	let build = document.getElementsByClassName("buildDuration");
	if(build.length !== 0){//read in dorf 1 2
		for(let k=0; k < build.length; k++){
			let timeleft = Number(build[k].getElementsByTagName("span")[0].getAttribute("value"));
			Builds_.push(TJS.CurrentSec() + timeleft);
		}
		TJS.CurrentData.village_object["Builds"] = Builds_;
	}else if(window.location.pathname.indexOf("dorf1")>=0 || window.location.pathname.indexOf("dorf2")>=0) TJS.CurrentData.village_object["Builds"] = [];
}

function TJS_Global(){
	if(TJS.CurrentData.sidebarBoxVillagelist ){	
		menu_top_right();
		show_culture();
		if(window.location.pathname.indexOf("dorf1")>=0) dorf1_get_attack1();//need save
		ReadDataBuilding();//need save
		TJS.SaveCurrentVillage();//save
		for(let i =0; i < TJS.CurrentData.listVillage.length; i++) 
			ShowVillageData(TJS.CurrentData.listVillage[i]);
		global_loader = true;
	}
}
$(document).ready(TJS_Global);