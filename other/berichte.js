function berichte_clear_report()
{
	var e_div = berichte_input_sellect_all_1.parentElement;
	if(e_div !== null)
	{
		var e_clear = document.createElement("span");
		e_clear.innerText = "check all and delete";
		e_clear.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px");
		e_clear.setAttribute("onclick","berichte_clear_report_onclick()");
		e_div.insertAdjacentElement("afterend",e_clear);
	}	
}

function berichte_clear_report_onclick()
{
	if(window.confirm("Are you sure to clear reports?"))
	{
		berichte_input_sellect_all_1.click();
		var e_del = document.getElementById("del");
		if(e_del !== null) e_del.click();
	}
}

function berichte_count_res()
{
	var rAreas = document.getElementsByClassName("rArea");
	if(rAreas.length >= 4)
	{
		var count = 0;
		for(var i =0; i <4; i++) count += Number.parseInt(rAreas[i].innerText);
		
		var e_total  = document.createElement("span");
		e_total.innerText = "(Total:" + count + ")";
		var e_parent_rArea = rAreas[0].parentElement;
		e_parent_rArea.appendChild(e_total);
	}
}

function berichte_main()
{
	if(window.location.href.indexOf("berichte.php")>=0)
	{
		berichte_input_sellect_all_1 = document.getElementById("sAll1");
		if(berichte_input_sellect_all_1 !== null) berichte_clear_report();
		if(window.location.href.indexOf("id=") >=0) berichte_count_res();
	}
}

var berichte_input_sellect_all_1 = null;
berichte_main();