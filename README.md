# travian_ajax
Install [chrome extension](https://chrome.google.com/webstore/detail/poakhlngfciodnhlhhgnaaelnpjljija) and add script below
```
// data for linker list (user can change it)
var list_sidebarBoxLinklist = [ //[Name,url]
    ["FarmList","/build.php?tt=99&id=39"],
    ["Att Comming","/build.php?gid=16&tt=1&filter=1&subfilters=1"],
    ["Green Attack Report","/berichte.php?t=1&opt=AAABAA=="],
    ["troopEscape","/build.php?tt=0&id=39"]
];
var h = document.getElementsByTagName("head")[0];
var host_script = "https://cdn.rawgit.com/tqk2811/travian_js/";
function AddScript(filename)
{
    var s = document.createElement('script');
    s.setAttribute("src",host_script + filename);
    h.appendChild(s);
}
AddScript("29373eb9/libs.js");
```
