# travian_ajax
Install [chrome extension](https://chrome.google.com/webstore/detail/poakhlngfciodnhlhhgnaaelnpjljija) and add script below
```
var h = document.getElementsByTagName("head")[0];
var host_script = "https://rawgit.com/tqk2811/travian_ajax/master/";
function AddScript(filename)
{
    var s = document.createElement('script');
    s.setAttribute("src",host_script + filename);
    h.appendChild(s);
}
AddScript("lib.js");
```
