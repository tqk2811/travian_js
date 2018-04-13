Element.prototype.remove = function() 
{
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove=function()
{
    for(var i=this.length-1;i>= 0;i--)
    {
        if(this[i] && this[i].parentElement)
        {
            this[i].parentElement.removeChild(this[i]);
        }
    }
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
if(typeof debug != "undefined" && debug) window.onerror = function(message, source, lineno, colno, error) 
{ 
	alert("Error\nMessage:" + message + "\nSource:" + source + "\nAt Line " + lineno + " and Column " + colno); 
};
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxActiveVillage.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxLinklist.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","builds.js"));
AddUriCss(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.css"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/cost.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","other/hero.js"));