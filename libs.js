Element.prototype.remove = function(){this.parentElement.removeChild(this);}
NodeList.prototype.remove = HTMLCollection.prototype.remove=function(){
    for(let i=this.length-1;i>= 0;i--) 
		if(this[i] && this[i].parentElement) 
			this[i].parentElement.removeChild(this[i]);
}
String.prototype.replaceAll = function(f,r){
	let str = this;
	while(true)
	{
		if(str.indexOf(f) >= 0) str = str.replace(f,r);
		else return str;
	}
}
String.prototype.format = function(){
  return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};
String.prototype.getASCII = function(){
	return this.replace(/[^\x00-\x7F]/g, "");
}
function AddUriCss(uri){
    let s = document.createElement('link');
    s.setAttribute("href",uri + "?refresh_="+refresh_);
	s.setAttribute("rel","stylesheet");
	s.setAttribute("type","text/css");
    document.head.appendChild(s);
}
let topbar = document.getElementById("topBar");
TJS = {
	CurrentSec : function() { 
		return Math.round(Date.now()/1000,0); 
	},
	MoveElementUp : function(e,times = 1){
		while(times >0) 
		{
			if(e.previousElementSibling) e.parentNode.insertBefore(e, e.previousElementSibling);
			else break;
			times--;
		}
	},
	MoveElementDown : function(e,times = 1){
		while(times >0)
		{
			if(e.nextElementSibling) e.parentNode.insertBefore(e.nextElementSibling, e);
			else break;
			times--;
		}
	},
	getParameterByName : function(url,name){
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},	
	GetTimeTextFromSecondLeft : function(num){
		let sec_ =num % 60;
		let temp_ = (num - sec_)/60;
		let min_ = temp_ % 60;
		let hour_ = (temp_ - min_)/60;
		let text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
		text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
		if(hour_ > 0)text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
		return text_;
	},
	GetTimeTextFromHour : function(hour){
		let hour_ = Math.floor(hour);
		let min = (hour - hour_) * 60;
		let min_ = Math.floor(min);
		let sec = (min - min_) * 60;
		let sec_ = sec.toFixed(3);
		
		let text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
		text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
		if(hour_ > 0) text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
		return text_;
	},
	CreateSoundElement : function(url_sound){
		let v = document.createElement("video");    
		v.src = url_sound;
		v.volume = 1;
		v.hidden = true;
		v.loop = false;
		v.autoplay = false;
		document.body.appendChild(v);
		return v;
	},
	LSGetObject : function(name,id){
		let json_text = localStorage.getItem(name + (id ? "_" +id : ""));
		let obj = {};
		if(json_text) obj = JSON.parse(json_text);
		return obj;
	},
	LSSaveObject : function(name,id,data){
		localStorage.setItem(name + (id ? "_" +id : ""),JSON.stringify(data));
	},
	TJS_Timer : function(){
		let ListTimer = document.getElementsByClassName(TJS.Const.ClassTimer);
		for(let i = 0; i < ListTimer.length; i ++)
		{
			let state = ListTimer[i].getAttribute("state");//run,stop
			if(state && state == "stop") continue;						
			let sound = ListTimer[i].getAttribute("sound");//url
			let counting = ListTimer[i].getAttribute("counting");//up,down
			let adv_text = ListTimer[i].getAttribute("adv_text");//use with String.prototype.format
			let loader = ListTimer[i].getAttribute("loader");//true,false
			
			let isdown = counting ? ( counting == "down" ? true : false ) : true;
			let num = 0;
			if(isdown) num = Number(ListTimer[i].getAttribute("value")) - 1;
			else num = Number(ListTimer[i].getAttribute("value")) + 1;
			
			if(!adv_text) adv_text = "%s";
			if(num >= 0){
				if(num == 1 && sound ) TJS.CurrentData.ding_sound.play();
				ListTimer[i].innerText = adv_text.format(TJS.GetTimeTextFromSecondLeft(num));
				ListTimer[i].setAttribute("value",num);
				if(!loader || loader == "false") ListTimer[i].setAttribute("loader",true);
			}else if(!loader || loader == "false"){
				ListTimer[i].innerText = adv_text.format("00:00");
				ListTimer[i].setAttribute("loader",true);
			}
		}
	},
	SaveCurrentVillage : function(){
		TJS.LSSaveObject("village",TJS.CurrentData.VillageId,TJS.CurrentData.village_object);
	},
	SaveCurrentAccount : function(){
		TJS.LSSaveObject("account",TJS.CurrentData.UserName,TJS.CurrentData.account_object);
	},
	TitleUsername : function(){
		let titles = document.getElementsByTagName("title");
		titles[0].innerText = TJS.CurrentData.UserName + " " + titles[0].innerText;
	},
	GetLiBuildTimerObject : function(){
		let obj = {}
		obj.e = null;//element
		obj.time = 0;//time
		obj.flag = false;
		obj.color = null;
		obj.sound = false;
		obj.adv_text = null;
		obj.show_zero = false;
		obj.navigate_url = null;
		return obj;
	},
	CreateDataListVillageName : function(id = "village_list"){
		let datalist_villagename = document.createElement("datalist");
		datalist_villagename.setAttribute("id",id);
		for(let i = 0;i < TJS.CurrentData.listVillage.length;i++){
			if(TJS.CurrentData.listVillage[i] == TJS.CurrentData.active_village) continue;
			let name_ = TJS.CurrentData.listVillage[i].getElementsByClassName("name");
			if(name_.length > 0){
				let option_datalist = document.createElement("option");
				option_datalist.value = name_[0].innerText;
				datalist_villagename.appendChild(option_datalist);
				
				let id_village = TJS.getParameterByName(TJS.CurrentData.listVillage[i].getElementsByTagName("a")[0].getAttribute("href"),"newdid");
				TJS.ListVillageName.push({
											id : id_village,
											name: name_[0].innerText
										});
			}
		}
		return datalist_villagename;
	},
	ListVillageName : [],// [{ id, name},{...}]
	Re_MarketPlace_sendRessources : function(callback_){//need check
		window.marketPlace.sendRessources = function() {//line 7856 in crypt-xxxxx.js:formatted
			let b = window.marketPlace;//fix "this"
			if(Travian.ajax)
			{
				Travian.ajax({
				data: {
					cmd: "prepareMarketplace",
					t: jQuery("#t").val(),
					id: jQuery("#id").val(),
					a: jQuery("#a").val(),
					sz: jQuery("#sz").val(),
					kid: jQuery("#kid").val(),
					c: jQuery("#c").val(),
					x2: jQuery("#x2").length ? jQuery("#x2").first().val() : 1,
					r1: jQuery("#r1").val(),
					r2: jQuery("#r2").val(),
					r3: jQuery("#r3").val(),
					r4: jQuery("#r4").val()
				},
				onSuccess: function(c) {
					if (c.errorMessage) {
						b.setError(c)
					} else {
						if (c.notice) {
							jQuery(".run_dropdown").removeClass("hide");
							jQuery("div .destination").html(c.formular);
							b.setNotice(c);
							b.reloadMarketPlace();
							Travian.Game.Layout.updateResources();
							b.updateAutoCompleter()
							TJS.CurrentData.Resource();////
							callback_();/////
						}
					}
				}
				})
			}
			else
			{
				Travian.api("ajax/prepareMarketplace", {
					data: {
						t: jQuery("#t").val(),
						id: jQuery("#id").val(),
						a: jQuery("#a").val(),
						sz: jQuery("#sz").val(),
						kid: jQuery("#kid").val(),
						c: jQuery("#c").val(),
						x2: jQuery("#x2").length ? jQuery("#x2").first().val() : 1,
						r1: jQuery("#r1").val(),
						r2: jQuery("#r2").val(),
						r3: jQuery("#r3").val(),
						r4: jQuery("#r4").val()
					},
					success: function(c) {
						if (c.errorMessage) {
							b.setError(c)
						} else {
							if (c.notice) {
								jQuery(".run_dropdown").removeClass("hide");
								jQuery("div .destination").html(c.formular);
								b.setNotice(c);
								b.reloadMarketPlace();
								Travian.Game.Layout.updateResources();
								b.updateAutoCompleter()
								TJS.CurrentData.Resource();////
								callback_();/////
							}
						}
					}
				})
			}
		}
	},
	DivClear : function(){//need check
		let div_clear = document.createElement("div");
		div_clear.setAttribute("class","clear");
		return div_clear;
	},
	BalanceRes : function(mc,bc,arr,m = 1,d = TJS.Const.RoundResource){
		// mc, bc, arr[{rc,sc, rt,st ,(r,pos,rtn,percent)},{...]
		// mc: mechant current (number)
		// bc: balance current (yes)/target (no)
		// 
		// m: Multiplication (1,2,3)
		// d: round, 100 default
		mc =  Math.floor(mc/d*m);
		let max_send = 0;
		let max_received = 0;
		for(let i = 0; i < arr.length; i++){
			arr[i].pos = i;//save pos
			arr[i].r = 0;
			arr[i].rc = Math.floor(arr[i].rc/d);
			arr[i].sc = Math.floor(arr[i].sc/d);
			max_send += arr[i].rc;
			if(bc) arr[i].percent = arr[i].rc/arr[i].sc;
			else{
				arr[i].rt = Math.floor(arr[i].rt/d);
				arr[i].st = Math.floor(arr[i].st/d);
				arr[i].rtn = Math.floor(arr[i].st - 1 - arr[i].rt);
				arr[i].percent = arr[i].rtn /(arr[i].st - 1);
				max_received += arr[i].rtn;
			}
		}
		let res_send = Math.min(mc,max_send,bc ? Number.MAX_SAFE_INTEGER : max_received);
		let break_count = 0;
		while(res_send > 0){
			break_count = 0;
			arr.sort(function(a,b){ return b.percent - a.percent;});//sort percent max to min
			for(let i = 0; i < arr.length; i++){
				if(arr[i].percent == 0 | arr[i].r >= arr[i].rc | (bc ? false : arr[i].r >= arr[i].rtn)) { break_count++; continue;}
				arr[i].r += m;
				res_send -= m;
				arr[i].percent = bc ? (arr[i].rc - arr[i].r)/arr[i].sc : (arr[i].rtn - arr[i].r) /(arr[i].st - 1);
				break;
			}
			if(break_count == arr.length) break;
		}
		arr.sort(function(a,b){ return a.pos - b.pos;});
		let result = [];
		for(let i = 0; i < arr.length; i++) result.push(arr[i].r * d / m);
		return result;
	},
	HotKeyList : [],
	InitHotkey : function(){
		$(document).keydown(function(e){
			if(document.activeElement.tagName == "INPUT") return;
			if(document.activeElement.tagName == "TEXTAREA") return;
			console.log("e.which:" + e.which + " | e.keyCode " + e.keyCode);
			for(let i = 0; i < TJS.HotKeyList.length; i++)
			{
				let flag = false;
				if(Array.isArray(TJS.HotKeyList[i][0]))
				{
					for(let j = 0; j < TJS.HotKeyList[i][0].length; j++)
						if(TJS.HotKeyList[i][0][j] == e.which) {flag = true; break;}
				}
				else if(TJS.HotKeyList[i][0] == e.which) flag = true;				
				if(flag){TJS.HotKeyList[i][1]();return;}
			}
		});
	},
	AddHotKey : function(key_code,delegate_action){		
		TJS.HotKeyList.push([key_code,delegate_action]);
	},
	catch_exception : function(){
		window.err_ = document.createElement("div");
		err_.setAttribute("style","color:red;");	
		let sidebarBoxLinklist = document.getElementById("sidebarBoxLinklist");
		if(sidebarBoxLinklist)
		{
			let innerBox_header = sidebarBoxLinklist.getElementsByClassName("content")[0];
			innerBox_header.insertAdjacentElement("afterbegin",window.err_);
		}
		window.addEventListener("error", function (e){ window.err_.innerText = "Script error."; });
		console.log("Init catch exception complete.");
	},
	HotKeyTabKey : function(){//need check
		let tabFavorWrapper = document.getElementsByClassName("tabFavorWrapper");
		let tabFavorSubWrapper = document.getElementsByClassName("tabFavorSubWrapper");
		if(tabFavorSubWrapper.length == 1)
		{
			let sub_container = tabFavorSubWrapper[0].getElementsByClassName("container");
			let sub_active_container = tabFavorSubWrapper[0].getElementsByClassName("container active");
			for(let i = 0; i < sub_container.length - 1; i++)
			{
				if(sub_container[i] == sub_active_container[0]) 
				{
					sub_container[i+1].getElementsByTagName("a")[0].click();
					console.log("click: " + sub_container[i+1].innerText);
					return;
				}
			}//-> tabFavorWrapper
		}
	
		if(tabFavorWrapper.length == 1)
		{
			let container = tabFavorWrapper[0].getElementsByClassName("container");
			let active_container = tabFavorWrapper[0].getElementsByClassName("container active");
			for(let i = 0; i < container.length - 1; i++)
			{
				if(container[i] == active_container[0]) 
				{
					container[i+1].getElementsByTagName("a")[0].click();
					console.log("click: " + container[i+1].innerText);
					return;
				}
			}
			container[0].getElementsByTagName("a")[0].click();
			console.log("click: " + container[0].innerText);
		}
	},
	HotKeyBack : function(){//need check
		let reportQuickNavigations = document.getElementsByClassName("reportQuickNavigation");
		if(reportQuickNavigations.length == 2) reportQuickNavigations[0].click();
		if(TJS.CurrentData.e_build)
		{
			let previous = TJS.CurrentData.e_build.getElementsByClassName("previous");
			if(previous.length > 0) previous[0].click();
		}
	},
	HotKeyNext : function(){//need check
		let reportQuickNavigations = document.getElementsByClassName("reportQuickNavigation");
		if(reportQuickNavigations.length == 2) reportQuickNavigations[1].click();
		if(TJS.CurrentData.e_build)
		{
			let nexts = TJS.CurrentData.e_build.getElementsByClassName("next");
			if(nexts.length > 0) nexts[0].click();
		}
	},
	attacks_img : httpGetGithubCdnUri("src/attacks.gif"),
	InitCheckboxOnclick : function(e,name,callback_ = null,all_village = false){
		let obj = all_village ? TJS.CurrentData.account_object : TJS.CurrentData.village_object;
		if(!obj["checkbox_status"][name]){
			obj["checkbox_status"][name] = false;
			if(all_village) TJS.SaveCurrentAccount();
			else TJS.SaveCurrentVillage();
		}
		e.checked = obj["checkbox_status"][name];
		e.onchange = function(){ 
			obj["checkbox_status"][name] = e.checked;			
			if(all_village) TJS.SaveCurrentAccount();
			else TJS.SaveCurrentVillage();
			if(callback_) callback_();
		}
	},
	LoadLib : function(){
		AddUriScript(httpGetGithubCdnUri("src/global.js"));//
		//AddUriCss(httpGetGithubCdnUri("src/css.css"));//
		//AddUriScript(httpGetGithubCdnUri("src/npc_helper.js"));//
		if(window.firstLoad)
		{
			AddUriScript(httpGetGithubCdnUri("src/dorf.js"));//read data -> task_helper
			AddUriScript(httpGetGithubCdnUri("src/builds.js"));//read data -> task_helper
			AddUriScript(httpGetGithubCdnUri("src/hero.js"));//
			AddUriScript(httpGetGithubCdnUri("src/berichte_n_messages.js"));//
			AddUriScript(httpGetGithubCdnUri("src/allianz.js"));//
			AddUriScript(httpGetGithubCdnUri("src/spieler.js"));//	
			AddUriScript(httpGetGithubCdnUri("src/statistiken.js"));//		
			AddUriScript(httpGetGithubCdnUri("src/manual.js"));//
			AddUriScript(httpGetGithubCdnUri("src/region.js"));//
			AddUriScript(httpGetGithubCdnUri("src/position_details.js"));//
			//AddUriScript(httpGetGithubCdnUri("src/karte.js"));//
		}
		else
		{
			let raidall = TJS.CurrentData.account_object["raidall"];
			let href = TJS.CurrentData.tab_MainActive ? TJS.CurrentData.tab_MainActive.getAttribute("href") : null;
			let tt99 = href ? ( href.indexOf("tt=99")>=0 ) : false;
			if(raidall && (TJS.CurrentData.Gid != 16 || !tt99))
			{
				raidall.flag = false;
				TJS.SaveCurrentAccount();
			}
				
			switch(window.location.pathname)
			{
				case "/dorf1":
				case "/dorf2":
				case "/dorf3": AddUriScript(httpGetGithubCdnUri("src/dorf.js")); break;
				case "/build": AddUriScript(httpGetGithubCdnUri("src/builds.js")); break;
				case "/report":
				case "/messages": AddUriScript(httpGetGithubCdnUri("src/berichte_n_messages.js")); break;
				case "/hero": AddUriScript(httpGetGithubCdnUri("src/hero.js")); break;
				case "/alliance": AddUriScript(httpGetGithubCdnUri("src/allianz.js")); break;
				case "/profile": AddUriScript(httpGetGithubCdnUri("src/spieler.js")); break;
				case "/statistics": AddUriScript(httpGetGithubCdnUri("src/statistiken.js")); break;
				case "/manual.php": AddUriScript(httpGetGithubCdnUri("src/manual.js")); break;
				case "/region": AddUriScript(httpGetGithubCdnUri("src/region.js")); break;
				case "/position_details.php": AddUriScript(httpGetGithubCdnUri("src/position_details.js")); break;
				//case "/karte.php": AddUriScript(httpGetGithubCdnUri("src/karte.js")); break;
				default: break;
			}
		}
	},
};
TJS.Const = {
	Slider_Target_Max_Default : 85,
	ClassTimer : "TJS_timer",//TJS_timer
	ClassTaskHelper_p1 : "task_helper_p1",
	LS_trooptrain : "troop_train_",
	LS_trooptrain_checkbox : "troop_train_checkbox_",	
	font_size: "10px",
	task_helper_color_list : ["Blue","BlueGray","Gray"],
	task_helper_select_list : ["Off","Builds","Troops","Celebration","Resource","AttackRed"],
	Show_TroopTrain_arr : [	[19,		29,			20,			30,			21			],
							["#0069FF",	"#78A5D3",	"#7700F6",	"#C574F3",	"#C84545"	],
							["b",		"B",		"s",		"S",		"w"			]],
	CelebrationResource : {
		"c_0" : { r: [6400,6650,5940,1340], run_twice: 1},//Small Celebration
		"c_1" : { r: [29700,33250,32000,6700], run_twice: 1},//Big Celebration
		"c_2" : { r: [14850,16625,16000,3350], run_twice: 2},//Big Celebration / 2
		"c_3" : { r: [9900,11084,10667,2234], run_twice: 3}//Big Celebration / 3
	},
	imgs_troop_move : [	["def1","/build.php?gid=16&tt=1&filter=1&subfilters=2,3"],//all def in
						["def2","/build.php?gid=16&tt=1&filter=2&subfilters=5"],//def yellow out
						["def3","/build.php?gid=16&tt=1&filter=1&subfilters=2,3"],//all def in
						["att1","/build.php?gid=16&tt=1&filter=1&subfilters=1"],//att red in
						["att2","/build.php?gid=16&tt=1&filter=2&subfilters=4"],//att yellow out
						["att3","/build.php?gid=16&tt=1&filter=1&subfilters=1"]//att violet in (Oasis)
					],
	gid17_village_DTR: "gid17_village_DTR",
	gid17_DTR_type_clear : "gid17_DTR_type_clear",
	RoundResource : 100,
};
TJS.CurrentData = {
	Uid : -1,
	isPlus : false,
	sidebarBoxVillagelist : document.getElementById("sidebarBoxVillagelist"),
	//list tab: sub :"contentNavi tabNavi tabFavorSubWrapper", main: "contentNavi subNavi tabFavorWrapper"
	tabs : document.getElementsByClassName("contentNavi"),
	tab_MainActive : null,
	tab_SubActive : null,
	e_build : document.getElementById("build"),
	UserName : function(){return document.getElementsByClassName("playerName")[0].innerText;}(),	
	Gid : -1,
	listVillage : null,
	active_village : null,
	VillageId : null,
	village_object : null,
	ding_sound : TJS.CreateSoundElement(httpGetGithubCdnUri("src/ding.mp3")),
	account_object : null,
	Timeout : 200
}
TJS.CurrentData.Gid = function(){
	if(!TJS.CurrentData.e_build) return -1;
	let gid_str = TJS.CurrentData.e_build.getAttribute("class").split(" ")[0];
	return Number(gid_str.substring(3,gid_str.length));
}();
TJS.CurrentData.listVillage = function() {
	if(TJS.CurrentData.sidebarBoxVillagelist) return TJS.CurrentData.sidebarBoxVillagelist.getElementsByTagName("li");
	else return null;
}();
TJS.CurrentData.active_village = function(){
	for(let i = 0; i < TJS.CurrentData.listVillage.length; i++) 
		if(TJS.CurrentData.listVillage[i].getAttribute("class").indexOf("active") >=0) 
			return TJS.CurrentData.listVillage[i];
	return null; 
}();
TJS.CurrentData.VillageId = function(){
	if (TJS.CurrentData.active_village )
		return Number(TJS.getParameterByName(TJS.CurrentData.active_village.getElementsByTagName("a")[0].getAttribute("href"),"newdid"));
	else return null;
}();
TJS.CurrentData.village_object = function(){
	if(TJS.CurrentData.VillageId){
		let obj = TJS.LSGetObject("village",TJS.CurrentData.VillageId);
		if(!obj["checkbox_status"]) obj["checkbox_status"] = {};
		return obj;
	}
	else return null;
}();
TJS.CurrentData.account_object = function(){
	if(TJS.CurrentData.UserName){
		let obj = TJS.LSGetObject("account",TJS.CurrentData.UserName);
		if(!obj["checkbox_status"]) obj["checkbox_status"] = {};
		return obj;
	} else return null;
}();
TJS.CurrentData.Resource = function(){
	let stockBar_values = document.getElementById("stockBar").getElementsByClassName("value");
	let res = [
		Number(stockBar_values[1].innerText.replaceAll(".","").replaceAll(",","")),
		Number(stockBar_values[2].innerText.replaceAll(".","").replaceAll(",","")),
		Number(stockBar_values[3].innerText.replaceAll(".","").replaceAll(",","")),
		Number(stockBar_values[5].innerText.replaceAll(".","").replaceAll(",",""))
	];
	TJS.CurrentData.village_object["res"] = res;
	TJS.CurrentData.Storage = Number(stockBar_values[0].innerText.replaceAll(",","").replaceAll(".","").match(/[\d.,]+/));
	TJS.CurrentData.Granary = Number(stockBar_values[4].innerText.replaceAll(",","").replaceAll(".","").match(/[\d.,]+/));
	TJS.CurrentData.village_object["storage"] = TJS.CurrentData.Storage;
	TJS.CurrentData.village_object["granary"] = TJS.CurrentData.Granary;
	TJS.CurrentData.village_object["updatein"] = TJS.CurrentSec();
	TJS.SaveCurrentVillage();
	return res;
};
TJS.CurrentData.list_sidebarBoxActiveVillage = [//need check
	[document.getElementsByClassName("layoutButton workshop gold")[0],"/build.php?gid=21"],//workshop
	[document.getElementsByClassName("layoutButton stable gold")[0],"/build.php?gid=20"],//stable
	[document.getElementsByClassName("layoutButton barracks gold")[0],"/build.php?gid=19"],//barracks
	[document.getElementsByClassName("layoutButton market gold")[0],"/build.php?gid=17"]//market
];
if(!TJS.CurrentData.list_sidebarBoxActiveVillage[0][0]) TJS.CurrentData.isPlus = true;
//statistiken: 	main tab: "tabItem active", sub tab: "container active", 
//allianz	:	main tab: "tabItem active", sub tab: "container active", 
TJS.CurrentData.tab_MainActive = function(){
		if(TJS.CurrentData.tabs.length > 0){//topbar ?  
			return TJS.CurrentData.tabs[0].getElementsByClassName("tabItem active")[0]; //allianz,statistiken					
		}
		return null;
	}();
TJS.CurrentData.tab_SubActive = function(){
		if(TJS.CurrentData.tabs.length > 0){//if tab_MainActive null/undefined -> sub
			let container_active = TJS.CurrentData.tabs[TJS.CurrentData.tabs.length - 1].getElementsByClassName("container active")[0];
			if(container_active) return container_active.getElementsByTagName("a")[0];//allianz,statistiken
		}
		return null;
	}();


TJS.CurrentData.Resource();
TJS.catch_exception();
window.setInterval(TJS.TJS_Timer,1000);

TJS.LoadLib();
TJS.TitleUsername();
$(".errorMessage,.inlineIconList.resourceWrapper").css("margin-top","0px");
console.log("uid:" + TJS.CurrentData.UserName + 
			"; UserName:" + TJS.CurrentData.UserName +
			"; gid:" + TJS.CurrentData.Gid +
			"; village_id:" + TJS.CurrentData.VillageId);

TJS.AddHotKey(192,function(){ window.location.href = "/village/statistics";});// ` ~
TJS.AddHotKey(9,TJS.HotKeyTabKey);// tab
TJS.AddHotKey([66,37],TJS.HotKeyBack);//back & left arrow
TJS.AddHotKey([78,39],TJS.HotKeyNext);//next & right arrow
TJS.AddHotKey(81,function(){ // Q change task_helper_select
	if(window.task_helper_select);
	{
		let num = Number(window.task_helper_select.value);
		num++;
		if(num == TJS.Const.task_helper_select_list.length) num = 1;
		window.task_helper_select.value = num;
		window.task_helper_select.onchange();
	}
});
TJS.InitHotkey();
//null.test_catch_error()
window.setInterval(TJS.CurrentData.Resource,15000);
