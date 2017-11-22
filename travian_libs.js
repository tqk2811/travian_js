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
function CCSStylesheetRuleStyle(stylesheet, selectorText, style, value){
  var CCSstyle = undefined, rules;
  for(var m in document.styleSheets){
    if(document.styleSheets[m].href === stylesheet)
    {
      rules = document.styleSheets[m][document.all ? 'rules' : 'cssRules'];
      for(var n in rules){if(rules[n].selectorText == selectorText){CCSstyle = rules[n].style; break;}}
      break;      
    }
  }
  if(value === undefined)
    return CCSstyle[style]
  else
    return CCSstyle[style] = value
}

AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxActiveVillage.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxLinklist.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.js"));
