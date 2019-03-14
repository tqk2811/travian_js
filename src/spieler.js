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
	var e_th = document.createElement("th");
	e_th.width = "20px";
	e_th.innerText = "Add FarmList";
	spieler_villages.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].insertAdjacentElement("beforeend",e_th);
		
	var e_coords = spieler_villages.getElementsByClassName("coords");
	for(var i =0; i < e_coords.length; i++)
	{
		var uri_ = e_coords[i].getElementsByTagName("a")[0].href;
		var x_ = getParameterByName("x",uri_);
		var y_ = getParameterByName("y",uri_);
		if(x_ == null || y_ == null) continue;
		var e_button = document.createElement("button");
		e_button.innerText = "Add";
		e_button.setAttribute("style","background-color:green;border:none;color:white;");
		e_button.setAttribute("onclick","Travian.Game.RaidList.addSlotPopupWrapper(e_sellect.value.toString(), '"+x_+"', '"+y_+"'); return false;");
		
		var e_td = document.createElement("td");
		e_td.appendChild(e_button);
		e_coords[i].parentElement.appendChild(e_td);
	}
}
function hero_code()
{
	var hero = {};
	var hero_json = localStorage.getItem("hero");
	if(hero_json !== null) hero = JSON.parse(hero_json);
	
	
	var hero_img_e = spieler_content.getElementsByClassName("heroImage")[0];
	var hero_code = getParameterByName("code",hero_img_e.getAttribute("src"));
	
	var e_label = document.createElement("p");
	e_label.setAttribute("style","float:right");
	spieler_details.insertAdjacentElement("afterend",e_label);
	
	var titleInHeader = document.getElementsByClassName("titleInHeader")[0].innerText;
	var pos = titleInHeader.search(/(?<= - ).+$/g);
	var spieler_uid = null;//getParameterByName("uid",window.location.href);
	if(pos == -1 ) spieler_uid = window.Current.Uid;//current account	
	else spieler_uid = titleInHeader.substring(pos,titleInHeader.length);
	
	var player_ = hero[spieler_uid];
	if(player_ !== undefined && player_.code !== undefined)
	{
		if(hero_code != player_.code.code)
		{
			player_.code.code = hero_code;
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
		hero[spieler_uid].code.code = hero_code;
	}
	localStorage.setItem("hero",JSON.stringify(hero));
	//---------------------------------------------------
	var details = document.getElementById("details");
	var table_body = details.getElementsByTagName("tbody")[0];
	
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	var td = document.createElement("td");
	var a_ = document.createElement("a");
	a_.setAttribute("href","/statistiken.php?id=3&name=" + spieler_uid);
	a_.innerText = "Find hero";
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
			var get_list_raidlist = localStorage.getItem(window.Current.Uid + "_list_raidlist");
			if(get_list_raidlist !== null) list_raidlist = JSON.parse(get_list_raidlist);
			if(list_raidlist.length > 0) spieler_addraidlist();
		}
		if(spieler_content !== null && spieler_details !== null) hero_code();
	}
}
spieler_main();