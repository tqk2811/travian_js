function Get_gid(){
	build_gid();
	switch(TJS.CurrentData.Gid)
	{
		case 17: gid17(); return;//market
		case 16: gid16(); return;//rallypoint
		case 15: gid15(); return;//main building
		case 24: gid24(); return;//Town Hall
		
		case 13: //Smithy
		case 19: //barrack
		case 20: //stable
		case 21: //workshop
		case 29: //g barrack
		case 30: //g stable
		case 46: //hospital
			troop_train(); 
			return; 
		
		default: return;
	}
}
function build_gid(){
	window.e_merge = { isOn : false, e_text : null };
	if(TJS.CurrentData.Gid == 16 && TJS.getParameterByName(window.location.href,"m") && TJS.getParameterByName(window.location.href,"tt") == "2")
		{
			window.e_merge.isOn = true;
			window.setInterval(function(){ 
						let e_resourceWrappers = document.getElementsByClassName("inlineIconList resourceWrapper");
						if(e_resourceWrappers.length == 1) build_gid_TotalRes(e_resourceWrappers[0]);
					},
				500);
		}			
	else 
	{
		let e_resourceWrappers = document.getElementsByClassName("inlineIconList resourceWrapper");
		for(let i =0; i < e_resourceWrappers.length; i++) build_gid_TotalRes(e_resourceWrappers[i]);
	}
}

function build_gid_TotalRes(e){
	let ress = e.getElementsByTagName("span");
	if(ress.length >= 4)
	{
		let total_ = 0;
		for(let i =0; i < 4; i++) total_ += Number.parseInt(ress[i].innerText);
		let parent_ress = ress[0].parentNode.parentNode;
		if(window.e_merge.isOn)
		{
			if(!document.getElementById("e_merge"))
			{
				if (!window.e_merge.e_text) 
				{
					window.e_merge.e_text = document.createElement("div");
					window.e_merge.e_text.setAttribute("id","e_merge");
				}
				e.insertAdjacentElement("afterend",window.e_merge.e_text);
				window.e_merge.e_text.innerText = "Total: " + total_ + " (" + total_ + " % 40k res = " + (total_ % 40000).toString() + ")";		
			}
		}
		else 
		{
			let total_element =  document.createElement("div");
			total_element.innerText = "Total: " + total_;
			e.appendChild(total_element);//e.insertAdjacentElement("afterend",total_element);
		}		
	}
	//19,20,21,36: barrack,stable,workshop,traper
	if(((TJS.CurrentData.Gid >= 19 && TJS.CurrentData.Gid <= 21) || TJS.CurrentData.Gid == 36) && e.parentElement.getAttribute("class") == "details")
	{
		let e_imgs = e.parentElement.getElementsByTagName("img");
		let e_imgs_unit = e.parentElement.getElementsByClassName("unit");
		if(e_imgs.length == 1 && e_imgs_unit.length == 1 && e_imgs[0] == e_imgs_unit[0])
		{
			let class_unit_strings = e_imgs[0].getAttribute("class").split(" ");
			let name_unit = e_imgs[0].getAttribute("alt");
			if(class_unit_strings.length == 2)
			{				
				let account_object = TJS.CurrentData.account_object;
				if(!account_object["troop"]) account_object["troop"] = {};
				
				let unit_id = Number(class_unit_strings[1].substring(1));
				let unit_tribe = "tribe_error";
				if 		(unit_id >=  1 && unit_id <= 10) unit_tribe = "Roman";
				else if (unit_id >= 11 && unit_id <= 20) unit_tribe = "Teuton";
				else if ((unit_id >= 21 && unit_id <= 30) | unit_id == 99) unit_tribe = "Gaul";
				else if (unit_id >= 51 && unit_id <= 60) unit_tribe = "Egypt";
				else if (unit_id >= 61 && unit_id <= 70) unit_tribe = "Huns";
				let e_value = e.getElementsByClassName("value");
				let arr = [];
				arr.push(name_unit + " (" + unit_tribe + ")");
				for(let i = 0; i < 4; i++)arr.push(Number(e_value[i].innerText));
				account_object["troop"][class_unit_strings[1]] = arr;
				TJS.SaveCurrentAccount();
			}
		}
	}
}

function gid15(){//main building
	if(document.getElementById("demolish")){
		let timers_ = demolish.getElementsByClassName("timer");
		if(timers_.length == 1)	TJS.CurrentData.village_object["demolish"] = Number(timers_[0].getAttribute("value")) + TJS.CurrentSec();
		else TJS.CurrentData.village_object["demolish"] = 0;			
		TJS.SaveCurrentVillage();
	}
}

function gid16(){//rallypoint
	if(TJS.CurrentData.tab_MainActive){
		gid16_raidall_init();
		if(TJS.CurrentData.tab_MainActive.getAttribute("href").indexOf("tt=99")>=0) gid16_raidlist();//raidList
		else if(TJS.CurrentData.tab_MainActive.getAttribute("href").indexOf("tt=2")>=0){
			if(document.getElementById("rallyPointButtonsContainer")) gid16_attack_multiwave();
		}
	}
}

function gid16_raidlist(){
	let raidlists = [];
	let listEntrys = document.getElementById("raidList").getElementsByClassName("listEntry");
	for(let i = 0; i < listEntrys.length; i++) 
		raidlists.push({
					id: Number(listEntrys[i].id.slice(4,listEntrys[i].id.length)),
					name: listEntrys[i].getElementsByClassName("listTitleText")[0].innerText
				});
	TJS.CurrentData.account_object["raidlists"] = raidlists;
	TJS.SaveCurrentAccount();
	
	
	window.gid16_cb_raid = document.createElement("input");//
	gid16_cb_raid.setAttribute("type","checkbox");
	TJS.InitCheckboxOnclick(gid16_cb_raid,"gid16_cb_raid",null,true);
	let e_LB_raid = document.createElement("label");
	e_LB_raid.innerText = "Start raids";			
	e_LB_raid.setAttribute("style","border:none;color:black;padding: 3px;");
	e_LB_raid.appendChild(window.gid16_cb_raid);
			
	window.gid16_cb_attacking = document.createElement("input");
	gid16_cb_attacking.setAttribute("type","checkbox");
	TJS.InitCheckboxOnclick(gid16_cb_attacking,"gid16_cb_attacking",null,true);
	let e_LB_attacking = document.createElement("label");			
	e_LB_attacking.innerText = "Don't raid attacking";
	e_LB_attacking.setAttribute("style","border:none;color:black;padding: 3px;");
	e_LB_attacking.appendChild(window.gid16_cb_attacking);
			
	window.gid16_cb_yellow = document.createElement("input");//
	gid16_cb_yellow.setAttribute("type","checkbox");
	TJS.InitCheckboxOnclick(gid16_cb_yellow,"gid16_cb_yellow",null,true);
	let e_LB_yellow = document.createElement("label");
	e_LB_yellow.innerText = "Yellow";
	e_LB_yellow.setAttribute("style","border:none;color:black;padding: 3px;");
	e_LB_yellow.appendChild(window.gid16_cb_yellow);			
	
	window.gid16_cb_red = document.createElement("input");//
	gid16_cb_red.setAttribute("type","checkbox");
	TJS.InitCheckboxOnclick(gid16_cb_red,"gid16_cb_red",null,true);
	let e_LB_red = document.createElement("label");
	e_LB_red.innerText = "Red";
	e_LB_red.setAttribute("style","border:none;color:black;padding: 3px;");			
	e_LB_red.appendChild(window.gid16_cb_red);
	
	let raidall_div = document.createElement("div");
	raidall_div.setAttribute("style","background-color:green;float:right;color:white;");
	raidall_div.onclick = gid16_bt_raidall;
	raidall_div.innerText ="Check all";
	
	let continue_div = null;
	let raidall = TJS.CurrentData.account_object["raidall"];
	if(raidall && raidall.curr_id != "")
	{
		continue_div = document.createElement("div");
		continue_div.setAttribute("style","background-color:#fc0acc;float:right;color:white;");
		continue_div.onclick = function(){
			raidall.flag = true;
			gid16_raidall_init();
			};
		continue_div.innerText ="Continue";
	}
	
	let e_div = document.createElement("div");
	//e_div.appendChild(e_bt_CheckAllGreenAttack);
	e_div.appendChild(e_LB_raid);
	e_div.appendChild(e_LB_attacking);
	e_div.appendChild(e_LB_yellow);
	e_div.appendChild(e_LB_red);
	e_div.appendChild(raidall_div);
	if(continue_div) e_div.appendChild(continue_div);
	
	TJS.CurrentData.e_build.insertAdjacentElement("afterbegin",e_div);
	
	let current_time = TJS.CurrentSec();
	for(let i = 0; i < listEntrys.length; i++)
	{
		let listid = listEntrys[i].getAttribute("id");
		let listTitleText = listEntrys[i].getElementsByClassName("listTitleText")[0];
		let time_last_click = TJS.CurrentData.account_object["raidlist_" + listid];
		let text_button = "Check Green";
		if(time_last_click)
		{
			let texttime = TJS.GetTimeTextFromSecondLeft(current_time - Number(time_last_click));
			text_button += " (" + texttime + " ago)";
		}
		let buttoncheck = document.createElement("label");
		buttoncheck.setAttribute("style","background-color:green;float:right;color:white;");
		buttoncheck.innerText = text_button;
		buttoncheck.setAttribute("onclick","gid16_bt_CheckGreen_onclick(\"" + listid + "\")");		
		listTitleText.appendChild(buttoncheck);
	}
}

function gid16_bt_raidall(){
	let txt = "Notice: You need invigorate this tab, may be captcha show up.\r\nIf you ignore captcha, you will get banned.\r\n\r\n";
	txt += "Info Yellow: " + window.gid16_cb_yellow.checked + " , Red: " + window.gid16_cb_red.checked;
	if(!window.confirm(txt)) return;
	
	let listEntrys = document.getElementsByClassName("listEntry");
	if(listEntrys.length > 0)
	{
		let id = listEntrys[0].getAttribute("id");
		TJS.CurrentData.account_object["raidall"] = 
		{
			flag:true,
			curr_id: id
		}
		TJS.SaveCurrentAccount();
		window.gid16_flagraidall = true;
		gid16_bt_CheckGreen_onclick(id);
	}
}

function gid16_raidall_init(){
	let raidall = TJS.CurrentData.account_object["raidall"];
	if(raidall && raidall.flag)
	{
		let listEntrys = document.getElementsByClassName("listEntry");
		let flag = false;
		for(let i = 0; i < listEntrys.length; i++)
		{
			if(flag)
			{
				raidall.curr_id = listEntrys[i].getAttribute("id");
				TJS.SaveCurrentAccount();
				window.gid16_flagraidall = true;
				gid16_bt_CheckGreen_onclick(raidall.curr_id);
				return;
			}
			if(raidall.curr_id == listEntrys[i].getAttribute("id")) flag = true;
		}
		raidall.flag = false;
		raidall.curr_id = "";
		TJS.SaveCurrentAccount();
	}
}


function gid16_bt_CheckGreen_onclick(listid){
	let listEntry = document.getElementById(listid);
	if(!listEntry) return;
	//expand
	let switchClosed = listEntry.getElementsByClassName("switchClosed");
	if(switchClosed.length > 0)
	{
		switchClosed[0].click();
		if(window.gid16_flagraidall)
		{
			window.gid16_raidall_Intervalhandle = window.setInterval(function()
			{
				let loading_hides = listEntry.getElementsByClassName("loading hide");
				if(loading_hides.length == 1)
				{
					let _switchClosed = listEntry.getElementsByClassName("switchClosed");//expanded
					if(_switchClosed.length == 0)
					{
						window.clearInterval(window.gid16_raidall_Intervalhandle);
						gid16_bt_CheckGreen_onclick(listid);//click raid
					}
					else _switchClosed[0].click();
				}
			},500);
		}
		return;
	}
	
	TJS.CurrentData.account_object["raidlist_" + listid] =  TJS.CurrentSec();
	TJS.SaveCurrentAccount();
	let nodata = listEntry.getElementsByClassName("noData");
	let check_count = 0;
	if(nodata.length == 0)
	{
		let e_slotRows = listEntry.getElementsByClassName("slotRow");
		for(let j = 0; j< e_slotRows.length; j++)
		{				
			let e_img_attack = e_slotRows[j].getElementsByClassName("attack");
			let isAttacking = e_img_attack.length > 0;
			let isHistoryYellow = e_slotRows[j].getElementsByClassName("iReport2").length > 0;
			let isHistoryRed = e_slotRows[j].getElementsByClassName("iReport3").length > 0;
				
			let e_input = e_slotRows[j].getElementsByTagName("input");
			if(e_input && 
				!(gid16_cb_attacking.checked && isAttacking ) &&
				!(isHistoryYellow && !gid16_cb_yellow.checked) &&
				!(isHistoryRed && !gid16_cb_red.checked))
				{
					e_input[0].checked = true;
					check_count++;
				}
		}
	}	
	
	if(check_count == 0 && window.gid16_flagraidall)
	{
		gid16_raidall_init();
	}
	else if(window.gid16_cb_raid.checked)
	{
		let e_bt = listEntry.getElementsByTagName("button");
		e_bt[3].click();
	}
}

function gid16_attack_multiwave(){
	localStorage.setItem("attack_multiwave","0");
	let e_main = document.createElement("div");
	e_main.setAttribute("style","display: inline-block;");
	TJS.CurrentData.e_build.insertAdjacentElement("beforeend",e_main);

	window.gid16_BT_StartCata = document.createElement("button");
	gid16_BT_StartCata.setAttribute("style","background-color:green;border:none;color:white;padding: 3px; margin: 3px;");
	gid16_BT_StartCata.innerText = "Start multi-wave (first wave)";
	gid16_BT_StartCata.setAttribute("onclick","gid16_attack_multiwave_start()");
	e_main.appendChild(gid16_BT_StartCata);

	let e_p = document.createElement("p");
	e_main.appendChild(e_p);

	window.gid16_Input_AttackTrigger = document.createElement("input");
	gid16_Input_AttackTrigger.id = "gid16_Input_AttackTrigger";
	gid16_Input_AttackTrigger.type = "checkbox";
	gid16_Input_AttackTrigger.setAttribute("onclick","gid16_attack_multiwave_trigger()");
	e_main.appendChild(gid16_Input_AttackTrigger);

	let label_gid16_Input_AttackTrigger = document.createElement("label");
	label_gid16_Input_AttackTrigger.setAttribute("for","gid16_Input_AttackTrigger");
	label_gid16_Input_AttackTrigger.innerText = "Wait first wave";
	e_main.appendChild(label_gid16_Input_AttackTrigger);
	
	let e_p2 = document.createElement("p");
	e_main.appendChild(e_p2);
	
	window.gid16_Input_delay = document.createElement("input");
	gid16_Input_delay.setAttribute("id","gid16_Input_delay")
	gid16_Input_delay.setAttribute("min",0);
	gid16_Input_delay.setAttribute("max",5000);
	gid16_Input_delay.setAttribute("type","number");
	gid16_Input_delay.setAttribute("value",200);
	gid16_Input_delay.setAttribute("maxlength",4);
	gid16_Input_delay.setAttribute("style","padding:3px;margin:3px;");
	//gid16_Input_delay.hidden = true;
	e_main.appendChild(gid16_Input_delay);
	
	window.gid16_Label_Delay = document.createElement("label");
	gid16_Label_Delay.setAttribute("id","label_gid16_Input_delay");
	gid16_Label_Delay.setAttribute("for","gid16_Input_delay");
	gid16_Label_Delay.innerText = "Delay After First Wave (ms)";
	//gid16_Label_Delay.hidden = true;
	e_main.appendChild(gid16_Label_Delay);
	
	//
	let select_kata2s = document.getElementsByName("troops[0][kata2]");
	if(select_kata2s.length == 1) select_kata2s[0].value = 99;
}

function gid16_attack_multiwave_start(){
	if(window.confirm("Start?"))
	{
		let bt_ok = document.getElementById("btn_ok");
		bt_ok.click();
		localStorage.setItem("attack_multiwave",Date.now()+Number(window.gid16_Input_delay.value));
	}
}

function gid16_attack_multiwave_trigger(){
	if(gid16_Input_AttackTrigger.checked) 
	{
		localStorage.setItem("attack_multiwave","0");
		window.gid16_Interval_id = window.setInterval(gid16_attack_multiwave_trigger_Interval,10);
		gid16_BT_StartCata.disabled  = true;
		gid16_BT_StartCata.style.backgroundColor = "gray";
		gid16_Label_Delay.disabled  = true;
		gid16_Input_delay.disabled  = true;
	}
	else 
	{
		if(gid16_Interval_id ) window.clearInterval(gid16_Interval_id);
		gid16_BT_StartCata.disabled  = false;
		gid16_BT_StartCata.style.backgroundColor = "green";
		gid16_Label_Delay.disabled  = false;
		gid16_Input_delay.disabled  = false;	
	}
}

let time_multiwave = 0;

function gid16_attack_multiwave_trigger_Interval(){
	if(time_multiwave == 0) {
		let attack_multiwave_flag = localStorage.getItem("attack_multiwave");
		if(attack_multiwave_flag !== "0") time_multiwave = Number(attack_multiwave_flag);
	}else if(Date.now() >= time_multiwave){
		let bt_ok = document.getElementById("btn_ok");
		window.clearInterval(gid16_Interval_id);
		bt_ok.click();
	}
}


function gid17(){//market
	if(TJS.CurrentData.tab_MainActive){
		if(TJS.CurrentData.tab_MainActive.getAttribute("href").indexOf("t=0")>=0){//manager
			let trading_routes = document.getElementById("trading_routes");
			if(trading_routes){
				let button_clear = document.createElement("button");
				button_clear.innerText = "Clear All Trade Routes";
				button_clear.setAttribute("style","background-color:red;border:none;color:white;padding: 3px;");
				button_clear.setAttribute("onclick","gid17_clear_onclick()");
				trading_routes.insertAdjacentElement("beforebegin",button_clear);
				
				let arr_traderoute_desc = [];			
				let desc = trading_routes.getElementsByClassName("desc");
				for( let i = 0; i < desc.length; i++){
					let a_desc = desc[i].getElementsByTagName("a");
					let r = [
								desc[i].getElementsByClassName("r1")[0].parentElement.innerText,
								desc[i].getElementsByClassName("r2")[0].parentElement.innerText,
								desc[i].getElementsByClassName("r3")[0].parentElement.innerText,
								desc[i].getElementsByClassName("r4")[0].parentElement.innerText
							];
					if(a_desc.length > 0){
						let href_a_desc = a_desc[0].getAttribute("href");
						let flag_add = true;
						for(let j = 0; j< arr_traderoute_desc.length; j++)
							if(arr_traderoute_desc[j][1] == href_a_desc && 
								r[0] == arr_traderoute_desc[j][2][0] && r[1] == arr_traderoute_desc[j][2][1] &&
								r[2] == arr_traderoute_desc[j][2][2] && r[3] == arr_traderoute_desc[j][2][3]
								) { flag_add = false; break; }								
						if(flag_add) arr_traderoute_desc.push([a_desc[0].innerText,href_a_desc,r]);			
					}
				}
								
				window.gid17_select_clear = document.createElement("select");
				gid17_select_clear.add(gid17_clear_select(null));
				arr_traderoute_desc.forEach(function(child){gid17_select_clear.add(gid17_clear_select(child));});
				trading_routes.insertAdjacentElement("beforebegin",gid17_select_clear);
			}

			let e_tradeRouteEdit = document.getElementById("tradeRouteEdit");
			if(false && e_tradeRouteEdit && Number(TJS.getParameterByName(window.location.href,"option")) == 1)//disable create multi traderoute
			{
				let timeSelector = document.getElementsByClassName("timeSelector")[0];
				
				let div_timeend = document.createElement("div");
				timeSelector.insertAdjacentElement("afterend",div_timeend);
				div_timeend.setAttribute("style","display: flex;background: rgb(220, 247, 197)");
				
				div_timeend.innerHTML = "<div><label>Time end:</label></div><div><input size=\"2\" type=\"number\" length=\"10px\" style=\"height:22px;width:53px;\" placeholder=\"hh\" min=\"0\" max=\"24\" value=\"24\" id=\"hour_end\"><span>:</span><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;   width: 53px;\" placeholder=\"mm\" min=\"0\" max=\"59\" value=\"00\" id=\"minute_end\"></div><div><label>------&gt; with step :</label></div><div><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;width: 53px;\" placeholder=\"hh\" min=\"0\" max=\"24\" value=\"1\" id=\"hour_step\"><span>:</span><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;width: 53px;\" placeholder=\"mm\" min=\"0\" max=\"59\" value=\"00\" id=\"minute_step\"></div><div onclick=\"gid17_CreateTradeRoutes_click()\" style=\"background-color:green;border:n`one;color:white;padding:3px;margin:3px;\">Create TradeRoutes</div>"
			}
		}
		else if(TJS.CurrentData.tab_MainActive.getAttribute("href").indexOf("t=5")>=0){//send res
			let marketSend_ = document.getElementById("marketSend");
			if(marketSend_ ){
				let e_carry = TJS.CurrentData.e_build.getElementsByClassName("carry");
				if(e_carry.length == 1) e_carry[0].remove();
								
				let div_market = document.createElement("div");
				marketSend_.insertAdjacentElement("beforebegin",div_market);				
				let div_left_market = document.createElement("div");
				div_left_market.setAttribute("style","float:left; width:45%;");				
				let div_right_market = document.createElement("div");
				div_right_market.setAttribute("style","float:right; width:55%;");
				div_market.appendChild(div_left_market);
				div_market.appendChild(div_right_market);
				div_market.insertAdjacentElement("afterend",TJS.DivClear());
				
				let br = document.createElement("br");				
				window.gid17_TypeResSelect = document.createElement("select");
				gid17_TypeResSelect.setAttribute("style","width:150px");	
				gid17_TypeResSelect.appendChild(gid17_createoption("-1",""));// empty option
				
				gid17_TypeResSelect.appendChild(gid17_createoption("b_0","Balance current village"));
				gid17_TypeResSelect.appendChild(gid17_createoption("b_1","Balance target village"));
				
				gid17_TypeResSelect.appendChild(gid17_createoption("c_0","Small Celebration"));
				gid17_TypeResSelect.appendChild(gid17_createoption("c_1","Big Celebration"));
				gid17_TypeResSelect.appendChild(gid17_createoption("c_2","Big Celebration / 2"));
				gid17_TypeResSelect.appendChild(gid17_createoption("c_3","Big Celebration / 3"));
				
				let account_object = TJS.CurrentData.account_object;
				if(account_object["troop"] ){
					let keys = Object.keys(account_object["troop"]);
					for(let i = 0; i < keys.length; i++)
						gid17_TypeResSelect.appendChild(gid17_createoption(keys[i],account_object["troop"][keys[i]][0]));
				}
				gid17_TypeResSelect.setAttribute("onchange","gid17_TypeResSelect_onchange()");
				
				window.gid17_input_number = document.createElement("input");
				gid17_input_number.setAttribute("type","number");
				gid17_input_number.setAttribute("style","width:50px");
				gid17_input_number.setAttribute("min","0");
				gid17_input_number.setAttribute("max","0");
				gid17_input_number.setAttribute("onchange","gid17_input_number_onchange()");
				
				window.gid17_label_max = document.createElement("label");
				gid17_label_max.innerText = "/0";
				gid17_label_max.onclick = function(){
															gid17_input_number.value = gid17_input_number.max;
															gid17_input_number_onchange();															
														};
				gid17_label_max.setAttribute("style","margin-left:3px");
				
				let label_noncrop = document.createElement("label");
				label_noncrop.setAttribute("style","margin-left:3px");
				label_noncrop.innerText = "No crop";
				
				window.gid17_noncrop = document.createElement("input");
				gid17_noncrop.setAttribute("type","checkbox");
				gid17_noncrop.setAttribute("id","gid17_noncrop");
				TJS.InitCheckboxOnclick(gid17_noncrop,"gid17_noncrop",gid17_TypeResSelect_onchange,true);
				label_noncrop.appendChild(gid17_noncrop);
				
				let label_SaveBigCelebration = document.createElement("label");
				label_SaveBigCelebration.setAttribute("style","margin-left:3px");
				label_SaveBigCelebration.innerText = "Save Big Celebration";
				
				window.gid17_SaveBigCelebration = document.createElement("input");
				gid17_SaveBigCelebration.setAttribute("type","checkbox");
				gid17_SaveBigCelebration.setAttribute("id","gid17_SaveBigCelebration");
				TJS.InitCheckboxOnclick(gid17_SaveBigCelebration,"gid17_SaveBigCelebration",gid17_TypeResSelect_onchange,true);
				label_SaveBigCelebration.appendChild(gid17_SaveBigCelebration);
				
				div_left_market.appendChild(label_noncrop);
				div_left_market.appendChild(label_SaveBigCelebration);
				div_left_market.appendChild(br);
				div_left_market.appendChild(gid17_TypeResSelect);
				div_left_market.appendChild(gid17_input_number);
				div_left_market.appendChild(gid17_label_max);				
				
				gid17_TypeResSelect_onchange();
				
				///right zone
				let x2 = document.getElementById("x2");
				x2.onchange = gid17_TypeResSelect_onchange;
				
				let divr1 = document.createElement("div");
				let divr2 = document.createElement("div");
				let divr3 = document.createElement("div");
				div_right_market.appendChild(divr1);
				div_right_market.appendChild(divr2);
				div_right_market.appendChild(divr3);
				
				let target_label = document.createElement("label");
				target_label.innerText = "Target Village Id:";
				divr1.appendChild(target_label);
				
				window.gid17_timer = document.createElement("span");
				gid17_timer.setAttribute("class",TJS.Const.ClassTimer);
				gid17_timer.setAttribute("counting","up");
				gid17_timer.setAttribute("adv_text","(update %s ago)");
				gid17_timer.setAttribute("state","stop");
				gid17_timer.setAttribute("value","0");
				gid17_timer.setAttribute("style","float:right;");
				gid17_timer.innerText = "";
				divr1.appendChild(gid17_timer);
				
				window.gid17_target_span = document.createElement("span");
				divr1.appendChild(gid17_target_span);
				
				window.gid17_r1 = gid17_MarketPlace_icon_n_res(divr2,"r1");
				window.gid17_r2 = gid17_MarketPlace_icon_n_res(divr2,"r2");
				window.gid17_r3 = gid17_MarketPlace_icon_n_res(divr2,"r3");
				window.gid17_r4 = gid17_MarketPlace_icon_n_res(divr2,"r4");
				
				let div_warehouse = document.createElement("div");
				div_warehouse.setAttribute("style","float:left; width:42%;")
				div_warehouse.innerText = "Warehouse:";
				window.gid17_target_storage = document.createElement("span");
				gid17_target_storage.innerText = 0;
				div_warehouse.appendChild(gid17_target_storage);
				
				let div_granary = document.createElement("div");
				div_granary.setAttribute("style","float:left; width:42%;")
				div_granary.innerText = "Granary:";
				window.gid17_target_granary = document.createElement("span");
				gid17_target_granary.innerText = 0;
				div_granary.appendChild(gid17_target_granary);
				
				let div_percent = document.createElement("div");
				div_percent.setAttribute("style","float:right; width:15%;");
				window.gid17_percent = document.createElement("span");
				gid17_percent.innerText = 0;
				div_percent.appendChild(gid17_percent);
				let label_percent = document.createElement("span");
				label_percent.innerText = "%";
				div_percent.appendChild(label_percent);
				
				divr3.appendChild(div_warehouse);
				divr3.appendChild(div_granary);				
				
				TJS.Re_MarketPlace_sendRessources(gid17_MarketPlace_sendRessources_callback);				
				let datalist_villagename = TJS.CreateDataListVillageName();		
				marketSend_.insertAdjacentElement("afterend",datalist_villagename);
				gid17_MarketPlace_sendRessources_callback();
				gid17_enterVillageName();
			}
		}
	}
}

function gid17_Sliders(){
	let destination = document.getElementsByClassName("destination")[0];				
	let d_div = document.createElement("div");
	destination.appendChild(d_div);
	d_div.setAttribute("style","float:right; width:100%;");				
	window.slider_current = gid17_create_slider(d_div,true,TJS.CurrentData.VillageId);
	window.slider_target = gid17_create_slider(d_div,false,null);
	window.slider_target.disabled = true;
}

function gid17_create_slider(parent_,isMin,village_id){
	let v = isMin ? 0 : TJS.Const.Slider_Target_Max_Default;
	if(village_id){
		let village_obj = TJS.LSGetObject("village",village_id);
		if(village_obj[isMin ? "gid17min" : "gid17max"] ) v = village_obj[isMin ? "gid17min" : "gid17max"];
	}
	let div = document.createElement("div");
	parent_.appendChild(div);
	
	let label_p = document.createElement("label");
	label_p.innerText = v +"%";
	label_p.setAttribute("style","float:right; width:12%;height: 16px;");
	
	let slider = document.createElement("input");
	slider.setAttribute("min",0);	
	slider.setAttribute("value",v);
	slider.setAttribute("max",100);	
	slider.setAttribute("type","range");
	slider.setAttribute("class","slider");
	if(village_id) slider.setAttribute("village_id",village_id);
	slider.setAttribute("title",isMin ? "Min Current" : "Max Target");
	slider.setAttribute("isCurrent",isMin);
	slider.setAttribute("style","width:84%; height:16px;");
	slider.oninput = function(){
		let isCurrent = this.getAttribute("isCurrent") == "true";
		let vi = this.getAttribute("village_id");
		if(isCurrent) {
			TJS.CurrentData.village_object["gid17min"] = this.value;
			TJS.SaveCurrentVillage();
		}else if(vi){
			let vo = TJS.LSGetObject("village",vi);
			vo["gid17max"] = this.value;
			TJS.LSSaveObject("village",vi,vo);
		}else this.disabled = true;
		label_p.innerText = this.value + "%";
	};
	slider.onchange = function(){
		if(!this.disabled)
		{
			label_p.innerText = this.value + "%";
			gid17_TypeResSelect_onchange();
		}
		else label_p.innerText = "";
	}
	div.appendChild(slider);
	div.appendChild(label_p);
	return slider;
}

function gid17_MarketPlace_icon_n_res(e_parent,class_name){
	let div_ = document.createElement("div");
	div_.setAttribute("style","float:left; width:24%;");
	e_parent.appendChild(div_);
	let e_i = document.createElement("i");
	e_i.setAttribute("class",class_name);
	let e_span = document.createElement("span");
	e_span.innerText = "0";
	div_.appendChild(e_i);
	div_.appendChild(e_span);
	return e_span;
}

function gid17_MarketPlace_sendRessources_callback(){
	enterVillageName.setAttribute("list","village_list");
	window.gid17_target_span.innerText = "";
	enterVillageName.onchange = gid17_enterVillageName;
	gid17_Sliders();
	gid17_TypeResSelect_onchange();
}

function gid17_enterVillageName(){
	for(let i = 0; i < TJS.ListVillageName.length; i++){
		if(TJS.ListVillageName[i].name == enterVillageName.value){
			window.gid17_target_span.innerText = TJS.ListVillageName[i].id;
			window.gid17_obj_target = TJS.LSGetObject("village",TJS.ListVillageName[i].id);
			if(gid17_obj_target["res"]){
				window.gid17_r1.innerText = gid17_obj_target["res"][0];
				window.gid17_r2.innerText = gid17_obj_target["res"][1];
				window.gid17_r3.innerText = gid17_obj_target["res"][2];
				window.gid17_r4.innerText = gid17_obj_target["res"][3];
				window.gid17_timer.setAttribute("value",TJS.CurrentSec() - gid17_obj_target["updatein"]);
				window.gid17_timer.setAttribute("state","run");
				window.gid17_target_storage.innerText = gid17_obj_target["storage"];
				window.gid17_target_granary.innerText = gid17_obj_target["granary"];				
				window.slider_target.setAttribute("village_id",TJS.ListVillageName[i].id);
				window.slider_target.disabled = false;
				if(gid17_obj_target["gid17max"] ) window.slider_target.value = gid17_obj_target["gid17max"];
				else window.slider_target.value = TJS.Const.Slider_Target_Max_Default;
				window.slider_target.onchange();
				return;
			}			
		}
		else window.gid17_obj_target = null;
	}
	window.gid17_target_span.innerText = "";
	window.gid17_timer.setAttribute("state","stop");
	window.gid17_timer.innerText = "";
	window.gid17_r1.innerText = 0;
	window.gid17_r2.innerText = 0;
	window.gid17_r3.innerText = 0;
	window.gid17_r4.innerText = 0;
	window.slider_target.removeAttribute("village_id");
	window.slider_target.disabled = true;
	window.slider_target.onchange();
}

function gid17_createoption(value_,name){
	let e_option = document.createElement("option");
	e_option.value = value_;
	e_option.innerText = name;
	return e_option;
}

function gid17_TypeResSelect_onchange(){
	let account_object = TJS.CurrentData.account_object;
	switch(gid17_TypeResSelect.value){
		case "-1"  : 
			gid17_input_number.max = 0;
			gid17_input_number.min = 0;
			gid17_input_number.value = 0;
			gid17_label_max.innerText = "/0";
			gid17_SaveBigCelebration.disabled = false;
			break;
			
		case "b_0" : 
		case "b_1" : 
			gid17_SaveBigCelebration.disabled = false;
			gid17_input_number.max = Math.floor(Number(document.getElementById("merchantCapacityValue").innerText)/TJS.Const.RoundResource);
			gid17_input_number.min = 0;
			gid17_input_number.value = 0;
			gid17_label_max.innerText = "x" + TJS.Const.RoundResource;
			break;
		
		case "c_0" : 
		case "c_1" : 
		case "c_2" : 
		case "c_3" : 
			gid17_SaveBigCelebration.disabled = true;
			gid17_input_number.max = 1;
			gid17_input_number.min = 0;
			gid17_input_number.value = 1;
			gid17_label_max.innerText = "/1";
			gid17_write_res(TJS.Const.CelebrationResource[gid17_TypeResSelect.value].r,
					TJS.Const.CelebrationResource[gid17_TypeResSelect.value].run_twice);
			break;
		
		default:
			gid17_SaveBigCelebration.disabled = false;
			window.gid17_TroopRes = TJS.CurrentData.account_object["troop"][gid17_TypeResSelect.value];
			gid17_findmaxtroops();
			return;
	}
}

function gid17_input_number_onchange(){
	let b_flag = false;
	switch(gid17_TypeResSelect.value){
		case "-1" : gid17_write_res([0,0,0,0],1); return;
		case "b_0" : b_flag = true;//true is balance current
		case "b_1" : 
			let v_obj_current = TJS.CurrentData.village_object;
			let v_obj_target = TJS.LSGetObject("village",window.gid17_target_span.innerText);
			if(!v_obj_target["res"]) return;
			let merchantCapacityValue = Number(document.getElementById("merchantCapacityValue").innerText);
			let res_merchantsend = Number(window.gid17_input_number.value)*TJS.Const.RoundResource;
			
			let arr = [];
			for(let i = 0; i < 4; i++){
				let obj = {};
				obj.sc = i == 3 ? v_obj_current["granary"]: v_obj_current["storage"];
				if(window.gid17_noncrop.checked && i == 3) obj.rc = 0;
				else{
					let res_current_save_max = Math.max(Math.round(obj.sc * slider_current.value / 100), 
						window.gid17_SaveBigCelebration.checked ? TJS.Const.CelebrationResource["c_1"]["r"][i] : 0);
					if(v_obj_current["res"][i] > res_current_save_max) obj.rc = v_obj_current["res"][i] - res_current_save_max;
					else obj.rc = 0;
				}
				if(!b_flag){
					obj.rt = v_obj_target["res"][i];
					obj.st =  Math.floor((i == 3 ? v_obj_target["granary"] : v_obj_target["storage"]) * 
					(window.slider_target.disabled ? 1 : window.slider_target.value/100));
				}
				arr.push(obj);
			}
			let m = gid17_getx2();
			let result = TJS.BalanceRes(res_merchantsend,b_flag,arr,m);
			gid17_write_res(result,m);
			break;
			
		case "c_0" : 
		case "c_1" : 
		case "c_2" : 
		case "c_3" : 
			if(Number(gid17_input_number.value) == 1){
				gid17_write_res(TJS.Const.CelebrationResource[gid17_TypeResSelect.value].r,
					TJS.Const.CelebrationResource[gid17_TypeResSelect.value].run_twice);
			}
			break;
			
		default:
			gid17_SaveBigCelebration.disabled = true;
			let target = false;
			if(window.gid17_obj_target["res"]) target = true;
			let send_times = gid17_getx2();
			let num_troops = Number(gid17_input_number.value);
			let res_troops = [
											(gid17_TroopRes[1] * num_troops - (target ? gid17_obj_target["res"][0] : 0)) / send_times,
											(gid17_TroopRes[2] * num_troops - (target ? gid17_obj_target["res"][1] : 0)) / send_times,
											(gid17_TroopRes[3] * num_troops - (target ? gid17_obj_target["res"][2] : 0)) / send_times,
				gid17_noncrop.checked ? 0 :((gid17_TroopRes[4] * num_troops - (target ? gid17_obj_target["res"][3] : 0)) / send_times),
			];
			for(let i = 0; i < 4; i++) 
			{
				if(res_troops[i] < 0) res_troops[i] = 0;
				else res_troops[i] = Math.floor(res_troops[i]);
			}
			gid17_write_res(res_troops,send_times);
			break;
	}
}

function gid17_getx2(){
	let result = 1;
	let e_run_twice = document.getElementById("x2");
	if(e_run_twice) {
		if(e_run_twice.tagName == "SELECT") result = Number(e_run_twice.value);
		else if(e_run_twice.checked) result = 2;
	}
	return result;
}

function gid17_findmaxtroops(){
	let maxtroops = 99999999;
	let send_times = gid17_getx2();
	let merchantCapacityValue = Number(document.getElementById("merchantCapacityValue").innerText) * send_times;
	let target = false;
	if (window.gid17_obj_target) target = true;
	let target_stogare = target ? Math.floor(Number(gid17_obj_target["storage"])* Number(window.slider_target.value) / 100) : 99999999;
	let target_granary = target ? Math.floor(Number(gid17_obj_target["granary"])* Number(window.slider_target.value) / 100) : 99999999;
	
	let res_current = [];
	for(let i = 0; i < 4; i++){
		let sto = i != 3 ? TJS.CurrentData.village_object["storage"] : TJS.CurrentData.village_object["granary"];
		let res_curr_save = Math.floor(Number(window.slider_current.value) * sto / 100);		
		res_current.push(res_curr_save <=  TJS.CurrentData.village_object.res[i] ?
			TJS.CurrentData.village_object.res[i] - res_curr_save : 0 );
	}
	
	let res_target = target ? window.gid17_obj_target["res"] : [ 0, 0 , 0 ,0 ];
	//gid17_TroopRes (i+1)
	let storage_target = [target_stogare , target_stogare, target_stogare , target_granary];
	let res_for_a_troop = 0;
	let total_res_target = 0;
	for(let i = 0; i < 4; i++){
		if(3 == i && gid17_noncrop.checked) break;
		res_for_a_troop += gid17_TroopRes[i+1];
		let total_res_2village = res_current[i] + res_target[i];
		if(total_res_2village > storage_target[i]) total_res_2village = storage_target[i];//fix
		total_res_target += res_target[i];
		let maxtroop_res = Math.floor(total_res_2village / gid17_TroopRes[i+1]);
		if(maxtroop_res < maxtroops) maxtroops = maxtroop_res;//find min
	}
	let res_merchanWillCarry = res_for_a_troop * maxtroops - total_res_target;
	while(merchantCapacityValue < res_merchanWillCarry){
		maxtroops--;
		res_merchanWillCarry = 0;
		for(let i = 0; i < 4; i++)
		{
			if(3 == i && gid17_noncrop.checked) break;
			let res_need = maxtroops * gid17_TroopRes[i+1];
			if(res_need > res_target[i]) res_merchanWillCarry += (res_need - res_target[i]);
		}
	}
	
	gid17_label_max.innerText = "/" + maxtroops.toString();
	gid17_input_number.max = maxtroops;
}

let gid17_clear_select_text =  "%s - [id:%s res:%s,%s,%s,%s]";
let gid17_clear_select_value =  "%s_%s_%s_%s_%s";

function gid17_clear_select(item){//[village name, href ,res:[r1,r2,r3,r4]]
	let e_option = document.createElement("option");
	if(!item)
	{
		e_option.text = "All";
		e_option.value = "-1";
	}
	else
	{
		let v_id = TJS.getParameterByName(item[1],"newdid");
		if(!v_id || v_id == '') v_id = TJS.getParameterByName(item[1],"x") + "|" + TJS.getParameterByName(item[1],"y");
		e_option.text = gid17_clear_select_text.format(item[0],v_id,item[2][0],item[2][1],item[2][2],item[2][3])
		e_option.value = gid17_clear_select_value.format(v_id,item[2][0],item[2][1],item[2][2],item[2][3]);
	}
	return e_option;
}

function gid17_clear_onclick(){
	if(window.gid17_select_clear.value == "-1") {
		let deleteAllTradeRoutes = document.getElementById("deleteAllTradeRoutes");
		if(deleteAllTradeRoutes) {
			deleteAllTradeRoutes.click();
			return;
		}
	}
	if(window.confirm("Are you sure to clear trade routes?")){
		TJS.CurrentData.account_object[TJS.Const.gid17_village_DTR] = TJS.CurrentData.VillageId;
		TJS.CurrentData.account_object[TJS.Const.gid17_DTR_type_clear] = window.gid17_select_clear.value;
		TJS.SaveCurrentAccount();
		window.location.href = "/build.php?t=0&gid=17";//gid17_DTR_type_clear
	}
}
function gid17_clear(){
	let id = TJS.CurrentData.account_object[TJS.Const.gid17_village_DTR];
	let gid17_des_clear = TJS.CurrentData.account_object[TJS.Const.gid17_DTR_type_clear];
	if(id  && Number(id) != -1 && Number(id) == TJS.CurrentData.VillageId)	{
		let trading_routes = document.getElementById("trading_routes");
		if(trading_routes)		{
			let trs = trading_routes.getElementsByTagName("tr");
			for(let i = 1; i< trs.length; i++)			{
				let sel_trs = trs[i].getElementsByClassName("sel");
				if(sel_trs.length == 0) continue;
				if(gid17_des_clear == "-1"){
					sel_trs[0].getElementsByTagName("a")[0].click();
					return;
				}
				else{
					let curr_desc = trs[i].getElementsByClassName("desc")[0];
					let curr_href = curr_desc.getElementsByTagName("a")[0].getAttribute("href");
					
					let curr_newdid;
					let curr_r = [
								curr_desc.getElementsByClassName("r1")[0].parentElement.innerText,
								curr_desc.getElementsByClassName("r2")[0].parentElement.innerText,
								curr_desc.getElementsByClassName("r3")[0].parentElement.innerText,
								curr_desc.getElementsByClassName("r4")[0].parentElement.innerText
								];
					let target = gid17_des_clear.split("_");
					if(target[0].indexOf("|") < 0) curr_newdid = TJS.getParameterByName(curr_href,"newdid");
					else curr_newdid = TJS.getParameterByName(curr_href,"x") + "|" + TJS.getParameterByName(curr_href,"y");
					if(curr_newdid == target[0] && 
									curr_r[0] == target[1] && curr_r[1] == target[2] && 
									curr_r[2] == target[3] && curr_r[3] == target[4]	){
						sel_trs[0].getElementsByTagName("button")[0].click();
						return;
					}
				}
			}
		}
	}
	TJS.CurrentData.account_object[TJS.Const.gid17_village_DTR] = -1;
	TJS.SaveCurrentAccount();
}
function gid17_write_res(r,run_twice){
	let sumResources = 0;
	for(let i=0;i<4;i++){
		let e_r = document.getElementById("r" + (i + 1));
		e_r.value = r[i];
		sumResources += r[i];
	}
	document.getElementById("sumResources").innerText = sumResources;
	document.getElementById("merchantsNeededNumber").innerText 
		= Math.ceil(sumResources/Number(document.getElementById("addRessourcesLink1").innerText));
	
	let e_run_twice = document.getElementById("x2");
	if(e_run_twice){
		if(e_run_twice.tagName == "SELECT") e_run_twice.value = run_twice;
		else if(e_run_twice.tagName == "INPUT" && e_run_twice.getAttribute("type") == "checkbox"){
			switch(run_twice){
				case 2:e_run_twice.checked = true; break;
				default: e_run_twice.checked = false; break;
			}
		}
	}
}

function troop_train(){//gid 13 19 20 29 30 21 46
	//let contract = document.getElementById("contract");
	let e_div = document.createElement("div");
	e_div.setAttribute("style","margin-bottom: 15px;");
	let build_value = document.getElementById("build_value");
	if(build_value == null)
	{
		let upgradeHeader = TJS.CurrentData.e_build.getElementsByClassName("upgradeHeader")[0];
		upgradeHeader.insertAdjacentElement("afterbegin",e_div);
	}
	else
	{
		let tbody = build_value.getElementsByTagName("tbody")[0];
		tbody.insertAdjacentElement("afterbegin",e_div);
	}
	
	window.troop_train_checkbox = document.createElement("input");
	window.troop_train_checkbox.setAttribute("type","checkbox");
	window.troop_train_checkbox.checked = TJS.CurrentData.village_object[TJS.Const.LS_trooptrain_checkbox + TJS.CurrentData.Gid];
	TJS.InitCheckboxOnclick(troop_train_checkbox,TJS.Const.LS_trooptrain_checkbox + TJS.CurrentData.Gid,null,false);
	let e_checkbox_lb = document.createElement("label");
	e_checkbox_lb.innerText = "Show Time Training";
	e_checkbox_lb.setAttribute("style","border:none;color:black;padding: 3px;");
	e_checkbox_lb.appendChild(window.troop_train_checkbox);
	e_div.appendChild(e_checkbox_lb);
	
	read_time_gid_under_progress("troop_train");
	
	//fast click train
	let trainUnits = document.getElementsByClassName("trainUnits");
	if(trainUnits.length >0)
	{
		let p = document.createElement("p");
		let div_fastclick = document.createElement("div");
		e_div.appendChild(div_fastclick);
		
		
		let label_fastclick = document.createElement("label");
		label_fastclick.innerText = "Fast click (train all):";
		window.fast_click_checkbox = document.createElement("input");
		fast_click_checkbox.setAttribute("type","checkbox");
		TJS.InitCheckboxOnclick(fast_click_checkbox,"fastclick_train",null,true);
		div_fastclick.appendChild(label_fastclick);
		label_fastclick.insertAdjacentElement("afterbegin",fast_click_checkbox);
		
		window.traintroop_actions = trainUnits[0].getElementsByClassName("action");
		for(let i = 0; i< traintroop_actions.length; i++)
		{
			let unit = traintroop_actions[i].getElementsByClassName("unit")[0];
			if(!unit) continue;
			let img_ = document.createElement("img");
			img_.setAttribute("src","img/x.gif");
			img_.setAttribute("style","margin-left:10px;margin-right:10px");
			img_.setAttribute("class",unit.getAttribute("class"));
			img_.setAttribute("onclick","fastclick_train_onclick(" + i + ")");
			div_fastclick.appendChild(img_);
		}
	}	
}
function fastclick_train_onclick(i){
	if(window.fast_click_checkbox.checked || confirm("Confirm train?"))
	{
		let e_a = traintroop_actions[Number(i)].getElementsByTagName("a");
		e_a[e_a.length-1].click();
		document.getElementById("s1").click();
	}
}

function gid24(){//Town Hall
	read_time_gid_under_progress("celebration");
}

function read_time_gid_under_progress(name){
	let under_progress = document.getElementsByClassName("under_progress");	
	if(under_progress.length == 1)
	{
		let durs = under_progress[0].getElementsByClassName("dur");		
		let e_time = durs[durs.length - 1].getElementsByClassName("timer")[0];
		let value_time = Number(e_time.getAttribute("value"));
		
		TJS.CurrentData.village_object[name + "_" + TJS.CurrentData.Gid] = TJS.CurrentSec() + value_time;		
	}else TJS.CurrentData.village_object[name + "_" + TJS.CurrentData.Gid] = 1;
	TJS.SaveCurrentVillage();
}


let gid17_base_uri_traderoute = "/build.php?did_dest=%s&r1=%s&r2=%s&r3=%s&r4=%s&trade_route_mode=%s&hour=%s&minute=%s&repeat=%s&every=%s&gid=17&a=1&t=0&trid=0&option=256";

function TJS_Build(){
	gid17_clear();
	//gid17_CreateTradeRoutes_load();
	//TroopsResource_load();
	if(TJS.CurrentData.e_build) Get_gid();
}
$(document).ready(TJS_Build);