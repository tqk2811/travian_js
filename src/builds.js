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
				var account_object = TJS.CurrentData.account_object;
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
				TJS.SaveCurrentAccount();
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
		if(tabItem.getAttribute("href").indexOf("tt=99")>=0){//raidList
			var raidlists = [];
			var listEntrys = document.getElementById("raidList").getElementsByClassName("listEntry");
			for(var i = 0; i < listEntrys.length; i++) 
				raidlists.push({
									id: Number(listEntrys[i].id.slice(4,listEntrys[i].id.length)),
									name: listEntrys[i].getElementsByClassName("listTitleText")[0].innerText
								});
			TJS.CurrentData.account_object["raidlists"] = raidlists;
			TJS.SaveCurrentAccount();
			
			var e_bt_CheckAllGreenAttack = document.createElement("button");
			e_bt_CheckAllGreenAttack.setAttribute("style","background-color:green;border:none;color:white;padding: 3px; margin: 3px;");
			e_bt_CheckAllGreenAttack.innerText = "Check All Green Attacks";
			e_bt_CheckAllGreenAttack.setAttribute("onclick","gid16_bt_CheckAllGreenAttack_onclick()");			
			
			window.gid16_cb_raid = document.createElement("input");//
			gid16_cb_raid.setAttribute("type","checkbox");
			TJS.InitCheckboxOnclick(gid16_cb_raid,"gid16_cb_raid",null,true);
			var e_LB_raid = document.createElement("label");
			e_LB_raid.innerText = "Start raids";			
			e_LB_raid.setAttribute("style","border:none;color:black;padding: 3px;");
			e_LB_raid.appendChild(window.gid16_cb_raid);
			
			window.gid16_cb_attacking = document.createElement("input");
			gid16_cb_attacking.setAttribute("type","checkbox");
			TJS.InitCheckboxOnclick(gid16_cb_attacking,"gid16_cb_attacking",null,true);
			var e_LB_attacking = document.createElement("label");			
			e_LB_attacking.innerText = "Don't raid attacking";
			e_LB_attacking.setAttribute("style","border:none;color:black;padding: 3px;");
			e_LB_attacking.appendChild(window.gid16_cb_attacking);
			
			window.gid16_cb_yellow = document.createElement("input");//
			gid16_cb_yellow.setAttribute("type","checkbox");
			TJS.InitCheckboxOnclick(gid16_cb_yellow,"gid16_cb_yellow",null,true);
			var e_LB_yellow = document.createElement("label");			
			e_LB_yellow.innerText = "Yellow";
			e_LB_yellow.setAttribute("style","border:none;color:black;padding: 3px;");
			e_LB_yellow.appendChild(window.gid16_cb_yellow);			
			
			window.gid16_cb_red = document.createElement("input");//
			gid16_cb_red.setAttribute("type","checkbox");
			TJS.InitCheckboxOnclick(gid16_cb_red,"gid16_cb_red",null,true);
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
		}else if(tabItem.getAttribute("href").indexOf("tt=2")>=0){
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
				var e_carry = TJS.CurrentData.e_build.getElementsByClassName("carry");
				if(e_carry.length == 1) e_carry[0].remove();
								
				var div_market = document.createElement("div");
				marketSend_.insertAdjacentElement("beforebegin",div_market);				
				var div_left_market = document.createElement("div");
				div_left_market.setAttribute("style","float:left; width:45%;");				
				var div_right_market = document.createElement("div");
				div_right_market.setAttribute("style","float:right; width:55%;");
				div_market.appendChild(div_left_market);
				div_market.appendChild(div_right_market);
				div_market.insertAdjacentElement("afterend",TJS.DivClear());
				
				var br = document.createElement("br");				
				window.gid17_TypeResSelect = document.createElement("select");
				gid17_TypeResSelect.setAttribute("style","width:150px");	
				gid17_TypeResSelect.appendChild(gid17_createoption("-1",""));// empty option
				
				gid17_TypeResSelect.appendChild(gid17_createoption("b_0","Balance current village"));
				gid17_TypeResSelect.appendChild(gid17_createoption("b_1","Balance target village"));
				
				gid17_TypeResSelect.appendChild(gid17_createoption("c_0","Small Celebration"));
				gid17_TypeResSelect.appendChild(gid17_createoption("c_1","Big Celebration"));
				gid17_TypeResSelect.appendChild(gid17_createoption("c_2","Big Celebration / 2"));
				gid17_TypeResSelect.appendChild(gid17_createoption("c_3","Big Celebration / 3"));
				
				var account_object = TJS.CurrentData.account_object;
				if(account_object["troop"] != undefined){
					var keys = Object.keys(account_object["troop"]);
					for(var i = 0; i < keys.length; i++)
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
				
				window.gid17_noncrop = document.createElement("input");
				gid17_noncrop.setAttribute("type","checkbox");
				gid17_noncrop.setAttribute("id","gid17_noncrop");
				TJS.InitCheckboxOnclick(gid17_noncrop,"gid17_noncrop",gid17_TypeResSelect_onchange,true);
				gid17_noncrop.setAttribute("style","margin-left:3px");
				
				var label_noncrop = document.createElement("label");
				label_noncrop.innerText = "No crop";
				label_noncrop.onclick = function(){gid17_noncrop.checked = !gid17_noncrop.checked;};
				
				window.gid17_SaveBigCelebration = document.createElement("input");
				gid17_SaveBigCelebration.setAttribute("type","checkbox");
				gid17_SaveBigCelebration.setAttribute("id","gid17_SaveBigCelebration");
				gid17_SaveBigCelebration.setAttribute("onchange","gid17_TypeResSelect_onchange()");
				gid17_SaveBigCelebration.setAttribute("style","margin-left:3px");
				
				var label_SaveBigCelebration = document.createElement("label");
				label_SaveBigCelebration.innerText = "Save Big Celebration";
				label_SaveBigCelebration.onclick = function(){gid17_SaveBigCelebration.checked = !gid17_SaveBigCelebration.checked;};
				
				div_left_market.appendChild(gid17_noncrop);
				div_left_market.appendChild(label_noncrop);
				div_left_market.appendChild(gid17_SaveBigCelebration);
				div_left_market.appendChild(label_SaveBigCelebration);
				div_left_market.appendChild(br);
				div_left_market.appendChild(gid17_TypeResSelect);
				div_left_market.appendChild(gid17_input_number);
				div_left_market.appendChild(gid17_label_max);				
				
				gid17_TypeResSelect_onchange();
				
				///right zone
				var divr1 = document.createElement("div");
				var divr2 = document.createElement("div");
				var divr3 = document.createElement("div");
				div_right_market.appendChild(divr1);
				div_right_market.appendChild(divr2);
				div_right_market.appendChild(divr3);
				
				var target_label = document.createElement("label");
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
				
				var div_warehouse = document.createElement("div");
				div_warehouse.setAttribute("style","float:left; width:42%;")
				div_warehouse.innerText = "Warehouse:";
				window.gid17_target_storage = document.createElement("span");
				gid17_target_storage.innerText = 0;
				div_warehouse.appendChild(gid17_target_storage);
				
				var div_granary = document.createElement("div");
				div_granary.setAttribute("style","float:left; width:42%;")
				div_granary.innerText = "Granary:";
				window.gid17_target_granary = document.createElement("span");
				gid17_target_granary.innerText = 0;
				div_granary.appendChild(gid17_target_granary);
				
				var div_percent = document.createElement("div");
				div_percent.setAttribute("style","float:right; width:15%;");
				window.gid17_percent = document.createElement("span");
				gid17_percent.innerText = 0;
				div_percent.appendChild(gid17_percent);
				var label_percent = document.createElement("span");
				label_percent.innerText = "%";
				div_percent.appendChild(label_percent);
				
				divr3.appendChild(div_warehouse);
				divr3.appendChild(div_granary);				
				
				//---				
				var destination = document.getElementsByClassName("destination")[0];				
				var d_div = document.createElement("div");
				destination.appendChild(d_div);
				d_div.setAttribute("style","float:right; width:100%;");				
				window.slider_current = gid17_create_slider(d_div,true,TJS.CurrentData.VillageId);
				window.slider_target = gid17_create_slider(d_div,false,null);				
				//---
				
				TJS.Re_MarketPlace_sendRessources(gid17_MarketPlace_sendRessources_callback);				
				var datalist_villagename = TJS.CreateDataListVillageName();		
				marketSend_.insertAdjacentElement("afterend",datalist_villagename);
				gid17_MarketPlace_sendRessources_callback();
				gid17_enterVillageName();
			}
		}
	}
}
function gid17_create_slider(parent_,isMin,village_id){
	var v = isMin ? 0 : 95;
	if(village_id !== null){
		var village_obj = TJS.LSGetObject("village",village_id);
		if(village_obj[isMin ? "gid17min" : "gid17max"] !== undefined) v = village_obj[isMin ? "gid17min" : "gid17max"];
	}
	var div = document.createElement("div");
	parent_.appendChild(div);
	
	var label_p = document.createElement("label");
	label_p.innerText = v +"%";
	label_p.setAttribute("style","float:right; width:12%;");
	
	var slider = document.createElement("input");
	slider.setAttribute("min",0);	
	slider.setAttribute("value",v);
	slider.setAttribute("max",100);
	if(village_id !== null){ 
		slider.setAttribute("village_id",village_id);
		slider.disable = true;
	}
	slider.setAttribute("type","range");
	slider.setAttribute("class","slider");
	slider.setAttribute("title",isMin ? "Min Current" : "Max Target");
	slider.setAttribute("style","width:84%; height:16px;");
	slider.onchange = function(){
		var vi = this.getAttribute("village_id");
		if(vi !== null){
			label_p.innerText = this.value + "%";
			
			var vo = TJS.LSGetObject("village",vi);
			vo[isMin ? "gid17min" : "gid17max"] = this.value;
			TJS.LSSaveObject("village",vi,vo);
		}else this.disabled = true;
	};	
	div.appendChild(slider);
	div.appendChild(label_p);
	return slider;
}
function gid17_MarketPlace_icon_n_res(e_parent,class_name){
	var div_ = document.createElement("div");
	div_.setAttribute("style","float:left; width:24%;");
	e_parent.appendChild(div_);
	var e_i = document.createElement("i");
	e_i.setAttribute("class",class_name);
	var e_span = document.createElement("span");
	e_span.innerText = "0";
	div_.appendChild(e_i);
	div_.appendChild(e_span);
	return e_span;
}
function gid17_MarketPlace_sendRessources_callback(){
	enterVillageName.setAttribute("list","village_list");
	window.gid17_target_span.innerText = "";
	enterVillageName.onchange = gid17_enterVillageName;
}
function gid17_enterVillageName(){
	for(var i = 0; i < TJS.ListVillageName.length; i++){
		if(TJS.ListVillageName[i].name == enterVillageName.value){
			window.gid17_target_span.innerText = TJS.ListVillageName[i].id;
			var v_obj_target = TJS.LSGetObject("village",TJS.ListVillageName[i].id);
			if(v_obj_target["res"] !== undefined){
				window.gid17_r1.innerText = v_obj_target["res"][0];
				window.gid17_r2.innerText = v_obj_target["res"][1];
				window.gid17_r3.innerText = v_obj_target["res"][2];
				window.gid17_r4.innerText = v_obj_target["res"][3];
				window.gid17_timer.setAttribute("value",TJS.CurrentSec() - v_obj_target["updatein"]);
				window.gid17_timer.setAttribute("state","run");
				window.gid17_target_storage.innerText = v_obj_target["storage"];
				window.gid17_target_granary.innerText = v_obj_target["granary"];
				window.slider_target.setAttribute("village_id",TJS.ListVillageName[i].id);
				window.slider_target.disable = false;
				return;
			}			
		}
	}
	window.gid17_target_span.innerText = "";
	window.gid17_timer.setAttribute("state","stop");
	window.gid17_timer.innerText = "";
	window.gid17_r1.innerText = 0;
	window.gid17_r2.innerText = 0;
	window.gid17_r3.innerText = 0;
	window.gid17_r4.innerText = 0;
	window.slider_target.removeAttribute("village_id");
	window.slider_target.disable = true;
}
function gid17_createoption(value_,name){
	var e_option = document.createElement("option");
	e_option.value = value_;
	e_option.innerText = name;
	return e_option;
}
function gid17_TypeResSelect_onchange(){
	var account_object = TJS.CurrentData.account_object;
	switch(gid17_TypeResSelect.value)
	{
		case "-1"  : 
			gid17_input_number.max = 0;
			gid17_input_number.min = 0;
			gid17_input_number.value = 0;
			gid17_label_max.innerText = "/0";			
			break;
			
		case "b_0" : 
		case "b_1" : 
			gid17_input_number.max = Math.floor(Number(document.getElementById("merchantCapacityValue").innerText)/TJS.Const.RoundResource);
			gid17_input_number.min = 0;
			gid17_input_number.value = 0;
			gid17_label_max.innerText = "x" + TJS.Const.RoundResource;
			break;
		
		case "c_0" : 
		case "c_1" : 
		case "c_2" : 
		case "c_3" : 
			gid17_input_number.max = 1;
			gid17_input_number.min = 0;
			gid17_input_number.value = 1;
			gid17_label_max.innerText = "/1";
			gid17_write_res(TJS.Const.CelebrationResource[gid17_TypeResSelect.value].r,
					TJS.Const.CelebrationResource[gid17_TypeResSelect.value].run_twice);
			break;
		
		default:
			window.gid17_TroopRes = TJS.CurrentData.account_object["troop"][gid17_TypeResSelect.value];
			gid17_findmaxtroops();
			return;
	}
}
function gid17_input_number_onchange(){
	var b_flag = false;
	switch(gid17_TypeResSelect.value)
	{
		case "-1" : return;
		case "b_0" : b_flag = true;//true is balance current
		case "b_1" : 
			var v_obj_current = TJS.CurrentData.village_object;
			var v_obj_target = TJS.LSGetObject("village",window.gid17_target_span.innerText);
			if(v_obj_target["res"] == undefined) return;
			var merchantCapacityValue = Number(document.getElementById("merchantCapacityValue").innerText);
			var res_merchantsend = Number(window.gid17_input_number.value)*TJS.Const.RoundResource;
			
			var arr = [];
			for(var i = 0; i < 4; i++){
				var obj = {};
				if(window.gid17_SaveBigCelebration.checked) obj.rc = v_obj_current["res"][i] - TJS.Const.CelebrationResource["c_1"][i];
				else if(window.gid17_noncrop.checked && i == 3) obj.rc = 0;
				else obj.rc = v_obj_current["res"][i];
				obj.sc = i == 3 ? v_obj_current["granary"]: v_obj_current["storage"];
				if(!b_flag){
					obj.rt = v_obj_target["res"][i];
					obj.st =  i == 3 ? v_obj_target["granary"] : v_obj_target["storage"];
				}
				arr.push(obj);
			}			
			var result = TJS.BalanceRes(res_merchantsend,b_flag,arr);
			gid17_write_res(result,1);
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
			var res_troops = [
						gid17_TroopRes[1]*Number(gid17_input_number.value),
						gid17_TroopRes[2]*Number(gid17_input_number.value),
						gid17_TroopRes[3]*Number(gid17_input_number.value),
						gid17_noncrop.checked ? 0 : gid17_TroopRes[4]*Number(gid17_input_number.value)
			];
			gid17_write_res(res_troops,1);
			break;
	}
}
function gid17_findmaxtroops(){
	var maxtroops = -1;
	var merchantCapacityValue = Number(document.getElementById("merchantCapacityValue").innerText);
	var total_res_for_troop = 0;
	for(var i = 0; i < 4; i++)// max troop res
	{
		var num = Math.floor(TJS.CurrentData.village_object.res[i]/gid17_TroopRes[i+1]);
		if(gid17_noncrop.checked && i == 3) break;
		total_res_for_troop += gid17_TroopRes[i+1];
		if(maxtroops == -1) maxtroops = num;
		if(num < maxtroops) maxtroops = num;
	}
	var max_troops_merchant = Math.floor(merchantCapacityValue/total_res_for_troop);
	if(max_troops_merchant < maxtroops) maxtroops = max_troops_merchant;
	
	gid17_label_max.innerText = "/" + maxtroops.toString();
	gid17_input_number.max = maxtroops;
}

var gid17_clear_select_text =  "%s - [id:%s res:%s,%s,%s,%s]";
var gid17_clear_select_value =  "%s_%s_%s_%s_%s";

function gid17_clear_select(item){//[village name, href ,res:[r1,r2,r3,r4]]
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
		TJS.CurrentData.account_object[TJS.Const.gid17_village_DTR] = TJS.CurrentData.VillageId;
		TJS.CurrentData.account_object[TJS.Const.gid17_DTR_type_clear] = window.gid17_select_clear.value;
		TJS.SaveCurrentAccount();
		window.location.href = "/build.php?t=0&gid=17";gid17_DTR_type_clear
	}
}
function gid17_clear(){
	var id = TJS.CurrentData.account_object[TJS.Const.gid17_village_DTR];
	var gid17_des_clear = TJS.CurrentData.account_object[TJS.Const.gid17_DTR_type_clear];
	if(id !== undefined && Number(id) != -1 && Number(id) == TJS.CurrentData.VillageId)	{
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
	TJS.CurrentData.account_object[TJS.Const.gid17_village_DTR] = -1;
	TJS.SaveCurrentAccount();
}
function gid17_write_res(r,run_twice){
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
	if(e_run_twice.tagName == "SELECT") e_run_twice.value = run_twice;
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
	TJS.InitCheckboxOnclick(troop_train_checkbox,TJS.Const.LS_trooptrain_checkbox + TJS.CurrentData.Gid,null,false);
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
		label_fastclick.innerText = "Fast click (train all):";
		window.fast_click_checkbox = document.createElement("input");
		fast_click_checkbox.setAttribute("type","checkbox");
		TJS.InitCheckboxOnclick(fast_click_checkbox,"fastclick_train",null,true);
		div_fastclick.appendChild(label_fastclick);
		label_fastclick.insertAdjacentElement("afterbegin",fast_click_checkbox);
		
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
function fastclick_train_onclick(i){
	if(window.fast_click_checkbox.checked || confirm("Confirm train?"))
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
