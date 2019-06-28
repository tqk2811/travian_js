function Get_gid(){
	build_gid();
	switch(TJS.CurrentData.Gid)
	{
		case 17: gid17(); return;//market
		case 16: gid16(); return;//rallypoint
		case 15: gid15(); return;//main building
		case 24: gid24(); return;//Town Hall
		
		case 19: //barrack
		case 20: //stable
		case 21: //workshop
		case 29: //g barrack
		case 30: troop_train(); return; //g stable
		
		default: return;
	}
}
function build_gid(){
	window.e_merge = { isOn : false, e_text : null };
	if(TJS.CurrentData.Gid == 16 && TJS.getParameterByName(window.location.href,"m") !== null && TJS.getParameterByName(window.location.href,"tt") == "2")
		{
			window.e_merge.isOn = true;
			window.setInterval(function(){ 
						var e_resourceWrappers = document.getElementsByClassName("inlineIconList resourceWrapper");
						if(e_resourceWrappers.length == 1) build_gid_TotalRes(e_resourceWrappers[0]);
					},
				500);
		}			
	else 
	{
		var e_resourceWrappers = document.getElementsByClassName("inlineIconList resourceWrapper");
		for(var i =0; i < e_resourceWrappers.length; i++) build_gid_TotalRes(e_resourceWrappers[i]);
	}
}

function build_gid_TotalRes(e){
	var ress = e.getElementsByTagName("span");
	if(ress.length >= 4)
	{
		var total_ = 0;
		for(var i =0; i < 4; i++) total_ += Number.parseInt(ress[i].innerText);
		var parent_ress = ress[0].parentNode.parentNode;
		if(window.e_merge.isOn)
		{
			if(document.getElementById("e_merge") == null)
			{
				if (window.e_merge.e_text == null) 
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
			var total_element =  document.createElement("div");
			total_element.innerText = "Total: " + total_;
			e.appendChild(total_element);//e.insertAdjacentElement("afterend",total_element);
		}		
	}
	//19,20,21,36: barrack,stable,workshop,traper
	if(((TJS.CurrentData.Gid >= 19 && TJS.CurrentData.Gid <= 21) || TJS.CurrentData.Gid == 36) && e.parentElement.getAttribute("class") == "details")
	{
		var e_imgs = e.parentElement.getElementsByTagName("img");
		var e_imgs_unit = e.parentElement.getElementsByClassName("unit");
		if(e_imgs.length == 1 && e_imgs_unit.length == 1 && e_imgs[0] == e_imgs_unit[0])
		{
			var class_unit_strings = e_imgs[0].getAttribute("class").split(" ");
			var name_unit = e_imgs[0].getAttribute("alt");
			if(class_unit_strings.length == 2)
			{				
				var account_object = TJS.LSGetObject("account",TJS.CurrentData.UserName);
				if(account_object["troop"] == undefined) account_object["troop"] = {};
				
				var unit_id = Number(class_unit_strings[1].substring(1));
				var unit_tribe = "tribe_error";
				if 		(unit_id >=  1 && unit_id <= 10) unit_tribe = "Roman";
				else if (unit_id >= 11 && unit_id <= 20) unit_tribe = "Teuton";
				else if ((unit_id >= 21 && unit_id <= 30) | unit_id == 99) unit_tribe = "Gaul";
				else if (unit_id >= 51 && unit_id <= 60) unit_tribe = "Egypt";
				else if (unit_id >= 61 && unit_id <= 70) unit_tribe = "Huns";
				var e_value = e.getElementsByClassName("value");
				var arr = [];
				arr.push(name_unit + " (" + unit_tribe + ")");
				for(var i = 0; i < 4; i++)arr.push(Number(e_value[i].innerText));
				account_object["troop"][class_unit_strings[1]] = arr;
				TJS.LSSaveObject("account",TJS.CurrentData.UserName,account_object);
			}
		}
	}
}

function gid15(){//main building
	var demolish = document.getElementById("demolish");
	if(demolish !== null){
		var timers_ = demolish.getElementsByClassName("timer");
		if(timers_.length == 1)	TJS.CurrentData.village_object["demolish"] = Number(timers_[0].getAttribute("value")) + TJS.CurrentSec();
		else TJS.CurrentData.village_object["demolish"] = 0;			
		TJS.SaveCurrentVillage();
	}
}

function gid16(){//rallypoint
	if(TJS.CurrentData.tabActives !== null){
		var tabItem = TJS.CurrentData.tabActives[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("tt=99")>=0){
			var list_raidlist = [];
			var listEntrys = document.getElementById("raidList").getElementsByClassName("listEntry");
			for(var i = 0; i < listEntrys.length; i++) 
				list_raidlist.push([
									Number(listEntrys[i].id.slice(4,listEntrys[i].id.length)),
									listEntrys[i].getElementsByClassName("listTitleText")[0].innerText
									])
			localStorage.setItem(TJS.CurrentData.UserName + "_list_raidlist",JSON.stringify(list_raidlist));//
			
			var e_bt_CheckAllGreenAttack = document.createElement("button");
			e_bt_CheckAllGreenAttack.setAttribute("style","background-color:green;border:none;color:white;padding: 3px; margin: 3px;");
			e_bt_CheckAllGreenAttack.innerText = "Check All Green Attacks";
			e_bt_CheckAllGreenAttack.setAttribute("onclick","gid16_bt_CheckAllGreenAttack_onclick()");
			
			
			window.gid16_cb_raid = document.createElement("input");//
			gid16_cb_raid.setAttribute("type","checkbox");
			var e_LB_raid = document.createElement("label");
			e_LB_raid.innerText = "Start raids";			
			e_LB_raid.setAttribute("style","border:none;color:black;padding: 3px;");
			e_LB_raid.appendChild(window.gid16_cb_raid);
			
			window.gid16_cb_attacking = document.createElement("input");
			gid16_cb_attacking.setAttribute("type","checkbox");
			var e_LB_attacking = document.createElement("label");			
			e_LB_attacking.innerText = "Don't raid attacking";
			e_LB_attacking.setAttribute("style","border:none;color:black;padding: 3px;");
			e_LB_attacking.appendChild(window.gid16_cb_attacking);
			
			window.gid16_cb_yellow = document.createElement("input");//
			gid16_cb_yellow.setAttribute("type","checkbox");
			var e_LB_yellow = document.createElement("label");			
			e_LB_yellow.innerText = "Yellow";
			e_LB_yellow.setAttribute("style","border:none;color:black;padding: 3px;");
			e_LB_yellow.appendChild(window.gid16_cb_yellow);			
			
			window.gid16_cb_red = document.createElement("input");//
			gid16_cb_red.setAttribute("type","checkbox");
			var e_LB_red = document.createElement("label");			
			e_LB_red.innerText = "Red";			
			e_LB_red.setAttribute("style","border:none;color:black;padding: 3px;");			
			e_LB_red.appendChild(window.gid16_cb_red);
			
			
			var e_div = document.createElement("div");
			e_div.appendChild(e_bt_CheckAllGreenAttack);
			e_div.appendChild(e_LB_raid);
			e_div.appendChild(e_LB_attacking);			
			e_div.appendChild(e_LB_yellow);
			e_div.appendChild(e_LB_red);
			TJS.CurrentData.e_build.insertAdjacentElement("afterbegin",e_div);
		}
		else if(tabItem.getAttribute("href").indexOf("tt=2")>=0)
		{
			//var e_class_catas = document.getElementsByClassName("cata");
			//if(e_class_catas.length == 1) gid16_attack_multiwave();
			var rallyPointButtonsContainer = document.getElementById("rallyPointButtonsContainer");
			if(rallyPointButtonsContainer !== null) gid16_attack_multiwave();
		}
	}
}
function gid16_bt_CheckAllGreenAttack_onclick(){
	var e_listContents = document.getElementsByClassName("listContent");
	var count = 0;
	var e_temp = null;
	for(var i =0; i < e_listContents.length; i++)
		if(e_listContents[i].getAttribute("class").indexOf("hide") == -1)
		{
			e_temp = e_listContents[i];
			count++;
			var e_slotRows = e_listContents[i].getElementsByClassName("slotRow");
			for(var j = 0; j< e_slotRows.length; j++)
			{				
				var e_img_attack = e_slotRows[j].getElementsByClassName("attack");
				var isAttacking = e_img_attack.length > 0;
				var isHistoryYellow = e_slotRows[j].getElementsByClassName("iReport2").length > 0;
				var isHistoryRed = e_slotRows[j].getElementsByClassName("iReport3").length > 0;
				
				var e_input = e_slotRows[j].getElementsByTagName("input");
				if(e_input !== null && 
						!(gid16_cb_attacking.checked && isAttacking ) &&
						!(isHistoryYellow && !gid16_cb_yellow.checked) &&
						!(isHistoryRed && !gid16_cb_red.checked)) e_input[0].checked = true;
			}
		}
	if(window.gid16_cb_raid.checked && count == 1 && e_temp !== null)
	{
		var e_bt = e_temp.getElementsByTagName("button");
		if(e_bt.length >1) e_bt[1].click();
	}
}

function gid16_attack_multiwave(){
	localStorage.setItem("attack_multiwave","0");
	var e_main = document.createElement("div");
	e_main.setAttribute("style","display: inline-block;");
	TJS.CurrentData.e_build.insertAdjacentElement("beforeend",e_main);

	window.gid16_BT_StartCata = document.createElement("button");
	gid16_BT_StartCata.setAttribute("style","background-color:green;border:none;color:white;padding: 3px; margin: 3px;");
	gid16_BT_StartCata.innerText = "Start multi-wave (first wave)";
	gid16_BT_StartCata.setAttribute("onclick","gid16_attack_multiwave_start()");
	e_main.appendChild(gid16_BT_StartCata);

	var e_p = document.createElement("p");
	e_main.appendChild(e_p);

	window.gid16_Input_AttackTrigger = document.createElement("input");
	gid16_Input_AttackTrigger.id = "gid16_Input_AttackTrigger";
	gid16_Input_AttackTrigger.type = "checkbox";
	gid16_Input_AttackTrigger.setAttribute("onclick","gid16_attack_multiwave_trigger()");
	e_main.appendChild(gid16_Input_AttackTrigger);

	var label_gid16_Input_AttackTrigger = document.createElement("label");
	label_gid16_Input_AttackTrigger.setAttribute("for","gid16_Input_AttackTrigger");
	label_gid16_Input_AttackTrigger.innerText = "Wait first wave";
	e_main.appendChild(label_gid16_Input_AttackTrigger);
	
	var e_p2 = document.createElement("p");
	e_main.appendChild(e_p2);
	
	//window.gid16_Input_delay = document.createElement("input");
	//gid16_Input_delay.setAttribute("id","gid16_Input_delay")
	//gid16_Input_delay.setAttribute("min",0);
	//gid16_Input_delay.setAttribute("max",5000);
	//gid16_Input_delay.setAttribute("type","number");
	//gid16_Input_delay.setAttribute("value",100);
	//gid16_Input_delay.setAttribute("maxlength",4);
	//gid16_Input_delay.setAttribute("style","padding:3px;margin:3px;");
	//gid16_Input_delay.hidden = true;
	//e_main.appendChild(gid16_Input_delay);
	
	//window.gid16_Label_Delay = document.createElement("label");
	//gid16_Label_Delay.setAttribute("id","label_gid16_Input_delay");
	//gid16_Label_Delay.setAttribute("for","gid16_Input_delay");
	//gid16_Label_Delay.innerText = "Delay After First Wave (ms)";
	//gid16_Label_Delay.hidden = true;
	//e_main.appendChild(gid16_Label_Delay);
	
	//
	var select_kata2s = document.getElementsByName("kata2");
	if(select_kata2s.length == 1) select_kata2s[0].value = 99;
}
function gid16_attack_multiwave_start(){
	if(window.confirm("Start?"))
	{
		var bt_ok = document.getElementById("btn_ok");
		bt_ok.click();
		localStorage.setItem("attack_multiwave","1");		
	}
}
function gid16_attack_multiwave_trigger(){
	if(gid16_Input_AttackTrigger.checked) 
	{
		localStorage.setItem("attack_multiwave","0");
		window.gid16_Interval_id = window.setInterval(gid16_attack_multiwave_trigger_Interval,10);
		gid16_BT_StartCata.hidden = true;
		//gid16_Label_Delay.hidden = false;
		//gid16_Input_delay.hidden = false;		
	}
	else 
	{
		if(gid16_Interval_id !== undefined) window.clearInterval(gid16_Interval_id);
		gid16_BT_StartCata.hidden = false;
		//gid16_Label_Delay.hidden = true;
		//gid16_Input_delay.hidden = true;
	}
}
function gid16_attack_multiwave_trigger_Interval(){
	var attack_multiwave_flag = localStorage.getItem("attack_multiwave");
	if(attack_multiwave_flag !== null && attack_multiwave_flag == "1")
	{		
		var bt_ok = document.getElementById("btn_ok");
		window.clearInterval(gid16_Interval_id);
		//sleep(Number(gid16_Input_delay.value));
		bt_ok.click();
	}
}


function gid17(){//market
	if(TJS.CurrentData.tabActives !== null){
		var tabItem = TJS.CurrentData.tabActives[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("t=0")>=0){//manager
			var trading_routes = document.getElementById("trading_routes");
			if(trading_routes !== null){
				var button_clear = document.createElement("button");
				button_clear.innerText = "Clear All Trade Routes";
				button_clear.setAttribute("style","background-color:red;border:none;color:white;padding: 3px;");
				button_clear.setAttribute("onclick","gid17_clear_onclick()");
				trading_routes.insertAdjacentElement("beforebegin",button_clear);
				
				var arr_traderoute_desc = [];			
				var trading_routes = document.getElementById("trading_routes");
				if(trading_routes !== null){
					var desc = trading_routes.getElementsByClassName("desc");
					for( var i = 0; i < desc.length; i++){
						var a_desc = desc[i].getElementsByTagName("a");
						var r = [
									desc[i].getElementsByClassName("r1")[0].parentElement.innerText,
									desc[i].getElementsByClassName("r2")[0].parentElement.innerText,
									desc[i].getElementsByClassName("r3")[0].parentElement.innerText,
									desc[i].getElementsByClassName("r4")[0].parentElement.innerText
								];
						if(a_desc.length > 0){
							var href_a_desc = a_desc[0].getAttribute("href");
							var flag_add = true;
							for(var j = 0; j< arr_traderoute_desc.length; j++)
								if(arr_traderoute_desc[j][1] == href_a_desc && 
									r[0] == arr_traderoute_desc[j][2][0] && r[1] == arr_traderoute_desc[j][2][1] &&
									r[2] == arr_traderoute_desc[j][2][2] && r[3] == arr_traderoute_desc[j][2][3]
									) { flag_add = false; break; }								
							if(flag_add) arr_traderoute_desc.push([a_desc[0].innerText,href_a_desc,r]);			
						}
					}
				}
				
				window.gid17_select_clear = document.createElement("select");
				gid17_select_clear.add(gid17_clear_select(null));
				arr_traderoute_desc.forEach(function(child){gid17_select_clear.add(gid17_clear_select(child));});
				trading_routes.insertAdjacentElement("beforebegin",gid17_select_clear);
			}

			var e_tradeRouteEdit = document.getElementById("tradeRouteEdit");
			if(false && e_tradeRouteEdit !== null && Number(TJS.getParameterByName(window.location.href,"option")) == 1)//disable create multi traderoute
			{
				var timeSelector = document.getElementsByClassName("timeSelector")[0];
				
				var div_timeend = document.createElement("div");
				timeSelector.insertAdjacentElement("afterend",div_timeend);
				div_timeend.setAttribute("style","display: flex;background: rgb(220, 247, 197)");
				
				div_timeend.innerHTML = "<div><label>Time end:</label></div><div><input size=\"2\" type=\"number\" length=\"10px\" style=\"height:22px;width:53px;\" placeholder=\"hh\" min=\"0\" max=\"24\" value=\"24\" id=\"hour_end\"><span>:</span><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;   width: 53px;\" placeholder=\"mm\" min=\"0\" max=\"59\" value=\"00\" id=\"minute_end\"></div><div><label>------&gt; with step :</label></div><div><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;width: 53px;\" placeholder=\"hh\" min=\"0\" max=\"24\" value=\"1\" id=\"hour_step\"><span>:</span><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;width: 53px;\" placeholder=\"mm\" min=\"0\" max=\"59\" value=\"00\" id=\"minute_step\"></div><div onclick=\"gid17_CreateTradeRoutes_click()\" style=\"background-color:green;border:n`one;color:white;padding:3px;margin:3px;\">Create TradeRoutes</div>"
			}
		}
		else if(tabItem.getAttribute("href").indexOf("t=5")>=0){//send res
			var marketSend_ = document.getElementById("marketSend");
			if(marketSend_ !== null){
				var p_button = document.createElement("p1");
				marketSend_.insertAdjacentElement("beforebegin",p_button);

				var button_Smallcelebration = document.createElement("button");
				button_Smallcelebration.innerText = "Small celebration";
				button_Smallcelebration.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Smallcelebration.setAttribute("onclick","gid17_celebration_click([6400,6650,5940,1340],1)");

				var button_Bigcelebration = document.createElement("button");
				button_Bigcelebration.innerText = "Big celebration";
				button_Bigcelebration.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Bigcelebration.setAttribute("onclick","gid17_celebration_click([29700,33250,32000,6700],1)");

				var button_Bigcelebration2 = document.createElement("button");
				button_Bigcelebration2.innerText = "Big celebration/2";
				button_Bigcelebration2.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Bigcelebration2.setAttribute("onclick","gid17_celebration_click([14850,16625,16000,3350],2)");

				var button_Bigcelebration3 = document.createElement("button");
				button_Bigcelebration3.innerText = "Big celebration/3";
				button_Bigcelebration3.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Bigcelebration3.setAttribute("onclick","gid17_celebration_click([9900,11084,10667,2234],3)");

				var br = document.createElement("br");
				
				window.gid17_TroopResSelect = document.createElement("select");
				gid17_TroopResSelect.setAttribute("style","width:150px");	
				gid17_TroopResSelect.appendChild(gid17_createoption("-1",""));// empty option
				
				gid17_TroopResSelect.appendChild(gid17_createoption("b_0","Balance current village"));
				gid17_TroopResSelect.appendChild(gid17_createoption("b_1","Balance target village"));
				
				gid17_TroopResSelect.appendChild(gid17_createoption("c_0","Small Celebration"));
				gid17_TroopResSelect.appendChild(gid17_createoption("c_1","Big Celebration"));
				gid17_TroopResSelect.appendChild(gid17_createoption("c_2","Big Celebration / 2"));
				gid17_TroopResSelect.appendChild(gid17_createoption("c_3","Big Celebration / 3"));
				
				var account_object = TJS.LSGetObject("account",TJS.CurrentData.UserName);
				if(account_object["troop"] != undefined){
					var keys = Object.keys(account_object["troop"]);
					for(var i = 0; i < keys.length; i++)
						gid17_TroopResSelect.appendChild(gid17_createoption(keys[i],account_object["troop"][keys[i]][0]));
					gid17_TroopResSelect.setAttribute("onchange","gid17_TroopResSelect_onchange()");
				}				
				
				window.gid17_input_number_troop = document.createElement("input");
				gid17_input_number_troop.setAttribute("type","number");
				gid17_input_number_troop.setAttribute("style","width:50px");
				gid17_input_number_troop.setAttribute("min","0");
				gid17_input_number_troop.setAttribute("max","0");
				gid17_input_number_troop.setAttribute("onchange","gid17_input_number_troop_onchange()");
				
				window.gid17_label_max_troop = document.createElement("label");
				gid17_label_max_troop.innerText = "/0";
				gid17_label_max_troop.onclick = function(){
															gid17_input_number_troop.value = gid17_input_number_troop.max;
															gid17_input_number_troop_onchange();															
														};
				gid17_label_max_troop.setAttribute("style","margin-left:3px");
				
				window.gid17_noncrop = document.createElement("input");
				gid17_noncrop.setAttribute("type","checkbox");
				gid17_noncrop.setAttribute("id","gid17_noncrop");
				gid17_noncrop.setAttribute("onchange","gid17_findmaxtroops()");
				gid17_noncrop.setAttribute("style","margin-left:3px");
				
				var label_noncrop = document.createElement("label");
				label_noncrop.innerText = "No crop";
				label_noncrop.onclick = function(){gid17_noncrop.checked = !gid17_noncrop.checked;};
				
				window.gid17_SaveBigCelebration = document.createElement("input");
				gid17_SaveBigCelebration.setAttribute("type","checkbox");
				gid17_SaveBigCelebration.setAttribute("id","gid17_SaveBigCelebration");
				gid17_SaveBigCelebration.setAttribute("onchange","");///////////////////////
				gid17_SaveBigCelebration.setAttribute("style","margin-left:3px");
				
				var label_SaveBigCelebration = document.createElement("label");
				label_SaveBigCelebration.innerText = "Save Big Celebration";
				label_SaveBigCelebration.onclick = function(){gid17_SaveBigCelebration.checked = !gid17_SaveBigCelebration.checked;};
				
				
				
				p_button.appendChild(button_Smallcelebration);
				p_button.appendChild(button_Bigcelebration);
				p_button.appendChild(button_Bigcelebration2);
				p_button.appendChild(button_Bigcelebration3);
				p_button.appendChild(br);
				p_button.appendChild(gid17_TroopResSelect);
				p_button.appendChild(gid17_input_number_troop);
				p_button.appendChild(gid17_label_max_troop);
				p_button.appendChild(gid17_noncrop);
				p_button.appendChild(label_noncrop);
				p_button.appendChild(gid17_SaveBigCelebration);
				p_button.appendChild(label_SaveBigCelebration);
				
				gid17_TroopResSelect_onchange();
				//
				var datalist_villagename = TJS.CreateDataListVillageName();		
				marketSend_.insertAdjacentElement("afterend",datalist_villagename);
				var enterVillageName = document.getElementById("enterVillageName");
				enterVillageName.setAttribute("list","village_list");
				enterVillageName.onchange = gid17_enterVillageName;
			}
		}
	}
}

function gid17_enterVillageName(){
	
}
function gid17_createoption(value_,name){
	var e_option = document.createElement("option");
	e_option.value = value_;
	e_option.innerText = name;
	return e_option;
}

function gid17_TroopResSelect_onchange(){
	var account_object = TJS.LSGetObject("account",TJS.CurrentData.UserName);
	if(gid17_TroopResSelect.value == "" ||account_object["troop"] == undefined) return;
	window.gid17_TroopRes = account_object["troop"][gid17_TroopResSelect.value];
	gid17_findmaxtroops();
}

function gid17_input_number_troop_onchange(){
	var res_troops = [
						gid17_TroopRes[1]*gid17_input_number_troop.value,
						gid17_TroopRes[2]*gid17_input_number_troop.value,
						gid17_TroopRes[3]*gid17_input_number_troop.value,
						gid17_noncrop.checked ? 0 : gid17_TroopRes[4]*gid17_input_number_troop.value
	];
	gid17_celebration_click(res_troops,1);
}

function gid17_findmaxtroops(){
	var maxtroops = -1;
	var merchantCapacityValue = Number(document.getElementById("merchantCapacityValue").innerText);
	var total_res_for_troop = 0;
	for(var i = 0; i < 4; i++)// max troop res
	{
		var num = Math.floor(TJS.CurrentData.Resource[i]/gid17_TroopRes[i+1]);
		if(gid17_noncrop.checked && i == 3) break;
		total_res_for_troop += gid17_TroopRes[i+1];
		if(maxtroops == -1) maxtroops = num;
		if(num < maxtroops) maxtroops = num;
	}
	var max_troops_merchant = Math.floor(merchantCapacityValue/total_res_for_troop);
	if(max_troops_merchant < maxtroops) maxtroops = max_troops_merchant;
	
	gid17_label_max_troop.innerText = "/" + maxtroops.toString();
	gid17_input_number_troop.max = maxtroops;
}

var gid17_clear_select_text =  "%s - [id:%s res:%s,%s,%s,%s]";
var gid17_clear_select_value =  "%s_%s_%s_%s_%s";

function gid17_clear_select(item)//[village name, href ,res:[r1,r2,r3,r4]]
{
	var e_option = document.createElement("option");
	if(item == null)
	{
		e_option.text = "All";
		e_option.value = "-1";
	}
	else
	{
		var v_id = TJS.getParameterByName(item[1],"newdid");
		e_option.text = gid17_clear_select_text.format(item[0],v_id,item[2][0],item[2][1],item[2][2],item[2][3])
		e_option.value = gid17_clear_select_value.format(v_id,item[2][0],item[2][1],item[2][2],item[2][3]);
	}
	return e_option;
}

function gid17_clear_onclick(){
	if(window.confirm("Are you sure to clear trade routes?")){
		localStorage.setItem("Flag_deleteAll_Trading_routes",TJS.CurrentData.VillageId);
		localStorage.setItem("gid17_des_clear",window.gid17_select_clear.value);
		window.location.href = "/build.php?t=0&gid=17";
	}
}
function gid17_clear(){
	var id = localStorage.getItem("Flag_deleteAll_Trading_routes");
	var gid17_des_clear = localStorage.getItem("gid17_des_clear");
	if(id !== null && Number(id) != -1 && Number(id) == TJS.CurrentData.VillageId)	{
		var trading_routes = document.getElementById("trading_routes");
		if(trading_routes !== null)		{
			var trs = trading_routes.getElementsByTagName("tr");
			for(var i = 1; i< trs.length; i++)			{
				var sel_trs = trs[i].getElementsByClassName("sel");
				if(sel_trs.length == 0) continue;
				if(gid17_des_clear == "-1"){
					sel_trs[0].getElementsByTagName("a")[0].click();
					return;
				}
				else{
					var curr_desc = trs[i].getElementsByClassName("desc")[0];
					var curr_href = curr_desc.getElementsByTagName("a")[0].getAttribute("href");
					
					var curr_newdid = TJS.getParameterByName(curr_href,"newdid");
					var curr_r = [
								curr_desc.getElementsByClassName("r1")[0].parentElement.innerText,
								curr_desc.getElementsByClassName("r2")[0].parentElement.innerText,
								curr_desc.getElementsByClassName("r3")[0].parentElement.innerText,
								curr_desc.getElementsByClassName("r4")[0].parentElement.innerText
								];
					var target = gid17_des_clear.split("_");
					
					if(curr_newdid == target[0] && 
									curr_r[0] == target[1] && curr_r[1] == target[2] && 
									curr_r[2] == target[3] && curr_r[3] == target[4]	){
						sel_trs[0].getElementsByTagName("a")[0].click();
						return;
					}
				}
			}
		}
	}
	localStorage.setItem("Flag_deleteAll_Trading_routes",-1);
}
function gid17_celebration_click(r,run_twice){
	var sumResources = 0;
	for(var i=0;i<4;i++){
		var e_r = document.getElementById("r" + (i + 1));
		e_r.value = r[i];
		sumResources += r[i];
	}
	document.getElementById("sumResources").innerText = sumResources;
	document.getElementById("merchantsNeededNumber").innerText 
		= Math.ceil(sumResources/Number(document.getElementById("addRessourcesLink1").innerText));
	
	var e_run_twice = document.getElementById("x2");
	if(e_run_twice.tagName == "SELECT") e_run_twice.selectedIndex = run_twice-1;
	else if(e_run_twice.tagName == "INPUT" && e_run_twice.getAttribute("type") == "checkbox"){
		switch(run_twice){
			case 2:e_run_twice.checked = true; break;
			default: e_run_twice.checked = false; break;
		}
	}
}

function troop_train(){//gid 19 20 29 30 21
	//var contract = document.getElementById("contract");
	var e_div = document.createElement("div");
	build.insertAdjacentElement("afterbegin",e_div);
	e_div.setAttribute("style","margin-bottom: 10px;");
	
	window.troop_train_checkbox = document.createElement("input");
	window.troop_train_checkbox.setAttribute("type","checkbox");
	window.troop_train_checkbox.checked = TJS.CurrentData.village_object[TJS.Const.LS_trooptrain_checkbox + TJS.CurrentData.Gid];
	window.troop_train_checkbox.onchange = function()
		{	TJS.CurrentData.village_object[TJS.Const.LS_trooptrain_checkbox + TJS.CurrentData.Gid] = window.troop_train_checkbox.checked;
			TJS.SaveCurrentVillage();	}
	var e_checkbox_lb = document.createElement("label");
	e_checkbox_lb.innerText = "Show Time Training";
	e_checkbox_lb.setAttribute("style","border:none;color:black;padding: 3px;");
	e_checkbox_lb.appendChild(window.troop_train_checkbox);
	e_div.appendChild(e_checkbox_lb);
	
	read_time_gid_under_progress("troop_train");
	
	//fast click train
	var trainUnits = document.getElementsByClassName("trainUnits");
	if(trainUnits.length >0)
	{
		var p = document.createElement("p");
		var div_fastclick = document.createElement("div");
		e_div.appendChild(div_fastclick);
		
		
		var label_fastclick = document.createElement("label");
		var fastclick_ischeck = localStorage.getItem("fastclick_train") == "true" ? "checked" : "";
		label_fastclick.innerHTML = "<input type=\"checkbox\" " + fastclick_ischeck +" id=\"fastclick\" onclick=\"fastclick_checkedchange(this)\">Fast click (train all):"
		div_fastclick.appendChild(label_fastclick);
		
		window.traintroop_actions = trainUnits[0].getElementsByClassName("action");
		for(var i = 0; i< traintroop_actions.length; i++)
		{
			var unit = traintroop_actions[i].getElementsByClassName("unit")[0];
			if(unit === undefined) continue;
			var img_ = document.createElement("img");
			img_.setAttribute("src","img/x.gif");
			img_.setAttribute("style","margin-left:10px;margin-right:10px");
			img_.setAttribute("class",unit.getAttribute("class"));
			img_.setAttribute("onclick","fastclick_train_onclick(" + i + ")");
			div_fastclick.appendChild(img_);
		}
	}	
}
function fastclick_checkedchange(e){
	localStorage.setItem("fastclick_train",e.checked);
}
function fastclick_train_onclick(i){
	var fastclick_ischeck = document.getElementById("fastclick");	
	if(fastclick_ischeck.checked || confirm("Confirm train?"))
	{
		var e_a = traintroop_actions[Number(i)].getElementsByTagName("a");
		e_a[e_a.length-1].click();
		document.getElementById("s1").click();
	}
}

function gid24(){//Town Hall
	read_time_gid_under_progress("celebration");
}

function read_time_gid_under_progress(name){
	var under_progress = document.getElementsByClassName("under_progress");	
	if(under_progress.length == 1)
	{
		var durs = under_progress[0].getElementsByClassName("dur");		
		var e_time = durs[durs.length - 1].getElementsByClassName("timer")[0];
		var value_time = Number(e_time.getAttribute("value"));
		
		TJS.CurrentData.village_object[name + "_" + TJS.CurrentData.Gid] = TJS.CurrentSec() + value_time;		
	}else TJS.CurrentData.village_object[name + "_" + TJS.CurrentData.Gid] = 0;
	TJS.SaveCurrentVillage();
}


var gid17_base_uri_traderoute = "/build.php?did_dest=%s&r1=%s&r2=%s&r3=%s&r4=%s&trade_route_mode=%s&hour=%s&minute=%s&repeat=%s&every=%s&gid=17&a=1&t=0&trid=0&option=256";
gid17_clear();
//gid17_CreateTradeRoutes_load();
//TroopsResource_load();
if(TJS.CurrentData.e_build !== null) Get_gid();