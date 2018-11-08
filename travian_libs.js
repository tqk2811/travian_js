Element.prototype.remove = function(){this.parentElement.removeChild(this);}
NodeList.prototype.remove = HTMLCollection.prototype.remove=function()
{
    for(var i=this.length-1;i>= 0;i--) if(this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
}
function AddUriCss(uri)
{
    var s = document.createElement('link');
    s.setAttribute("href",uri + "?refresh_="+refresh_);
	s.setAttribute("rel","stylesheet");
	s.setAttribute("type","text/css");
    document.head.appendChild(s);
}
function MoveElementUp(e,times = 1)
{
	while(times >0) 
	{
		if(e.previousElementSibling) e.parentNode.insertBefore(e, e.previousElementSibling);
		times--;
	}
}
function MoveElementDown(e,times = 1)
{
	while(times >0) 
	{
		if(e.nextElementSibling) e.parentNode.insertBefore(e.nextElementSibling, e);
		times--;
	}
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getuid()
{
	var heroImage = document.getElementsByClassName("heroImage");
	if(heroImage.length > 0) 
	{
		var url_imagehero = heroImage[0].getAttribute("src");
		var uid = getParameterByName("uid",url_imagehero);
		if(uid !== null) return Number(uid);
	}
	return null;
}
String.prototype.format = function() {
  return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function FindActiveVillage(listVillages)
{
  for(var i = 0; i < listVillages.length; i++) if(listVillages[i].getAttribute("class").indexOf("active") >=0) return listVillages[i];
  return null; 
}
function getQueryVariable(q,variable) 
{
    var query = q.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) 
    {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) return decodeURIComponent(pair[1]);
    }
  return null;
}
function GetTimeTextFromSecondLeft(num)
{
	var sec_ =num % 60;
	var temp_ = (num - sec_)/60;
	var min_ = temp_ % 60;
	var hour_ = (temp_ - min_)/60;
	var text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
	text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
	if(hour_ > 0)text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
	return text_;
}
function CreateSoundElement(url_sound)
{
    var v = document.createElement("video");    
    v.src = url_sound;
    v.volume = 1;
    v.hidden = true;
    v.loop = false;
    v.autoplay = false;
    document.body.appendChild(v);
    return v;
}
function FindCurrentVillageID()
{
	var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
	if(sidebarBoxVillagelist !== null)
	{
		window.Current.listVillage = sidebarBoxVillagelist.getElementsByTagName("li");//list elements village
		window.Current.active_village = FindActiveVillage(window.Current.listVillage);
		window.Current.VillageId = Number(getParameterByName("newdid",window.Current.active_village.getElementsByTagName("a")[0].getAttribute("href")));
	}
}
function GetVillageObject(id)
{
	var json_text = localStorage.getItem("village_"+id);
	var village_object = {};
	if(json_text !== null) village_object = JSON.parse(json_text);
	return village_object;
}
function SaveVillageObject(id,village_object)
{
	localStorage.setItem("village_"+id,JSON.stringify(village_object));
}
function TimerCountingDownNoReload()
{
  for(var i = 0; i < window.Current.Timers.length; i ++)
  {
    var num = parseInt(window.Current.Timers[i].getAttribute("value")) - 1;
	var sound = window.Current.Timers[i].getAttribute("sound");
    if(num < 0) 
	{
		if(sound !== null) continue;
		else window.Current.Timers[i].innerText = "0";
	}
    else 
    {
      if(num == 1 && sound !== null) window.Current.ding_sound.play(); 
      window.Current.Timers[i].innerText = GetTimeTextFromSecondLeft(num);
      window.Current.Timers[i].setAttribute("value",num);
    }
  }
};


window.Current = {};
window.Current.Uid = -1;
window.Current.VillageId = -1;
window.Current.Gid = -1;
window.Current.tabActives = document.getElementsByClassName("container active");
window.Current.e_build = document.getElementById("build");
window.Current.listVillage = null;
window.Current.active_village = null;
window.Current.current_SecondFrom1970 = Math.round(Date.now()/1000,0);
window.Current.Timers = [];
window.Current.ding_sound = CreateSoundElement(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/ding.mp3"));

if(window.Current.e_build !== null) {
	var gid_str = window.Current.e_build.getAttribute("class").split(" ")[0];
	window.Current.Gid = Number(gid_str.substring(3,gid_str.length));
}
window.Current.Uid = getuid();
FindCurrentVillageID();
window.setInterval(TimerCountingDownNoReload,1000);
console.log("uid:" + window.Current.Uid + "; gid:" + window.Current.Gid +"; village_id:" + window.Current.VillageId);



AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxActiveVillage.js"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxLinklist.js"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/dorf.js"));//rank 4 read data -> task_helper
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.js"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","builds.js"));//rank 5
   AddUriCss(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.css"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/hero.js"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/berichte_n_messages.js"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/allianz.js"));//rank 5
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/spieler.js"));//rank 5