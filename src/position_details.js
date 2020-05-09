function calRange()
{
	var target_x = Number(TJS.getParameterByName(window.location.href,"x"));
	var target_y = Number(TJS.getParameterByName(window.location.href,"y"));
	
	var coordinatesGrid = TJS.CurrentData.active_village.getElementsByClassName("coordinatesGrid")[0];
	var current_x = Number(coordinatesGrid.getAttribute("data-x"));
	var current_y = Number(coordinatesGrid.getAttribute("data-y"));
	
	window.RangeToTarget = Math.sqrt(Math.pow(target_x - current_x,2) + Math.pow(target_y - current_y,2));
	
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
	
	th_TournamentSquare.innerHTML = "TS<br><input value=\"0\" min=\"0\" max=\"20\" type=\"number\" id=\"TJS_TournamentSquare\" onchange=\"TJS_onchange_caltime()\" style=\"width:50px\">"
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
		calRange();
	}
}

position_details_main();