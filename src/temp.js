function gid17_CreateTradeRoutes_click(){
	if(document.getElementById("tradeRouteError").innerText.trim().length == 0 && window.confirm("Confirm Create TradeRoutes?"))
	{
		var obj = {};		
		var arr_ = ["trade_route_destination","r1","r2","r3","r4","repeat","hour_end","minute_end","hour_step","minute_step","every"];
		for(var i =0; i < arr_.length; i++) obj[arr_[i]] = Number(document.getElementById(arr_[i]).value);
		
		var trade_route_mode_send = document.getElementById("trade_route_mode_send");
		if(trade_route_mode_send.checked) obj["trade_route_mode"] = "send";
		else obj["trade_route_mode"] = "deliver";
		
		obj["hour"] = Number(document.getElementsByName("hour")[0].value);
		obj["minute"] = Number(document.getElementsByName("minute")[0].value);
		
		localStorage.setItem("trade_route",JSON.stringify(obj));
		gid17_CreateTradeRoutes_load();
	}
	return false;
}
function gid17_CreateTradeRoutes_load(){
	if(TJS.CurrentData.Gid != 17) 
	{
		localStorage.removeItem("trade_route");
		return;
	}
	var trade_route_str = localStorage.getItem("trade_route");
	if(trade_route_str !== null)
	{
		var obj = JSON.parse(trade_route_str);
		var tmp_hr = obj["hour"];
		var tmp_min = obj["minute"];
		
		var time_start = obj["hour"] * 60 + obj["minute"];
		var time_end = obj["hour_end"] * 60 + obj["minute_end"];
		var time_step = obj["hour_step"] * 60 + obj["minute_step"];
		if(time_step == 0){localStorage.removeItem("trade_route");return;}
		if(time_start < time_end)
		{
			time_start += time_step;
			if(time_start > time_end) localStorage.removeItem("trade_route");
			else
			{
				obj["minute"] = time_start % 60;
				obj["hour"] = (time_start - obj["minute"]) / 60;
				localStorage.setItem("trade_route",JSON.stringify(obj));
			}
			window.location.href=gid17_base_uri_traderoute.format(
							obj["trade_route_destination"],obj["r1"],obj["r2"],obj["r3"],obj["r4"],
							obj["trade_route_mode"],tmp_hr,tmp_min,obj["repeat"],obj["every"]);
		}else localStorage.removeItem("trade_route");
	}
}