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
	
	let e_p1 = document.createElement("p1");
	e_p1.setAttribute("style","font-size:" + TJS.Const.font_size);
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
	
	let update_img = document.createElement("img");
	update_img.src = httpGetGithubCdnUri("src/update.png");
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
