function calRange()
{
	let target_x = Number(TJS.getParameterByName(window.location.href,"x"));
	let target_y = Number(TJS.getParameterByName(window.location.href,"y"));
	
	let coordinatesGrid = TJS.CurrentData.active_village.getElementsByClassName("coordinatesGrid")[0];
	let coordinateX = coordinatesGrid.getElementsByClassName("coordinateX")[0].innerText;
	let coordinateY = coordinatesGrid.getElementsByClassName("coordinateY")[0].innerText;
	let current_x = Number(coordinateX.match(/\d+/)[0]);
	let current_y = Number(coordinateY.match(/\d+/)[0]);
	
	if(coordinateX.search("−") >= 0) current_x = -current_x;
	if(coordinateY.search("−") >= 0) current_y = -current_y;
	
	let range_x = Math.abs(target_x - current_x);
	let range_y = Math.abs(target_y - current_y);
	let max_range_xy = TravianDefaults.Map.Size.width / 2;
	
	let realrange_x = range_x > max_range_xy ? max_range_xy - ( range_x - max_range_xy) : range_x;
	let realrange_y = range_y > max_range_xy ? max_range_xy - ( range_y - max_range_xy) : range_y;	
	
	window.RangeToTarget = Math.sqrt(Math.pow(realrange_x,2) + Math.pow(realrange_y,2));
	
	let tbody = null;
	let td_range = null;
	let th_range = null;
	let village_info = document.getElementById("village_info");
	if(village_info) 
	{
		tbody = village_info.getElementsByTagName("tbody")[0];
		td_range = village_info.getElementsByTagName("td")[tbody.childElementCount - 1];
		th_range = village_info.getElementsByTagName("th")[tbody.childElementCount - 1];
	}
	else
	{
		tbody = document.getElementById("map_details").getElementsByTagName("tbody")[1];
		let rangerow = tbody.getElementsByTagName("td");
		td_range = rangerow[1];
		th_range = rangerow[0];
	}
	
	td_range.innerText = RangeToTarget;
	th_range.innerHTML = "BaseSpeed<br><input value=\"0\" min=\"0\" max=\"200\" type=\"number\" id=\"TJS_BaseSpeed\" onchange=\"TJS_onchange_caltime()\" style=\"width:50px\">";
	
	let tr_TournamentSquare = document.createElement("tr");
	tbody.appendChild(tr_TournamentSquare);
	let th_TournamentSquare = document.createElement("th");
	let td_TournamentSquare = document.createElement("td");
	
	th_TournamentSquare.innerHTML = "Tournament Square<br><input value=\"0\" min=\"0\" max=\"20\" type=\"number\" id=\"TJS_TournamentSquare\" onchange=\"TJS_onchange_caltime()\" style=\"width:50px\">"
	td_TournamentSquare.setAttribute("id","td_TournamentSquare");
	td_TournamentSquare.innerText = "0";
	tr_TournamentSquare.appendChild(th_TournamentSquare);
	tr_TournamentSquare.appendChild(td_TournamentSquare);
	
}

function TJS_onchange_caltime()
{
	let TJS_BaseSpeed = Number(document.getElementById("TJS_BaseSpeed").value);
	let TJS_TournamentSquare = Number(document.getElementById("TJS_TournamentSquare").value);
	let td_TournamentSquare = document.getElementById("td_TournamentSquare");
	
	let range20 = window.RangeToTarget <= 20 ? window.RangeToTarget : 20;
	let time = range20 / TJS_BaseSpeed; //hours
	if(window.RangeToTarget > 20)
	{
		let time20p = (window.RangeToTarget - 20) / TJS_BaseSpeed / (1 + 0.2* TJS_TournamentSquare);
		time = time + time20p;
	}
	td_TournamentSquare.innerText = TJS.GetTimeTextFromHour(time);
}


function position_details_main()
{
	if(window.location.href.indexOf("position_details.php") >=0)
	{
		let map_details = document.getElementById("map_details");
		let h4 = map_details.getElementsByTagName("h4");
		h4.remove();
		
		let div = document.createElement("div");
		map_details.insertAdjacentElement("afterbegin",div);		
		
		let cb = document.createElement("input");
		cb.setAttribute("type","checkbox");
		TJS.InitCheckboxOnclick(cb,"position_details_calRange",function(){window.location.href = window.location.href;},true);
		let lb_cb = document.createElement("label");
		lb_cb.innerText = "adv cal";
		lb_cb.setAttribute("style","border:none;color:black;padding: 3px;");			
		lb_cb.appendChild(cb);
		div.appendChild(lb_cb);
		
		if(cb.checked) calRange();
	}
}

position_details_main();