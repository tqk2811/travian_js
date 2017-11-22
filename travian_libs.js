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
  /* returns the value of the element style of the rule in the stylesheet
  *  If no value is given, reads the value
  *  If value is given, the value is changed and returned
  *  If '' (empty string) is given, erases the value.
  *  The browser will apply the default one
  *
  * string stylesheet: part of the .css name to be recognized, e.g. 'default'
  * string selectorText: css selector, e.g. '#myId', '.myClass', 'thead td'
  * string style: camelCase element style, e.g. 'fontSize'
  * string value optionnal : the new value
  */
  var CCSstyle = undefined, rules;
  for(var m in document.styleSheets){
    if(document.styleSheets[m] !== null || document.styleSheets[m] !== undefined)
    {
      if(document.styleSheets[m].href.indexOf(stylesheet) != -1)
      {
        rules = document.styleSheets[m][document.all ? 'rules' : 'cssRules'];
        for(var n in rules){if(rules[n].selectorText == selectorText){CCSstyle = rules[n].style; break;}}
        break;
      }
    }
  }
  if(value == undefined)
    return CCSstyle[style]
  else
    return CCSstyle[style] = value
}

AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxActiveVillage.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_plus/sidebarBoxLinklist.js"));
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","taskhelper/task_helper.js"));
