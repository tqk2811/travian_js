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
function AddGithubScript(user,project_name,branch,file_path)
{
    var s = document.createElement('script');
    s.setAttribute("src",httpGetGithubCdnUri(user,project_name,branch,file_path));
    h.appendChild(s);
}
