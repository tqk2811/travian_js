let e_sellect;
function spieler_addraidlist()
{	
	e_sellect = document.createElement("select");
	e_sellect.setAttribute("class","dropdown");
	for(let i = 0; i< TJS.CurrentData.account_object["raidlists"].length; i++){
		let e_option = document.createElement("option");
		e_option.setAttribute("value",TJS.CurrentData.account_object["raidlists"][i].id);
		e_option.innerText = TJS.CurrentData.account_object["raidlists"][i].name;
		e_sellect.appendChild(e_option);
	}
	spieler_villages.insertAdjacentElement("beforebegin",e_sellect);
		
	let e_coords = spieler_villages.getElementsByClassName("coords");
	for(let i =0; i < e_coords.length; i++){
		let uri_ = e_coords[i].getElementsByTagName("a")[0].href;
		let x_ = TJS.getParameterByName(uri_,"x");
		let y_ = TJS.getParameterByName(uri_,"y");
		if(!x_ || !y_) continue;
		
		let e_div = document.createElement("div");
		e_div.innerText = "Add";
		e_div.setAttribute("style","background-color:green;border:none;color:white;");
		e_div.setAttribute("onclick","Travian.Game.RaidList.addSlotPopupWrapper(e_sellect.value.toString(), '"+x_+"', '"+y_+"'); return false;");
		
		e_coords[i].appendChild(e_div);
	}
}
function func_hero_code(){
	let default_checkchangehero_string = "Check change hero item: ";
	let hero = TJS.LSGetObject("hero",null);	
	
	let hero_img_e = spieler_content.getElementsByClassName("heroImage")[0];
	let hero_code = hero_img_e.getAttribute("src").match(/(?<=\/)[0-9a-f]+(?=\.png)/)[0];
	let hero_item_code = hero_code.substring(38);
	let e_label = document.createElement("p");
	e_label.setAttribute("style","float:right");
	spieler_details.insertAdjacentElement("afterend",e_label);
	
	let titleInHeader = document.getElementsByClassName("titleInHeader")[0].innerText;
	let pos = titleInHeader.search(/(?<= - ).+$/g);
	let spieler_uid = null;//TJS.getParameterByName(window.location.href,"uid");
	if(pos == -1 ) spieler_uid = TJS.CurrentData.UserName;//current account	
	else spieler_uid = titleInHeader.substring(pos,titleInHeader.length);
	
	if(!hero[spieler_uid]) hero[spieler_uid] = {};
	if(hero[spieler_uid].code ){
		if(hero_item_code != hero[spieler_uid].code.code){
			hero[spieler_uid].code.code = hero_item_code;
			hero[spieler_uid].code.time = TJS.CurrentSec();
			e_label.innerText = default_checkchangehero_string + "0 sec ago.";
		}else e_label.innerText = default_checkchangehero_string + TJS.GetTimeTextFromSecondLeft(TJS.CurrentSec() - hero[spieler_uid].code.time) + " ago.";
	}else{		
		e_label.innerText = default_checkchangehero_string + "get data first times.";
		hero[spieler_uid].code = { code : hero_item_code, time : TJS.CurrentSec() };
	}
	TJS.LSSaveObject("hero",null,hero);
	//---------------------------------------------------
	//hero code: 0-37: skin
	
	//find hero item (map and boot %)
	let left_hand = hero_code.substring(56,58);
	let boot = hero_code.substring(64,66);
	let detected = "Detected: ";
	let detected_item = false;
	switch(left_hand){
		case "3d": detected += "Map 30%; "; detected_item = true; break;
		case "3e": detected += "Map 40%; "; detected_item = true; break;
		case "3f": detected += "Map 50%; "; detected_item = true; break;
		default: break;
	}
	switch(boot){
		case "61": detected += "Boot 25%"; detected_item = true; break;
		case "62": detected += "Boot 50%"; detected_item = true; break;
		case "63": detected += "Boot 75%"; detected_item = true; break;
		default: break;
	}
	
	//---------------------------------------------------
	let details = document.getElementById("details");
	let table_body = details.getElementsByTagName("tbody")[0];	
	
	let tr = document.createElement("tr");
	let th = document.createElement("th");
	let td = document.createElement("td");
	let a_ = document.createElement("a");
	a_.setAttribute("href","/statistics/hero?name=" + spieler_uid);
	a_.innerText = "Find hero exp";
	if(detected_item) td.innerText = detected;
	th.appendChild(a_);
	tr.appendChild(th);
	tr.appendChild(td);
	table_body.insertAdjacentElement("afterbegin",tr);
}

function spieler_main()
{
	if(window.location.href.indexOf("/profile")>=0){
		window.spieler_villages = document.getElementById("villages");
		window.spieler_content = document.getElementById("content");
		window.spieler_details = document.getElementById("details");
		if(spieler_villages  && TJS.CurrentData.account_object["raidlists"] ) spieler_addraidlist();
		if(spieler_content  && spieler_details ) func_hero_code();
	}
}
spieler_main();