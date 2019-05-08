var list_raidlist = [];
var e_sellect;
function spieler_addraidlist()
{	
	e_sellect = document.createElement("select");
	e_sellect.setAttribute("class","dropdown");
	for(var i = 0; i< list_raidlist.length; i++)
	{
		var e_option = document.createElement("option");
		e_option.setAttribute("value",list_raidlist[i][0]);
		e_option.innerText = list_raidlist[i][1];
		e_sellect.appendChild(e_option);
	}
	spieler_villages.insertAdjacentElement("beforebegin",e_sellect);
		
	var e_coords = spieler_villages.getElementsByClassName("coords");
	for(var i =0; i < e_coords.length; i++)
	{
		var uri_ = e_coords[i].getElementsByTagName("a")[0].href;
		var x_ = getParameterByName("x",uri_);
		var y_ = getParameterByName("y",uri_);
		if(x_ == null || y_ == null) continue;
		
		var e_div = document.createElement("div");
		e_div.innerText = "Add";
		e_div.setAttribute("style","background-color:green;border:none;color:white;");
		e_div.setAttribute("onclick","Travian.Game.RaidList.addSlotPopupWrapper(e_sellect.value.toString(), '"+x_+"', '"+y_+"'); return false;");
		
		e_coords[i].appendChild(e_div);
	}
}
function func_hero_code()
{
	var hero = {};
	var hero_json = localStorage.getItem("hero");
	if(hero_json !== null) hero = JSON.parse(hero_json);
	
	
	var hero_img_e = spieler_content.getElementsByClassName("heroImage")[0];
	var hero_code = getParameterByName("code",hero_img_e.getAttribute("src"));
	var hero_item_code = hero_code.substring(38);
	var e_label = document.createElement("p");
	e_label.setAttribute("style","float:right");
	spieler_details.insertAdjacentElement("afterend",e_label);
	
	var titleInHeader = document.getElementsByClassName("titleInHeader")[0].innerText;
	var pos = titleInHeader.search(/(?<= - ).+$/g);
	var spieler_uid = null;//getParameterByName("uid",window.location.href);
	if(pos == -1 ) spieler_uid = window.Current.UserName;//current account	
	else spieler_uid = titleInHeader.substring(pos,titleInHeader.length);
	
	var player_ = hero[spieler_uid];
	if(player_ !== undefined && player_.code !== undefined)
	{
		if(hero_item_code != player_.code.code)
		{
			player_.code.code = hero_item_code;
			player_.code.time = CurrentSec();
			e_label.innerText = "Check change hero: 0 sec ago.";
		}
		else
		{
			e_label.innerText = "Check change hero: " + GetTimeTextFromSecondLeft(CurrentSec() - player_.code.time) + " ago.";
		}
	}
	else
	{		
		e_label.innerText = "Check change hero: get data first times.";
		if(player_ === undefined) hero[spieler_uid] = {};
		hero[spieler_uid].code = {};
		hero[spieler_uid].code.time = CurrentSec();
		hero[spieler_uid].code.code = hero_item_code;
	}
	localStorage.setItem("hero",JSON.stringify(hero));
	//---------------------------------------------------
	//hero code: 0-37: skin
	
	//find hero item (map and boot %)
	var left_hand = hero_code.substring(56,58);
	var boot = hero_code.substring(64,66);
	var detected = "Detected: ";
	var detected_item = false;
	switch(left_hand)
	{
		case "3d": detected += "Map 30%; "; detected_item = true; break;
		case "3e": detected += "Map 40%; "; detected_item = true; break;
		case "3f": detected += "Map 50%; "; detected_item = true; break;
		default: break;
	}
	switch(boot)
	{
		case "61": detected += "Boot 25%"; detected_item = true; break;
		case "62": detected += "Boot 50%"; detected_item = true; break;
		case "63": detected += "Boot 75%"; detected_item = true; break;
		default: break;
	}
	
	//---------------------------------------------------
	var details = document.getElementById("details");
	var table_body = details.getElementsByTagName("tbody")[0];
	
	
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	var td = document.createElement("td");
	var a_ = document.createElement("a");
	a_.setAttribute("href","/statistiken.php?id=3&name=" + spieler_uid);
	a_.innerText = "Find hero exp";
	if(detected_item) td.innerText = detected;
	th.appendChild(a_);
	tr.appendChild(th);
	tr.appendChild(td);
	table_body.insertAdjacentElement("afterbegin",tr);
}

function spieler_main()
{
	if(window.location.href.indexOf("spieler.php")>=0)
	{
		window.spieler_villages = document.getElementById("villages");
		window.spieler_content = document.getElementById("content");
		window.spieler_details = document.getElementById("details");
		if(spieler_villages !== null)
		{
			var get_list_raidlist = localStorage.getItem(window.Current.UserName + "_list_raidlist");
			if(get_list_raidlist !== null) list_raidlist = JSON.parse(get_list_raidlist);
			if(list_raidlist.length > 0) spieler_addraidlist();
		}
		if(spieler_content !== null && spieler_details !== null) func_hero_code();
	}
}
spieler_main();