function Get_gid()
{
	build_gid();
	switch(window.gid)
	{
		case 17: gid17(); return;
		case 16: gid16(); return;
		default: return;
	}
}
function build_gid()
{
	var e_showCosts = document.getElementsByClassName("showCosts");
	for(var i =0; i < e_showCosts.length; i++) build_gid_TotalRes(e_showCosts[i]);
}
function build_gid_TotalRes(e)
{
	var ress = e.getElementsByTagName("span");
	if(ress !== null)
	{
		var total_ = 0;
		for(var i =0; i < 4; i++) total_ += Number.parseInt(ress[i].innerText);
		var parent_ress = ress[0].parentNode;
		var total_element = document.createElement("span");
		total_element.innerText = "Total: " + total_;
		parent_ress.appendChild(total_element);
	}
}

function gid16()
{
	if(tabActives !== null)
	{
		var tabItem = tabActives[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("tt=99")>=0)
		{
			var e_bt_CheckNonAttacking = document.createElement("button");
			e_bt_CheckNonAttacking.setAttribute("style","background-color:green;border:none;color:white;padding: 3px; margin: 3px;");
			e_bt_CheckNonAttacking.innerText = "Check non attacking";
			e_bt_CheckNonAttacking.setAttribute("onclick","gid16_bt_CheckNonAttacking_onclick(false)");

			window.gid16_cb_yellow = document.createElement("input");
			gid16_cb_yellow.setAttribute("type","checkbox");
			var e_LB_yellow = document.createElement("label");
			e_LB_yellow.innerText = "Yellow";
			e_LB_yellow.setAttribute("style","border:none;color:white;padding: 3px; margin: 3px;");
			
			window.gid16_cb_red = document.createElement("input");
			gid16_cb_red.setAttribute("type","checkbox");
			var e_LB_red = document.createElement("label");
			e_LB_red.innerText = "Red";
			e_LB_red.setAttribute("style","border:none;color:white;padding: 3px; margin: 3px;");			
			
			var e_div = document.createElement("div");
			e_div.appendChild(e_bt_CheckNonAttacking);
			e_div.appendChild(window.gid16_cb_yellow);
			e_div.appendChild(e_LB_yellow);
			e_div.appendChild(window.gid16_cb_red);
			e_div.appendChild(e_LB_red);
			e_build.insertAdjacentElement("afterbegin",e_div);
		}
		else if(tabItem.getAttribute("href").indexOf("tt=2")>=0)
		{
			var e_class_catas = document.getElementsByClassName("cata");
			if(e_class_catas.length == 1) gid16_cata_multiwave();
		}
	}
}
function gid16_bt_CheckNonAttacking_onclick(flag)
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
				if(e_img_attack.length == 0)
				{
					var e_input = e_slotRows[j].getElementsByTagName("input");
					if(e_input !== null) e_input[0].checked = true;
				}
			}
		}
	if(flag && count == 1 && e_temp !== null)
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
	e_build.insertAdjacentElement("beforeend",e_main);

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
	
	var sellect_kata2s = document.getElementsByName("kata2");
	if(sellect_kata2s.length == 1) sellect_kata2s[0].value = 99;
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


function gid17()
{
	if(tabActives !== null)
	{
		var tabItem = tabActives[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("t=0")>=0)
		{
			var descriptionAndInfo = document.getElementById("descriptionAndInfo");
			if(descriptionAndInfo !== null)
			{
				var button_clear = document.createElement("button");
				button_clear.innerText = "Clear All Trade Routes";
				button_clear.setAttribute("style","background-color:red;border:none;color:white;padding: 3px;");
				button_clear.setAttribute("onclick","gid17_clear_onclick()");
				descriptionAndInfo.appendChild(button_clear);

				var e_tradeRouteEdit = document.getElementById("tradeRouteEdit");
				if(e_tradeRouteEdit !== null)
				{
					var e_trading_edit = document.getElementById("trading_edit");
					var e_p_custom = document.createElement("p");
					e_trading_edit.insertAdjacentElement("afterend",e_p_custom);
					e_p_custom.innerText = "Time spacing:";

					var spacing = document.createElement("input");
					spacing.setAttribute("min",1);
					spacing.setAttribute("max",12);
					spacing.setAttribute("type","number");
					spacing.setAttribute("value",2);
					spacing.setAttribute("id","Timespacing");
					spacing.setAttribute("maxlength",2);
					spacing.setAttribute("style","padding:3px;margin:3px;");
					e_p_custom.appendChild(spacing);

					var button_traderoute = document.createElement("a");
					button_traderoute.innerText = "Create TradeRoutes";
					button_traderoute.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
					button_traderoute.setAttribute("onclick","gid17_CreateTradeRoutes_click()");
					e_p_custom.appendChild(button_traderoute);
				}
			}
		}
		else if(tabItem.getAttribute("href").indexOf("t=5")>=0)
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

				p_button.appendChild(button_Smallcelebration);
				p_button.appendChild(button_Bigcelebration);
				p_button.appendChild(button_Bigcelebration2);
				p_button.appendChild(button_Bigcelebration3);
			}
		}
	}

}
function gid17_clear_onclick()
{
	if(window.confirm("Are you sure to clear all trade routes?"))
	{
		localStorage.setItem("Flag_deleteAll_Trading_routes",1);
		window.location.href = "/build.php?t=0&gid=17";
	}
}
function gid17_clear()
{
	var flag = localStorage.getItem("Flag_deleteAll_Trading_routes");
	if(flag !== null && flag !== undefined && flag + 0 != 0)
	{
		var trading_routes = document.getElementById("trading_routes");
		if(trading_routes !== null)
		{
			var sels = trading_routes.getElementsByClassName("sel");
			if(sels.length >0)
			{
				var a_tr = sels[0].getElementsByTagName("a");
				if(a_tr !== null && a_tr.length >0 )a_tr[0].click();
			}else localStorage.setItem("Flag_deleteAll_Trading_routes",0);
		}else localStorage.setItem("Flag_deleteAll_Trading_routes",0);
	}
}
function gid17_celebration_click(r,run_twice)
{
	for(var i=0;i<4;i++)
	{
		var e_r = document.getElementById("r" + (i + 1));
		e_r.value = r[i];
	}
	var e_run_twice = document.getElementById("x2");
	if(e_run_twice !== null)
	{
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
}
function gid17_CreateTradeRoutes_click()
{
	if(window.confirm("Confirm Create TradeRoutes?"))
	{
		var arr = [];
		var arr_ = ["did_dest","r1","r2","r3","r4","userHour","repeat","Timespacing"]
		for(var i =0; i < arr_.length; i++) arr.push(document.getElementById(arr_[i]).value);
		localStorage.setItem("trade_route",JSON.stringify(arr));
		gid17_CreateTradeRoutes_load();
	}
}
function gid17_CreateTradeRoutes_load()
{
	var trade_route_str = localStorage.getItem("trade_route");
	if(trade_route_str !== null && trade_route_str !== undefined)
	{
		tr = JSON.parse(trade_route_str);
		if(tr[5] !== -1)
		{
			var current_userHour = tr[5];
			var userHour = Number(tr[5]) + Number(tr[7]);
			if(userHour > 23) tr[5] = -1;
			else tr[5] = userHour;
			localStorage.setItem("trade_route",JSON.stringify(tr));
			window.location.href=gid17_base_uri_traderoute.format(tr[0],tr[1],tr[2],tr[3],tr[4],current_userHour,tr[6],tr[7]);
		}
	}
}
var gid17_base_uri_traderoute = "/build.php?did_dest=%s&r1=%s&r2=%s&r3=%s&r4=%s&userHour=%s&repeat=%s&a=1&t=0&trid=0&option=256&gid=17";
gid17_clear();
gid17_CreateTradeRoutes_load();
if(e_build !== null) Get_gid();