Element.prototype.remove = function(){this.parentElement.removeChild(this);}
NodeList.prototype.remove = HTMLCollection.prototype.remove=function(){
    for(var i=this.length-1;i>= 0;i--) 
		if(this[i] && this[i].parentElement) 
			this[i].parentElement.removeChild(this[i]);
}
String.prototype.replaceAll = function(f,r){
	var str = this;
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
function IsNullOrUndefined(a){
	return a == undefined || a == null;
}
function AddUriCss(uri){
    var s = document.createElement('link');
    s.setAttribute("href",uri + "?refresh_="+refresh_);
	s.setAttribute("rel","stylesheet");
	s.setAttribute("type","text/css");
    document.head.appendChild(s);
}

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
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},	
	GetTimeTextFromSecondLeft : function(num){
		var sec_ =num % 60;
		var temp_ = (num - sec_)/60;
		var min_ = temp_ % 60;
		var hour_ = (temp_ - min_)/60;
		var text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
		text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
		if(hour_ > 0)text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
		return text_;
	},
	CreateSoundElement : function(url_sound){
		var v = document.createElement("video");    
		v.src = url_sound;
		v.volume = 1;
		v.hidden = true;
		v.loop = false;
		v.autoplay = false;
		document.body.appendChild(v);
		return v;
	},
	LSGetObject : function(name,id){
		var json_text = localStorage.getItem(name+"_"+id);
		var village_object = {};
		if(json_text !== null) village_object = JSON.parse(json_text);
		if(village_object == null) village_object = {};
		return village_object;
	},
	LSSaveObject : function(name,id,data){
		localStorage.setItem(name+"_"+id,JSON.stringify(data));
	},
	TimerCountingDownNoReload : function(){
		var ListTimer = document.getElementsByClassName(TJS.Const.ClassTimer);
		for(var i = 0; i < ListTimer.length; i ++)
		{
			var num = parseFloat(ListTimer[i].getAttribute("value")) - 1;
			var sound = ListTimer[i].getAttribute("sound");
			var adv_text = ListTimer[i].getAttribute("adv_text");
			var loader = ListTimer[i].getAttribute("loader");
			if(adv_text == null) adv_text = "";
			else adv_text += ":";
			if(num >= 0)//if(num == 0) ListTimer[i].innerText = adv_text + "00:00";
			{
				if(num == 1 && sound !== null) TJS.CurrentData.ding_sound.play(); 
				ListTimer[i].innerText = adv_text + TJS.GetTimeTextFromSecondLeft(num);
				ListTimer[i].setAttribute("value",num);
				if(loader == null) ListTimer[i].setAttribute("loader",true);
			}
			else if(loader == null)
			{
				ListTimer[i].innerText = adv_text + "00:00";
				ListTimer[i].setAttribute("loader",true);
			}
		}
	},
	SaveCurrentVillage : function(){
		TJS.LSSaveObject("village",TJS.CurrentData.VillageId,TJS.CurrentData.village_object);
	},
	TitleUsername : function(){
		var titles = document.getElementsByTagName("title");
		titles[0].innerText = TJS.CurrentData.UserName + " " + titles[0].innerText;
	},
	GetLiBuildTimerObject : function(){
		var obj = {}
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
		var datalist_villagename = document.createElement("datalist");
		datalist_villagename.setAttribute("id",id);
		for(var i = 0;i < TJS.CurrentData.listVillage.length;i++){
			if(TJS.CurrentData.listVillage[i] == TJS.CurrentData.active_village) continue;
			var name_ = TJS.CurrentData.listVillage[i].getElementsByClassName("name");
			if(name_.length > 0){
				var option_datalist = document.createElement("option");
				option_datalist.value = name_[0].innerText;
				datalist_villagename.appendChild(option_datalist);
				
				var id_village = TJS.getParameterByName(TJS.CurrentData.listVillage[i].getElementsByTagName("a")[0].getAttribute("href"),"newdid");
				TJS.ListVillageName.push({
											id : id_village,
											name: name_[0].innerText
										});
			}
		}
		return datalist_villagename;
	},
	ListVillageName : [],// [{ id, name},{...}]
	Re_MarketPlace_sendRessources : function(callback_){
		window.marketPlace.sendRessources = function() {//line 7856 in crypt-xxxxx.js:formatted
			var b = window.marketPlace;//fix "this"
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
	},
	DivClear : function(){
		var div_clear = document.createElement("div");
		div_clear.setAttribute("class","clear");
		return div_clear;
	},
	FillLevel : function(budget,arr){// budget,array
		var arr_sort = [];
		for(var i = 0; i < arr.length; i++) arr_sort.push({ v:arr[i] , p: i , r : 0});
		arr_sort.sort(function(a, b){return b.v - a.v;});//max to min v
		for(var i = 0; i< arr_sort.length - 1; i++)
		{
			var v = 0;
			var flag = false;
			if(budget >= (arr_sort[i].v - arr_sort[i+1].v)*(i+1)) v = arr_sort[i].v - arr_sort[i+1].v;
			else { v = Math.floor(budget/(i+1)); flag = true; }
			for(var j = 0 ; j <= i;j++)
			{
				arr_sort[j].r += v;
				budget -= v;
			}
			if(flag) break;
		}
		arr_sort.sort(function(a,b){return a.p - b.p;})// de-sort to nomal state (min to max p)
		var result_arr = [];
		for(var i = 0; i < arr_sort.length;i++) result_arr.push(arr_sort[i].r);
		return result_arr;
	},
	HotKeyList : [],
	InitHotkey : function(){
		$(document).keydown(function(e){
			if(document.activeElement.tagName == "INPUT") return;
			if(document.activeElement.tagName == "TEXTAREA") return;
			console.log("e.which:" + e.which + " | e.keyCode " + e.keyCode);
			for(var i = 0; i < TJS.HotKeyList.length; i++)
			{
				var flag = false;
				if(Array.isArray(TJS.HotKeyList[i][0]))
				{
					for(var j = 0; j < TJS.HotKeyList[i][0].length; j++)
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
		var sidebarBoxLinklist = document.getElementById("sidebarBoxLinklist");
		if(sidebarBoxLinklist !== null)
		{
			var innerBox_header = sidebarBoxLinklist.getElementsByClassName("innerBox header")[0];
			innerBox_header.appendChild(window.err_);
		}
		window.addEventListener("error", function (e){ window.err_.innerText = "Script error."; });
		console.log("Init catch exception complete.");
	},
	HotKeyTabKey : function(){
		var tabFavorWrapper = document.getElementsByClassName("tabFavorWrapper");
		var tabFavorSubWrapper = document.getElementsByClassName("tabFavorSubWrapper");
		if(tabFavorSubWrapper.length == 1)
		{
			var sub_container = tabFavorSubWrapper[0].getElementsByClassName("container");
			var sub_active_container = tabFavorSubWrapper[0].getElementsByClassName("container active");
			for(var i = 0; i < sub_container.length - 1; i++)
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
			var container = tabFavorWrapper[0].getElementsByClassName("container");
			var active_container = tabFavorWrapper[0].getElementsByClassName("container active");
			for(var i = 0; i < container.length - 1; i++)
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
	HotKeyBack : function(){
		var reportQuickNavigations = document.getElementsByClassName("reportQuickNavigation");
		if(reportQuickNavigations.length == 2) reportQuickNavigations[0].click();
		if(!IsNullOrUndefined(TJS.CurrentData.e_build))
		{
			var previous = TJS.CurrentData.e_build.getElementsByClassName("previous");
			if(previous.length > 0) previous[0].click();
		}
	},
	HotKeyNext : function(){
		var reportQuickNavigations = document.getElementsByClassName("reportQuickNavigation");
		if(reportQuickNavigations.length == 2) reportQuickNavigations[1].click();
		if(!IsNullOrUndefined(TJS.CurrentData.e_build))
		{
			var nexts = TJS.CurrentData.e_build.getElementsByClassName("next");
			if(nexts.length > 0) nexts[0].click();
		}
	},
	attacks_img : httpGetGithubCdnUri("src/attacks.gif"),
	
	LoadLib : function(){
		AddUriScript(httpGetGithubCdnUri("src/global.js"));//
		AddUriCss(httpGetGithubCdnUri("src/task_helper.css"));//
		AddUriScript(httpGetGithubCdnUri("src/npc_helper.js"));//
		if(window.firstLoad == undefined || window.firstLoad)
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
			//AddUriScript(httpGetGithubCdnUri("src/karte.js"));//
		}
		else
		{
			switch(window.location.pathname)
			{
				case "/dorf1.php":
				case "/dorf2.php":
				case "/dorf3.php": AddUriScript(httpGetGithubCdnUri("src/dorf.js")); break;
				case "/build.php": AddUriScript(httpGetGithubCdnUri("src/builds.js")); break;
				case "/berichte.php":		
				case "/messages.php": AddUriScript(httpGetGithubCdnUri("src/berichte_n_messages.js")); break;
				case "/hero.php": AddUriScript(httpGetGithubCdnUri("src/hero.js")); break;
				case "/allianz.php": AddUriScript(httpGetGithubCdnUri("src/allianz.js")); break;
				case "/spieler.php": AddUriScript(httpGetGithubCdnUri("src/spieler.js")); break;
				case "/statistiken.php": AddUriScript(httpGetGithubCdnUri("src/statistiken.js")); break;
				case "/manual.php": AddUriScript(httpGetGithubCdnUri("src/manual.js")); break;
				case "/region.php": AddUriScript(httpGetGithubCdnUri("src/region.js")); break;
				//case "/karte.php": AddUriScript(httpGetGithubCdnUri("src/karte.js")); break;
				default: break;
			}
		}
	},
};
TJS.Const = {	
	ClassTimer : "TJS_timer",//TJS_timer
	ClassTaskHelper_p1 : "task_helper_p1",
	LS_trooptrain : "troop_train_",
	LS_trooptrain_checkbox : "troop_train_checkbox_",	
	
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
};
TJS.CurrentData = {
	Uid : -1,
	isPlus : false,
	sidebarBoxVillagelist : document.getElementById("sidebarBoxVillagelist"),
	tabActives : document.getElementsByClassName("container active"),
	e_build : document.getElementById("build"),
	UserName : function(){
		var sidebarBoxHero = document.getElementById("sidebarBoxHero");
		if(sidebarBoxHero !== null)
		{
			var playerNames = sidebarBoxHero.getElementsByClassName("playerName");
			if(playerNames.length >= 1)return playerNames[0].children[1].innerText;
		}
		return null;
	}(),	
	Gid : -1,
	listVillage : null,
	active_village : null,
	VillageId : null,
	village_object : null,
	ding_sound : TJS.CreateSoundElement(httpGetGithubCdnUri("src/ding.mp3")),
	
	Timeout : 200
}
TJS.CurrentData.Gid = function(){
	if(TJS.CurrentData.e_build == null) return -1;
	var gid_str = TJS.CurrentData.e_build.getAttribute("class").split(" ")[0];
	return Number(gid_str.substring(3,gid_str.length));
}();
TJS.CurrentData.listVillage = function() {
	if(TJS.CurrentData.sidebarBoxVillagelist !== null) 
		return TJS.CurrentData.sidebarBoxVillagelist.getElementsByTagName("li");
	else return null;
}();
TJS.CurrentData.active_village = function(){
	for(var i = 0; i < TJS.CurrentData.listVillage.length; i++) 
		if(TJS.CurrentData.listVillage[i].getAttribute("class").indexOf("active") >=0) 
			return TJS.CurrentData.listVillage[i];
	return null; 
}();
TJS.CurrentData.VillageId = function(){
	if (TJS.CurrentData.active_village !== null)
		return Number(TJS.getParameterByName(TJS.CurrentData.active_village.getElementsByTagName("a")[0].getAttribute("href"),"newdid"));
	else return null;
}();
TJS.CurrentData.village_object = function(){
	if(TJS.CurrentData.VillageId !== null) return TJS.LSGetObject("village",TJS.CurrentData.VillageId);
	else return null;
}();
TJS.CurrentData.Resource = function(){
	var res = [
		Number(document.getElementById("l1").innerText.replaceAll(".","").replaceAll(",","")),
		Number(document.getElementById("l2").innerText.replaceAll(".","").replaceAll(",","")),
		Number(document.getElementById("l3").innerText.replaceAll(".","").replaceAll(",","")),
		Number(document.getElementById("l4").innerText.replaceAll(".","").replaceAll(",",""))
	];
	TJS.CurrentData.village_object["res"] = res;
	TJS.CurrentData.Storage = Number(document.getElementById("stockBarWarehouse").innerText.replaceAll(",","").replaceAll(".","").match(/[\d.,]+/));
	TJS.CurrentData.Granary = Number(document.getElementById("stockBarGranary").innerText.replaceAll(",","").replaceAll(".","").match(/[\d.,]+/));
	TJS.CurrentData.village_object["storage"] = TJS.CurrentData.Storage;
	TJS.CurrentData.village_object["granary"] = TJS.CurrentData.Granary;
	TJS.SaveCurrentVillage();
	return res;
}();
TJS.CurrentData.list_sidebarBoxActiveVillage = [
	[document.getElementsByClassName("layoutButton workshopBlack gold  ")[0],"/build.php?gid=21"],//workshop
	[document.getElementsByClassName("layoutButton stableBlack gold  ")[0],"/build.php?gid=20"],//stable
	[document.getElementsByClassName("layoutButton barracksBlack gold  ")[0],"/build.php?gid=19"],//barracks
	[document.getElementsByClassName("layoutButton marketBlack gold  ")[0],"/build.php?gid=17"]//market
];
if(TJS.CurrentData.list_sidebarBoxActiveVillage[0][0] == undefined) TJS.CurrentData.isPlus = true;


TJS.AccountSetting = {
	ReadSetting : function(){
		
	},
	SaveSetting : function(){
		
	}
	
};
TJS.GlobalSetting = {
	
};

TJS.catch_exception();
window.setInterval(TJS.TimerCountingDownNoReload,1000);

TJS.LoadLib();
TJS.TitleUsername();
$(".errorMessage,.inlineIconList.resourceWrapper").css("margin-top","0px");
console.log("uid:" + TJS.CurrentData.UserName + 
			"; UserName:" + TJS.CurrentData.UserName +
			"; gid:" + TJS.CurrentData.Gid +
			"; village_id:" + TJS.CurrentData.VillageId);

TJS.AddHotKey(192,function(){ window.location.href = "/dorf3.php";});// ` ~
TJS.AddHotKey(9,TJS.HotKeyTabKey);// tab
TJS.AddHotKey([66,37],TJS.HotKeyBack);//back & left arrow
TJS.AddHotKey([78,39],TJS.HotKeyNext);//next & right arrow
TJS.AddHotKey(81,function(){ // Q change task_helper_select
	if(window.task_helper_select != undefined);
	{
		var num = Number(window.task_helper_select.value);
		num++;
		if(num == TJS.Const.task_helper_select_list.length) num = 1;
		window.task_helper_select.value = num;
		window.task_helper_select.onchange();
	}
});
TJS.InitHotkey();
//null.test_catch_error()