# travian_ajax
Install [chrome extension](https://chrome.google.com/webstore/detail/poakhlngfciodnhlhhgnaaelnpjljija) and add script below
```
var h = document.getElementsByTagName("head")[0];
var host_script = "https://cdn.rawgit.com/tqk2811/travian_ajax/master/";
function AddScript(url)
{
    var s = document.createElement('script');
    s.setAttribute("src",host_script + url);
    h.appendChild(s);
}
AddScript("main.js");
```
