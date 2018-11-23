function berichte_clear_report()
{
	var e_div = berichte_input_sellect_all_1.parentElement;
	if(e_div !== null)
	{
		var e_clear = document.createElement("span");
		e_clear.innerText = "Clear all";
		e_clear.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px");
		e_clear.setAttribute("onclick","berichte_clear_report_onclick()");
		e_div.insertAdjacentElement("afterend",e_clear);
		
		var e_read = document.createElement("span");
		e_read.innerText = "Mask as read all";
		e_read.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px");
		e_read.setAttribute("onclick","berichte_read_report_onclick()");
		e_div.insertAdjacentElement("afterend",e_read);		
	}	
}

function berichte_clear_report_onclick()
{
	if(window.confirm("Are you sure to clear reports?"))
	{
		berichte_input_sellect_all_1.click();
		var e_del = document.getElementById("del");
		if(e_del == null) e_del = document.getElementById("delmsg");
		
		if(e_del !== null) e_del.click();
	}
}

function berichte_read_report_onclick()
{
	berichte_input_sellect_all_1.click();
	var e_read = document.getElementById("mark_as_read");
	if(e_read == null) e_read = document.getElementById("bulkread");
	
	if(e_read !== null) e_read.click();
}

function berichte_count_res()
{
	var rAreas = document.getElementsByClassName("rArea");
	if(rAreas.length == 5)
	{
		var total = 0;
		var canraid = 0;
		var cranny = Number.parseInt(rAreas[4].innerText);		
		for(var i =0; i <4; i++) 
		{
			total += Number.parseInt(rAreas[i].innerText);
			var canraid_c = Number.parseInt(rAreas[i].innerText) - cranny;
			if(canraid_c > 0) canraid += canraid_c;
		}		
		var e_total  = document.createElement("span");
		e_total.innerText = "  (Can Raid/Total: " + canraid + "/"  + total + ")";
		var e_parent_rArea = rAreas[0].parentElement;
		e_parent_rArea.insertAdjacentElement("afterend",e_total);
	}
}
function init_key_event()
{
	$(document).keypress(function(e)
	{
		if (e.ctrlKey ? 1 : 0 || e.altKey ? 1 : 0) return;// if alt or ctrl key press -> return
		//if(e.which==26 ? 0 : 1) return;//checkWebkitandIE		
		var nextkey_press = e.which == "n".charCodeAt(0) || e.which=="N".charCodeAt(0);
		var backkey_press = e.which == "b".charCodeAt(0) || e.which=="B".charCodeAt(0);
						
		if (nextkey_press) 
		{
			var next_e = document.getElementsByClassName("next");
			if(next_e.length > 0) next_e[0].click();
		}
		else if(backkey_press)
		{
			var back_e = document.getElementsByClassName("back");
			if(back_e.length > 0) back_e[0].click();
		}
	});
}


function berichte_main()
{
	if(window.location.href.indexOf("berichte.php")>=0 || window.location.href.indexOf("messages.php")>=0)
	{
		berichte_input_sellect_all_1 = document.getElementById("sAll1");
		if(berichte_input_sellect_all_1 !== null) berichte_clear_report();
		if(window.location.href.indexOf("id=") >=0) 
		{
			berichte_count_res();
			init_key_event();
		}
	}
}

var berichte_input_sellect_all_1 = null;
berichte_main();