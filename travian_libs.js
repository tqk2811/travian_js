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
String.prototype.format = function() {
  return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var tabActives = document.getElementsByClassName("container active");
var e_build = document.getElementById("build");
if(e_build !== null) {
	var gid_str = e_build.getAttribute("class").split(" ")[0];
	window.gid = Number(gid_str.substring(3,gid_str.length));
	console.log("gid:" + gid);
}
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxActiveVillage.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxLinklist.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","builds.js"));
AddUriCss(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.css"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/hero.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/berichte_n_messages.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/allianz.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/dorf3.js"));