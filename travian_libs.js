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
    h.appendChild(s);
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

var tabActives = document.getElementsByClassName("container active");
var e_build = document.getElementById("build");
var gid = null;
if(e_build !== null) {
	var gid_str = e_build.getAttribute("class").split(" ")[0];
	window.gid = Number(gid_str.substring(3,gid_str.length));
}
var uid = getuid();


var village_id = -1;
var listVillage = null;
var active_village = null;
var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
if(sidebarBoxVillagelist !== null)
{
	listVillage = sidebarBoxVillagelist.getElementsByTagName("li");//list elements village
	active_village = FindActiveVillage(listVillage);
	village_id = Number(getParameterByName("newdid",active_village.getElementsByTagName("a")[0].getAttribute("href")));
}

console.log("uid:" + uid + "  ; gid:" + gid +"  ; village_id:" + village_id);

AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxActiveVillage.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxLinklist.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","builds.js"));
   AddUriCss(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.css"));

AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/hero.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/berichte_n_messages.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/allianz.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/dorf3.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/spieler.js"));