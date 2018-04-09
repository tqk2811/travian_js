function Get_gid()
{
	var gid_str = e_build.getAttribute("class").split(" ")[0];
	var gid = Number(gid_str.substring(3,gid_str.length));
	console.log("gid:" + gid);
	switch(gid)
	{
		case 19: gid19(); return;
		
		default: return;
	}
}


function gid19()
{
	var descriptionAndInfo = document.getElementById("descriptionAndInfo");
	if(descriptionAndInfo !== null && descriptionAndInfo !== undefined)
	{
		var button_clear = document.createElement("button");
		button_clear.SetAttribute("Text","Clear All Trade Route");
		button_clear.SetAttribute("onclick","gid19_clear_onclick()");
		descriptionAndInfo.appendChild(button_clear);
	}
	
}
function gid19_clear_onclick(){	localStorage.setItem("Flag_deleteAll_Trading_routes",1);}
function gid19_clear()
{
	var flag = localStorage.getItem("Flag_deleteAll_Trading_routes");
	if(flag !== null && flag !== undefined && flag + 0 != 0)	
	{
		var trading_routes = document.getElementById("trading_routes");
		if(trading_routes !== null |trading_routes !== undefined)
		{
			var sels = trading_routes.getElementsByClassName("sel");
			if(sels !== null && sels !==undefined )
			{
				if(sels.length >0)
				{
					var a_tr = sels[0].getElementsByTagName("a");
					if(a_tr !== null && a_tr !== undefined && a_tr.length >0 )a_tr[0].click();
				}else localStorage.setItem("Flag_deleteAll_Trading_routes",0);
			}
		}
	}
}


gid19_clear();

var tabActive = document.getElementsByClassName("container active");
var e_build = document.getElementById("build");
if(e_build !== null && e_build !== undefined) Get_gid();