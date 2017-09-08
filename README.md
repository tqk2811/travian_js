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
function AddUriScript(uri)
{
    var s = document.createElement('script');
    s.setAttribute("src",uri);
    h.appendChild(s);
}
function httpGetGithubCdnUri(user,project_name,branch,file_path)
{    
    var sha_data = localStorage.getItem(user + "/" + project_name + "/" + branch);//Check storage
    if(sha_data == null)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET","https://api.github.com/repos/" + user + "/" + project_name + "/commits/" + branch, false );
        xmlHttp.send();		
        var json_data = JSON.parse(xmlHttp.responseText);		
		if(json_data.sha !== null && json_data.sha !== undefined)
		{
			sha_data = json_data.sha.substring(0,9);
			localStorage.setItem(user + "/" + project_name + "/" + branch,sha_data);
		} else return null;
    }
	return "https://cdn.rawgit.com/"+user+"/"+project_name+"/"+sha_data+"/"+file_path;
}
AddUriScript(httpGetGithubCdnUri("tqk2811","travian_js","master","travian_libs.js"));
```

