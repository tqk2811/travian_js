function Get_gid()
{
	build_gid();
	switch(window.Current.Gid)
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
function build_gid()
{
	window.e_merge = { isOn : false, e_text : null };
	if(window.Current.Gid == 16 && getQueryVariable(window.location.href,"m") !== null && getQueryVariable(window.location.href,"tt") == "2")
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

function build_gid_TotalRes(e)
{
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
			e.insertAdjacentElement("afterend",total_element);
		}		
	}
	if(window.Current.Gid >= 19 && window.Current.Gid <= 21 && e.parentElement.getAttribute("class") == "details")//return
	{
		var e_imgs = e.parentElement.getElementsByTagName("img");
		var e_imgs_unit = e.parentElement.getElementsByClassName("unit");
		if(e_imgs.length == 1 && e_imgs_unit.length == 1 && e_imgs[0] == e_imgs_unit[0])
		{
			var class_unit_strings = e_imgs[0].getAttribute("class").split(" ");
			var name_unit = e_imgs[0].getAttribute("alt");
			if(class_unit_strings.length == 2)
			{
				var account_object = GetObject("account",window.Current.UserName);
				if(account_object["troop"] == undefined) account_object["troop"] = {};
				if(account_object["troop"][class_unit_strings[1]] !== undefined) return;
				var e_value = e.getElementsByClassName("value");
				var arr = [];
				arr.push(name_unit);
				for(var i = 0; i < 4; i++)arr.push(Number(e_value[i].innerText));
				account_object["troop"][class_unit_strings[1]] = arr;
				SaveObject("account",window.Current.UserName,account_object);
			}
		}
	}
}

function gid15()//main building
{
	var demolish = document.getElementById("demolish");
	if(demolish !== null)
	{
		var timers_ = demolish.getElementsByClassName("timer");
		if(timers_.length == 1)	Current.village_object["demolish"] = Number(timers_[0].getAttribute("value")) + CurrentSec();
		else Current.village_object["demolish"] = 0;			
		SaveCurrentVillage();
	}
}

function gid16()//rallypoint
{
	if(window.Current.tabActives !== null)
	{
		var tabItem = window.Current.tabActives[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("tt=99")>=0)
		{
			var list_raidlist = [];
			var listEntrys = document.getElementById("raidList").getElementsByClassName("listEntry");
			for(var i = 0; i < listEntrys.length; i++) 
				list_raidlist.push([
									Number(listEntrys[i].id.slice(4,listEntrys[i].id.length)),
									listEntrys[i].getElementsByClassName("listTitleText")[0].innerText
									])
			localStorage.setItem(window.Current.UserName + "_list_raidlist",JSON.stringify(list_raidlist));//
			
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
			window.Current.e_build.insertAdjacentElement("afterbegin",e_div);
		}
		else if(tabItem.getAttribute("href").indexOf("tt=2")>=0)
		{
			var e_class_catas = document.getElementsByClassName("cata");
			if(e_class_catas.length == 1) gid16_cata_multiwave();
		}
	}
}
function gid16_bt_CheckAllGreenAttack_onclick()
{
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

function gid16_cata_multiwave()
{
	localStorage.setItem("cata_multiwave","0");
	var e_main = document.createElement("div");
	e_main.setAttribute("style","display: inline-block;");
	window.Current.e_build.insertAdjacentElement("beforeend",e_main);

	window.gid16_BT_StartCata = document.createElement("button");
	gid16_BT_StartCata.setAttribute("style","background-color:green;border:none;color:white;padding: 3px; margin: 3px;");
	gid16_BT_StartCata.innerText = "Start multi-wave (first wave)";
	gid16_BT_StartCata.setAttribute("onclick","gid16_cata_multiwave_start()");
	e_main.appendChild(gid16_BT_StartCata);

	var e_p = document.createElement("p");
	e_main.appendChild(e_p);

	window.gid16_Input_CataTrigger = document.createElement("input");
	gid16_Input_CataTrigger.id = "gid16_Input_CataTrigger";
	gid16_Input_CataTrigger.type = "checkbox";
	gid16_Input_CataTrigger.setAttribute("onclick","gid16_cata_multiwave_trigger()");
	e_main.appendChild(gid16_Input_CataTrigger);

	var label_gid16_Input_CataTrigger = document.createElement("label");
	label_gid16_Input_CataTrigger.setAttribute("for","gid16_Input_CataTrigger");
	label_gid16_Input_CataTrigger.innerText = "Wait first wave";
	e_main.appendChild(label_gid16_Input_CataTrigger);
	
	var e_p2 = document.createElement("p");
	e_main.appendChild(e_p2);
	
	window.gid16_Input_delay = document.createElement("input");
	gid16_Input_delay.setAttribute("id","gid16_Input_delay")
	gid16_Input_delay.setAttribute("min",0);
	gid16_Input_delay.setAttribute("max",5000);
	gid16_Input_delay.setAttribute("type","number");
	gid16_Input_delay.setAttribute("value",100);
	gid16_Input_delay.setAttribute("maxlength",4);
	gid16_Input_delay.setAttribute("style","padding:3px;margin:3px;");
	gid16_Input_delay.hidden = true;
	e_main.appendChild(gid16_Input_delay);
	
	window.gid16_Label_Delay = document.createElement("label");
	gid16_Label_Delay.setAttribute("id","label_gid16_Input_delay");
	gid16_Label_Delay.setAttribute("for","gid16_Input_delay");
	gid16_Label_Delay.innerText = "Delay After First Wave (ms)";
	gid16_Label_Delay.hidden = true;
	e_main.appendChild(gid16_Label_Delay);
	
	var select_kata2s = document.getElementsByName("kata2");
	if(select_kata2s.length == 1) select_kata2s[0].value = 99;
}
function gid16_cata_multiwave_start()
{
	if(window.confirm("Start?"))
	{
		var bt_ok = document.getElementById("btn_ok");
		bt_ok.click();
		localStorage.setItem("cata_multiwave","1");		
	}
}
function gid16_cata_multiwave_trigger()
{
	if(gid16_Input_CataTrigger.checked) 
	{
		localStorage.setItem("cata_multiwave","0");
		window.gid16_Interval_id = window.setInterval(gid16_cata_multiwave_trigger_Interval,10);
		gid16_BT_StartCata.hidden = true;
		gid16_Label_Delay.hidden = false;
		gid16_Input_delay.hidden = false;		
	}
	else 
	{
		if(gid16_Interval_id !== undefined) window.clearInterval(gid16_Interval_id);
		gid16_BT_StartCata.hidden = false;
		gid16_Label_Delay.hidden = true;
		gid16_Input_delay.hidden = true;
	}
}
function gid16_cata_multiwave_trigger_Interval()
{
	var cata_multiwave_flag = localStorage.getItem("cata_multiwave");
	if(cata_multiwave_flag !== null && cata_multiwave_flag == "1")
	{		
		var bt_ok = document.getElementById("btn_ok");
		window.clearInterval(gid16_Interval_id);
		sleep(Number(gid16_Input_delay.value));
		bt_ok.click();
	}
}


function gid17()//market
{
	if(window.Current.tabActives !== null)
	{
		var tabItem = window.Current.tabActives[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("t=0")>=0)//manager
		{
			var trading_routes = document.getElementById("trading_routes");
			if(trading_routes !== null)
			{
				var button_clear = document.createElement("button");
				button_clear.innerText = "Clear All Trade Routes";
				button_clear.setAttribute("style","background-color:red;border:none;color:white;padding: 3px;");
				button_clear.setAttribute("onclick","gid17_clear_onclick()");
				trading_routes.insertAdjacentElement("beforebegin",button_clear);
				
				var arr_traderoute_desc = [];			
				var trading_routes = document.getElementById("trading_routes");
				if(trading_routes !== null)
				{
					var desc = trading_routes.getElementsByClassName("desc");
					for( var i = 0; i < desc.length; i++)
					{
						var a_desc = desc[i].getElementsByTagName("a");				
						if(a_desc.length > 0)
						{
							var href_a_desc = a_desc[0].getAttribute("href");
							var flag_add = true;
							for(var j = 0; j< arr_traderoute_desc.length; j++)if(arr_traderoute_desc[j][1] === href_a_desc) { flag_add = false; break; }
							if(flag_add) arr_traderoute_desc.push([a_desc[0].innerText,href_a_desc]);						
						}
					}
				}
				
				window.gid17_select_clear = document.createElement("select");
				gid17_select_clear.add(gid17_clear_select("All","-1"));
				arr_traderoute_desc.forEach(function(child){ gid17_select_clear.add(gid17_clear_select(child[0],child[1])); });
				trading_routes.insertAdjacentElement("beforebegin",gid17_select_clear);
			}
				
			var e_tradeRouteEdit = document.getElementById("tradeRouteEdit");
			if(e_tradeRouteEdit !== null && Number(getParameterByName("option",window.location.href)) == 1 )
			{
				var timeSelector = document.getElementsByClassName("timeSelector")[0];
				
				var div_timeend = document.createElement("div");
				timeSelector.insertAdjacentElement("afterend",div_timeend);
				div_timeend.setAttribute("style","display: flex;background: rgb(220, 247, 197)");
				
				div_timeend.innerHTML = "<div><label>Time end:</label></div><div><input size=\"2\" type=\"number\" length=\"10px\" style=\"height:22px;width:53px;\" placeholder=\"hh\" min=\"0\" max=\"24\" value=\"24\" id=\"hour_end\"><span>:</span><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;   width: 53px;\" placeholder=\"mm\" min=\"0\" max=\"59\" value=\"00\" id=\"minute_end\"></div><div><label>------&gt; with step :</label></div><div><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;width: 53px;\" placeholder=\"hh\" min=\"0\" max=\"24\" value=\"1\" id=\"hour_step\"><span>:</span><input size=\"2\" type=\"number\" length=\"10px\" style=\"height: 22px;width: 53px;\" placeholder=\"mm\" min=\"0\" max=\"59\" value=\"00\" id=\"minute_step\"></div><div onclick=\"gid17_CreateTradeRoutes_click()\" style=\"background-color:green;border:n`one;color:white;padding:3px;margin:3px;\">Create TradeRoutes</div>"
			}
		}
		else if(tabItem.getAttribute("href").indexOf("t=5")>=0)//send res
		{
			var marketSend_ = document.getElementById("marketSend");
			if(marketSend_ !== null)
			{
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
				
				var account_object = GetObject("account",window.Current.UserName);
				if(account_object["troop"] != undefined)
				{
					var keys = Object.keys(account_object["troop"]);
					for(var i = 0; i < keys.length; i++)
					{
						var e_option = document.createElement("option");
						e_option.value = keys[i];
						e_option.innerText = account_object["troop"][keys[i]][0];
						gid17_TroopResSelect.appendChild(e_option);
					}
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
				gid17_TroopResSelect_onchange();
				
				var datalist_villagename = document.createElement("datalist");
				datalist_villagename.setAttribute("id","village_list");					
				marketSend_.insertAdjacentElement("afterend",datalist_villagename);
				for(var i = 0;i < window.Current.listVillage.length;i++)
				{
					if(window.Current.listVillage[i] == window.Current.active_village) continue;
					var name_ = window.Current.listVillage[i].getElementsByClassName("name");
					if(name_.length > 0)
					{
						var option_datalist = document.createElement("option");
						option_datalist.value = name_[0].innerText;
						datalist_villagename.appendChild(option_datalist);
					}
				}
				var enterVillageName = document.getElementById("enterVillageName");
				enterVillageName.setAttribute("list","village_list");
			}
		}
	}
}

function gid17_TroopResSelect_onchange()
{
	var account_object = GetObject("account",window.Current.UserName);
	if(gid17_TroopResSelect.value == "" ||account_object["troop"] == undefined) return;
	window.gid17_TroopRes = account_object["troop"][gid17_TroopResSelect.value];
	gid17_findmaxtroops();
}

function gid17_input_number_troop_onchange()
{
	var res_troops = [
						gid17_TroopRes[1]*gid17_input_number_troop.value,
						gid17_TroopRes[2]*gid17_input_number_troop.value,
						gid17_TroopRes[3]*gid17_input_number_troop.value,
						gid17_noncrop.checked ? 0 : gid17_TroopRes[4]*gid17_input_number_troop.value
	];
	gid17_celebration_click(res_troops,1);
}
function getCurrentRes()
{
	var ress = [];
	for(var i =1; i <= 4; i++)
	{
		var ele = document.getElementById("l" + i.toString());
		ress.push(Number(ele.innerText.replaceAll(",","").replaceAll(".","")));
	}
	return ress;
}

function gid17_findmaxtroops()
{
	var currentres = getCurrentRes();
	var maxtroops = -1;
	var merchantCapacityValue = Number(document.getElementById("merchantCapacityValue").innerText);
	var total_res_for_troop = 0;
	for(var i = 0; i < 4; i++)// max troop res
	{
		var num = Math.floor(currentres[i]/gid17_TroopRes[i+1]);
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

function gid17_clear_select(name, did)
{
	var e_option = document.createElement("option");
	e_option.text = name + " (" + did + ")";
	e_option.value = did;
	return e_option;
}

function gid17_clear_onclick()
{
	if(window.confirm("Are you sure to clear trade routes?"))
	{
		localStorage.setItem("Flag_deleteAll_Trading_routes",window.Current.VillageId);
		localStorage.setItem("gid17_des_clear",window.gid17_select_clear.value);
		window.location.href = "/build.php?t=0&gid=17";
	}
}
function gid17_clear()
{
	var id = localStorage.getItem("Flag_deleteAll_Trading_routes");
	var gid17_des_clear = localStorage.getItem("gid17_des_clear");
	if(id !== null && Number(id) != -1 && Number(id) == window.Current.VillageId)
	{
		var trading_routes = document.getElementById("trading_routes");
		if(trading_routes !== null)
		{
			var trs = trading_routes.getElementsByTagName("tr");
			for(var i = 1; i< trs.length; i++)
			{
				var sel_trs = trs[i].getElementsByClassName("sel");
				if(sel_trs.length == 0) continue;
				if(gid17_des_clear == "-1") 
				{
					sel_trs[0].getElementsByTagName("a")[0].click();
					return;
				}
				else if(trs[i].getElementsByClassName("desc")[0].getElementsByTagName("a")[0].getAttribute("href") == gid17_des_clear) 
				{
					sel_trs[0].getElementsByTagName("a")[0].click();
					return;
				}
			}
		}		
	}
	localStorage.setItem("Flag_deleteAll_Trading_routes",-1);
}
function gid17_celebration_click(r,run_twice)
{
	var sumResources = 0;
	for(var i=0;i<4;i++)
	{
		var e_r = document.getElementById("r" + (i + 1));
		e_r.value = r[i];
		sumResources += r[i];
	}
	document.getElementById("sumResources").innerText = sumResources;
	document.getElementById("merchantsNeededNumber").innerText 
		= Math.ceil(sumResources/Number(document.getElementById("addRessourcesLink1").innerText));
	
	var e_run_twice = document.getElementById("x2");
	if(e_run_twice.tagName == "SELECT") e_run_twice.selectedIndex = run_twice-1;
	else if(e_run_twice.tagName == "INPUT" && e_run_twice.getAttribute("type") == "checkbox")
	{
		switch(run_twice)
		{
			case 2:e_run_twice.checked = true; break;
			default: e_run_twice.checked = false; break;
		}
	}
}
function gid17_CreateTradeRoutes_click()
{
	if(document.getElementById("tradeRouteError").innerText.trim().length == 0 && window.confirm("Confirm Create TradeRoutes?"))
	{
		var obj = {};		
		var arr_ = ["trade_route_destination","r1","r2","r3","r4","repeat","hour_end","minute_end","hour_step","minute_step"];
		for(var i =0; i < arr_.length; i++) obj[arr_[i]] = Number(document.getElementById(arr_[i]).value);
		
		var trade_route_mode_send = document.getElementById("trade_route_mode_send");
		if(trade_route_mode_send.checked) obj["trade_route_mode"] = "send";
		else obj["trade_route_mode"] = "deliver";
		
		obj["hour"] = Number(document.getElementsByName("hour")[0].value);
		obj["minute"] = Number(document.getElementsByName("minute")[0].value);
		
		localStorage.setItem("trade_route",JSON.stringify(obj));
		gid17_CreateTradeRoutes_load();
	}
	return false;
}
function gid17_CreateTradeRoutes_load()
{
	if(window.Current.Gid != 17) 
	{
		localStorage.removeItem("trade_route");
		return;
	}
	var trade_route_str = localStorage.getItem("trade_route");
	if(trade_route_str !== null)
	{
		var obj = JSON.parse(trade_route_str);
		var tmp_hr = obj["hour"];
		var tmp_min = obj["minute"];
		
		var time_start = obj["hour"] * 60 + obj["minute"];
		var time_end = obj["hour_end"] * 60 + obj["minute_end"];
		var time_step = obj["hour_step"] * 60 + obj["minute_step"];
		if(time_step == 0){localStorage.removeItem("trade_route");return;}
		if(time_start < time_end)
		{
			time_start += time_step;
			if(time_start > time_end) localStorage.removeItem("trade_route");
			else
			{
				obj["minute"] = time_start % 60;
				obj["hour"] = (time_start - obj["minute"]) / 60;
				localStorage.setItem("trade_route",JSON.stringify(obj));
			}
			window.location.href=gid17_base_uri_traderoute.format(
							obj["trade_route_destination"],obj["r1"],obj["r2"],obj["r3"],obj["r4"],
							obj["trade_route_mode"],tmp_hr,tmp_min,obj["repeat"]);
		}else localStorage.removeItem("trade_route");
	}
}

function troop_train()//gid 19 20 29 30 21
{
	//var contract = document.getElementById("contract");
	var e_div = document.createElement("div");
	build.insertAdjacentElement("afterbegin",e_div);
	e_div.setAttribute("style","margin-bottom: 10px;");
	
	window.troop_train_checkbox = document.createElement("input");
	window.troop_train_checkbox.setAttribute("type","checkbox");
	window.troop_train_checkbox.checked = window.Current.village_object["troop_train_checkbox_" + window.Current.Gid];
	window.troop_train_checkbox.onchange = function()
		{	window.Current.village_object["troop_train_checkbox_" + window.Current.Gid] = window.troop_train_checkbox.checked;
			SaveCurrentVillage();	}
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
function fastclick_checkedchange(e)
{
	localStorage.setItem("fastclick_train",e.checked);
}
function fastclick_train_onclick(i)
{
	var fastclick_ischeck = document.getElementById("fastclick");	
	if(fastclick_ischeck.checked || confirm("Confirm train?"))
	{
		var e_a = traintroop_actions[Number(i)].getElementsByTagName("a");
		e_a[e_a.length-1].click();
		document.getElementById("s1").click();
	}
}

function gid24()//Town Hall
{
	read_time_gid_under_progress("celebration");
}

function read_time_gid_under_progress(name)
{
	var under_progress = document.getElementsByClassName("under_progress");	
	if(under_progress.length == 1)
	{
		var durs = under_progress[0].getElementsByClassName("dur");		
		var e_time = durs[durs.length - 1].getElementsByClassName("timer")[0];
		var value_time = Number(e_time.getAttribute("value"));
		
		window.Current.village_object[name + "_" + window.Current.Gid] = CurrentSec() + value_time;		
	}else window.Current.village_object[name + "_" + window.Current.Gid] = 0;
	SaveCurrentVillage();
}

//function TroopResource_create(unit,name,res[])

var gid17_base_uri_traderoute = "/build.php?did_dest=%s&r1=%s&r2=%s&r3=%s&r4=%s&trade_route_mode=%s&hour=%s&minute=%s&repeat=%s&gid=17&a=1&t=0&trid=0&option=256";
gid17_clear();
gid17_CreateTradeRoutes_load();
//TroopsResource_load();
if(window.Current.e_build !== null) Get_gid();