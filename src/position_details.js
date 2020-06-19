function calRange()
{
	var target_x = Number(TJS.getParameterByName(window.location.href,"x"));
	var target_y = Number(TJS.getParameterByName(window.location.href,"y"));
	
	var coordinatesGrid = TJS.CurrentData.active_village.getElementsByClassName("coordinatesGrid")[0];
	var current_x = Number(coordinatesGrid.getElementsByClassName("coordinateX")[0].innerText.match(/\d+/)[0]);
	var current_y = Number(coordinatesGrid.getElementsByClassName("coordinateY")[0].innerText.match(/\d+/)[0]);
	
	var range_X = Math.abs(target_x - current_x);
	var range_y = Math.abs(target_y - current_y);
	var max_xy = 200;
	var max_range_xy = 200 + 0.5;
	
	var realrange_X = range_X > max_range_xy ? max_range_xy - ( range_X - max_range_xy) : range_X;
	var realrange_Y = range_Y > max_range_xy ? max_range_xy - ( range_Y - max_range_xy) : range_Y;	
	
	window.RangeToTarget = Math.sqrt(Math.pow(realrange_X,2) + Math.pow(realrange_Y,2));
	
	var village_info = document.getElementById("village_info");
	var tbody = village_info.getElementsByTagName("tbody")[0];	
	var td_range = village_info.getElementsByTagName("td")[tbody.childElementCount - 1];
	td_range.innerText = RangeToTarget;
	var th_range = village_info.getElementsByTagName("th")[tbody.childElementCount - 1];
	th_range.innerHTML = "BaseSpeed<br><input value=\"0\" min=\"0\" max=\"200\" type=\"number\" id=\"TJS_BaseSpeed\" onchange=\"TJS_onchange_caltime()\" style=\"width:50px\">";
	
	var tr_TournamentSquare = document.createElement("tr");
	tbody.appendChild(tr_TournamentSquare);
	var th_TournamentSquare = document.createElement("th");
	var td_TournamentSquare = document.createElement("td");
	
	th_TournamentSquare.innerHTML = "Tournament Square<br><input value=\"0\" min=\"0\" max=\"20\" type=\"number\" id=\"TJS_TournamentSquare\" onchange=\"TJS_onchange_caltime()\" style=\"width:50px\">"
	td_TournamentSquare.setAttribute("id","td_TournamentSquare");
	td_TournamentSquare.innerText = "0";
	tr_TournamentSquare.appendChild(th_TournamentSquare);
	tr_TournamentSquare.appendChild(td_TournamentSquare);
}

function TJS_onchange_caltime()
{
	var TJS_BaseSpeed = Number(document.getElementById("TJS_BaseSpeed").value);
	var TJS_TournamentSquare = Number(document.getElementById("TJS_TournamentSquare").value);
	var td_TournamentSquare = document.getElementById("td_TournamentSquare");
	
	var range20 = window.RangeToTarget <= 20 ? window.RangeToTarget : 20;
	var time = range20 / TJS_BaseSpeed; //hours
	if(window.RangeToTarget > 20)
	{
		var time20p = (window.RangeToTarget - 20) / TJS_BaseSpeed / (1 + 0.2* TJS_TournamentSquare);
		time = time + time20p;
	}
	td_TournamentSquare.innerText = TJS.GetTimeTextFromHour(time);
}


function position_details_main()
{
	if(window.location.href.indexOf("position_details.php") >=0)
	{
		var map_details = document.getElementById("map_details");
		var h4 = map_details.getElementsByTagName("h4");
		h4.remove();
		var cb = document.createElement("input");
		cb.setAttribute("type","checkbox");
		TJS.InitCheckboxOnclick(cb,"position_details_calRange",function(){window.location.href = window.location.href;},true);
		var lb_cb = document.createElement("label");
		lb_cb.innerText = "adv cal";
		lb_cb.setAttribute("style","border:none;color:black;padding: 3px;");			
		lb_cb.appendChild(cb);
		map_details.insertAdjacentElement("afterbegin",lb_cb);
		
		
		
		
		if(cb.checked) calRange();
	}
}

position_details_main();