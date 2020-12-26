Travian version 4.4  
![alt tag](https://github.com/tqk2811/travian_js/blob/master/preview/demo.png?raw=true)

Install [chrome extension](https://chrome.google.com/webstore/detail/ddbjnfjiigjmcpcpkmhogomapikjbjdk) (or [old version](https://chrome.google.com/webstore/detail/poakhlngfciodnhlhhgnaaelnpjljija)) and add script below to extension in your travian and click Save.  
Android? Install [kiwibrowser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) and install chrome extension  
![alt tag](https://cdn.rawgit.com/tqk2811/travian_js/24405543/example.png)

```
let list_sidebarBoxLinklist = [ // data for linker list (user can change it) [[Name,url],[Name2,url2],....]
    ["FarmList","/build.php?tt=99&id=39"],
    ["Att Comming","/build.php?gid=16&tt=1&filter=1&subfilters=1"]
];
UpdateNum = localStorage.getItem("UpdateNum");
AddUriScript(httpGetGithubCdnUri("libs.js"));

function AddUriScript(uri)
{
    let s = document.createElement('script');
    s.setAttribute("src",uri+"?UpdateNum="+UpdateNum);
    document.head.appendChild(s);
}
function httpGetGithubCdnUri(FilePath,GithubUser = "tqk2811",Project_name = "travian_js",Branch = "master")
{
	if(!UpdateNum)
	{
		UpdateNum = 0;
		localStorage.setItem("UpdateNum",0);
	}
    let sha_data = localStorage.getItem(GithubUser+"/"+Project_name+"/"+Branch+"/"+UpdateNum);//Check storage
    if(sha_data === null)
    {
		window.firstLoad = true;
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET","https://api.github.com/repos/"+GithubUser+"/"+Project_name+"/commits/"+Branch, false );
        xmlHttp.send();		
        let json_data = JSON.parse(xmlHttp.responseText);		
        sha_data = json_data.sha.substring(0,9);
        localStorage.setItem(GithubUser+"/"+Project_name+"/"+Branch+"/"+UpdateNum,sha_data);
    }
    return "https://cdn.rawgit.com/"+GithubUser+"/"+Project_name+"/"+sha_data+"/"+FilePath;
}
```

