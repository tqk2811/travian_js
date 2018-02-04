//clear all trade route
var trading_routes = document.getElementById("trading_routes");
var sels = trading_routes.getElementsByClassName("sel");
for(var i = 0; i< sels.length; i++)
{
	var a = sels[i].getElementsByTagName("a")[0];
	a.click();
}

//add new trade route
//localStorage.setItem("trade_route_hour",0);
var village_id="";//village destination id
var r1 = 5000;
var r2 = 5000;
var r3 = 5000;
var r4 = 6000;
var repeat = 3;
var hr = parseInt(localStorage.getItem("trade_route_hour"));
if(hr === null || hr === undefined || hr !== -1)
{	
	var userHour = hr + 2;
	if(userHour > 23) { localStorage.setItem("trade_route_hour",-1);}
	else localStorage.setItem("trade_route_hour",userHour);
	window.location.href="/build.php?did_dest="+village_id+"&r1="+r1+"&r2="+r2+"&r3="+r3+"&r4="+r4+"&userHour="+hr+"&repeat="+repeat+"&a=1&t=0&trid=0&option=256&gid=17";
}

