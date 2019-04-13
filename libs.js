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

function CurrentSec(){
	return Math.round(Date.now()/1000,0);
}
function AddUriCss(uri){
    var s = document.createElement('link');
    s.setAttribute("href",uri + "?refresh_="+refresh_);
	s.setAttribute("rel","stylesheet");
	s.setAttribute("type","text/css");
    document.head.appendChild(s);
}
function MoveElementUp(e,times = 1){
	while(times >0) 
	{
		if(e.previousElementSibling) e.parentNode.insertBefore(e, e.previousElementSibling);
		else break;
		times--;
	}
}
function MoveElementDown(e,times = 1){
	while(times >0) 
	{
		if(e.nextElementSibling) e.parentNode.insertBefore(e.nextElementSibling, e);
		else break;
		times--;
	}
}
function getParameterByName(name, url){
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function GetUsername(){
	//var heroImage = document.getElementsByClassName("heroImage");//get uid
	//if(heroImage.length > 0) 
	//{
		//var url_imagehero = heroImage[0].getAttribute("src");
		//var uid = getParameterByName("uid",url_imagehero);
		//if(uid !== null) return Number(uid);
	//}
	//return null;
	var sidebarBoxHero = document.getElementById("sidebarBoxHero");
	if(sidebarBoxHero !== null)
	{
		var playerNames = sidebarBoxHero.getElementsByClassName("playerName");
		if(playerNames.length >= 1)return playerNames[0].children[1].innerText;
	}
	return null;
}
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
function FindActiveVillage(listVillages){
  for(var i = 0; i < listVillages.length; i++) 
	  if(listVillages[i].getAttribute("class").indexOf("active") >=0) return listVillages[i];
  return null; 
}
function getQueryVariable(url,variable){
    var q_ = url.split('?');
	var query = q_[q_.length -1];// \abc.php?test=1 or test=2
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) 
    {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) return decodeURIComponent(pair[1]);
    }
  return null;
}
function GetTimeTextFromSecondLeft(num){
	var sec_ =num % 60;
	var temp_ = (num - sec_)/60;
	var min_ = temp_ % 60;
	var hour_ = (temp_ - min_)/60;
	var text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
	text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
	if(hour_ > 0)text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
	return text_;
}
function CreateSoundElement(url_sound){
    var v = document.createElement("video");    
    v.src = url_sound;
    v.volume = 1;
    v.hidden = true;
    v.loop = false;
    v.autoplay = false;
    document.body.appendChild(v);
    return v;
}
function FindCurrentVillageID(){
	window.Current.sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
	if(window.Current.sidebarBoxVillagelist !== null)
	{
		window.Current.listVillage = window.Current.sidebarBoxVillagelist.getElementsByTagName("li");
		window.Current.active_village = FindActiveVillage(window.Current.listVillage);
		window.Current.VillageId = Number(getParameterByName("newdid",
			window.Current.active_village.getElementsByTagName("a")[0].getAttribute("href")));
	}
}
function GetObject(name,id){
	var json_text = localStorage.getItem(name+"_"+id);
	var village_object = {};
	if(json_text !== null) village_object = JSON.parse(json_text);
	if(village_object == null) village_object = {};
	return village_object;
}
function SaveObject(name,id,data){
	localStorage.setItem(name+"_"+id,JSON.stringify(data));
}
function SaveCurrentVillage(){
	SaveObject("village",window.Current.VillageId,window.Current.village_object);
}
function TimerCountingDownNoReload(){
	var ListTimer = document.getElementsByClassName("travian_js_timer");
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
			if(num == 1 && sound !== null) window.Current.ding_sound.play(); 
			ListTimer[i].innerText = adv_text + GetTimeTextFromSecondLeft(num);
			ListTimer[i].setAttribute("value",num);
			if(loader == null) ListTimer[i].setAttribute("loader",true);
		}else if(loader == null)
		{
			ListTimer[i].innerText = adv_text + "00:00";
			ListTimer[i].setAttribute("loader",true);
		}
	}
}
function InitHotkey(){
	$(document).keydown(function(e)
	{
		//if (e.ctrlKey ? 1 : 0 || e.altKey ? 0 : 1) return;// if not alt or ctrl key press -> return
		//if(e.which==26 ? 0 : 1) return;//checkWebkitandIE
		if(document.activeElement.tagName == "INPUT") return;
		console.log("e.which:" + e.which + " | e.keyCode " + e.keyCode);
		var filter = getQueryVariable(window.location.href,"filter");
		var is_berichte = window.location.href.indexOf("berichte.php") !== -1;
		var is_statistiken = window.location.href.indexOf("statistiken.php") !== -1;
		
		switch(e.which)
		{
			case 192:// ` ~
				window.location.href = "/dorf3.php";
				return;
			case 9:// tab key
				if(!is_statistiken) return;
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
				return;
			case 66://b
				if(!is_berichte) return;
			case 37:// left arrow
				if(is_berichte) 
				{
					var reportQuickNavigations = document.getElementsByClassName("reportQuickNavigation");
					if(reportQuickNavigations.length == 2) reportQuickNavigations[0].click();
				}else if(window.Current.Gid == 16 && filter !== null)// RallyPoint
				{
					var nexts = window.Current.e_build.getElementsByClassName("previous");
					if(nexts.length > 0) nexts[0].click();
				}
				return;
			case 78://n
				if(!is_berichte) return;
			case 39:// right arrow
				if(is_berichte)
				{
					var reportQuickNavigations = document.getElementsByClassName("reportQuickNavigation");
					if(reportQuickNavigations.length == 2) reportQuickNavigations[1].click();
				}else if(window.Current.Gid == 16 && filter !== null)// RallyPoint
				{
					var nexts = window.Current.e_build.getElementsByClassName("next");
					if(nexts.length > 0) nexts[0].click();
				}
				return;
			default: return;
		}
	});
}
function catch_exception(){
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
}

catch_exception();
window.Current = {};
window.Current.UserName = -1;
window.Current.UserName = "";
window.Current.VillageId = -1;
window.Current.Gid = -1;
window.Current.tabActives = document.getElementsByClassName("container active");
window.Current.e_build = document.getElementById("build");
window.Current.listVillage = null;
window.Current.active_village = null;
window.Current.ding_sound = CreateSoundElement(httpGetGithubCdnUri("src/ding.mp3"));
window.Current.Timeout = 500;//ms

if(window.Current.e_build !== null){
	var gid_str = window.Current.e_build.getAttribute("class").split(" ")[0];
	window.Current.Gid = Number(gid_str.substring(3,gid_str.length));
}
window.Current.UserName = GetUsername();
FindCurrentVillageID();
window.setInterval(TimerCountingDownNoReload,1000);
window.Current.village_object = GetObject("village",window.Current.VillageId);

InitHotkey();
console.log("uid:" + window.Current.UserName + 
			"; UserName:" + window.Current.UserName +
			"; gid:" + window.Current.Gid +
			"; village_id:" + window.Current.VillageId);

AddUriScript(httpGetGithubCdnUri("src/dorf.js"));//read data -> task_helper
AddUriScript(httpGetGithubCdnUri("src/builds.js"));//read data -> task_helper
AddUriScript(httpGetGithubCdnUri("src/hero.js"));//
AddUriScript(httpGetGithubCdnUri("src/berichte_n_messages.js"));//
AddUriScript(httpGetGithubCdnUri("src/allianz.js"));//
AddUriScript(httpGetGithubCdnUri("src/spieler.js"));//
AddUriScript(httpGetGithubCdnUri("src/global.js"));//
AddUriScript(httpGetGithubCdnUri("src/statistiken.js"));//
   AddUriCss(httpGetGithubCdnUri("src/task_helper.css"));//
AddUriScript(httpGetGithubCdnUri("src/manual.js"));//
AddUriScript(httpGetGithubCdnUri("src/region.js"));//

var titles = document.getElementsByTagName("title");
titles[0].innerText = window.Current.UserName + " " + titles[0].innerText

$(".errorMessage,.inlineIconList.resourceWrapper").css("margin-top","0px");