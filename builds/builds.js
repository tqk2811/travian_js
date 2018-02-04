function Get_gid()
{
	var gid_str = e_build.getAttribute("class").split(" ")[0];
	var gid = Number(gid_str.substring(3,gid_str.length - 3));
	switch(gid)
	{
		case 19: gid19(); return;
		
		default: return;
	}
}

function gid19()
{
	var marketSend = document.getElementById("marketSend");
	var destination_marketSend = marketSend.getElementsByClassName("destination")[0];
	
}


var e_build = document.getElementById("build");
if(e_build !== null && e_build !== undefined) Get_gid();