function calRange()
{
	var target_x = Number(TJS.getParameterByName(window.location.href,"x"));
	var target_y = Number(TJS.getParameterByName(window.location.href,"y"));
	
	var coordinatesGrid = TJS.CurrentData.active_village.getElementsByClassName("coordinatesGrid")[0];
	var current_x = Number(coordinatesGrid.getAttribute("data-x"));
	var current_y = Number(coordinatesGrid.getAttribute("data-y"));
	
	window.RangeToTarget = Math.sqrt(Math.pow(target_x - current_x,2) + Math.pow(target_y - current_y,2));
	
	var village_info = document.getElementById("village_info");
	var td5 = village_info.getElementsByTagName("td")[5];
	td5.innerText = RangeToTarget;
	
	
}


function position_details_main()
{
	if(window.location.href.indexOf("position_details.php") >=0)
	{
		calRange();
	}
}

position_details_main();