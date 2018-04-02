
function CreateTradeRoutes()
{
	var hr = parseInt(localStorage.getItem("trade_route_hour"));
	if(hr !== -1)
	{	
		var userHour = hr + trade_routes[6];
		if(userHour > 23) { localStorage.setItem("trade_route_hour",-1);}
		else localStorage.setItem("trade_route_hour",userHour);
		window.location.href="/build.php?did_dest="+trade_routes[0]+"&r1="+trade_routes[1]+"&r2="+trade_routes[2]+"&r3="+trade_routes[3]+"&r4="+trade_routes[4]+"&userHour="+hr+"&repeat="+trade_routes[5]+"&a=1&t=0&trid=0&option=256&gid=17";
	}
}

var hr_temp = localStorage.getItem("trade_route_hour");
if(hr_temp === undefined || hr_temp === null) localStorage.setItem("trade_route_hour",-1);
CreateTradeRoutes();

if(Flag_deleteAll_Trading_routes)
{
	var trading_routes = document.getElementById("trading_routes");
	if(trading_routes !== null |trading_routes !== undefined)
	{
		var sels = trading_routes.getElementsByClassName("sel");
		if(sels !== null && sels !==undefined && sels.length >0)
		{
			var a_tr = sels[0].getElementsByTagName("a");
			if(a_tr !== null && a_tr !== undefined && a_tr.length >0 )a_tr.click();
		}
	}
}