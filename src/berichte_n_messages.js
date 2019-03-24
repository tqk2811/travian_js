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
	var entityWrapper_resource = document.getElementsByClassName("resources");//res
	var rAreas = document.getElementsByClassName("rArea");//cranny
	if(entityWrapper_resource.length == 4)
	{
		var total = 0;
		var canraid = 0;
		var cranny = rAreas.length == 1 ? Number(rAreas[0].innerText) : 0;
		for(var i =0; i < entityWrapper_resource.length; i++) 
		{
			var r = Number(entityWrapper_resource[i].innerText);
			total += r;
			var canraid_c = r - cranny;
			if(canraid_c > 0) canraid += canraid_c;
		}		
		var e_total  = document.createElement("span");
		if(rAreas.length == 1) e_total.innerText = "Can Raid/Total: " + canraid + "/"  + total;
		else e_total.innerText = "Total: " + total;		
		//e_total.setAttribute("style","margin-left: 10px");
		var e_parent = entityWrapper_resource[0].parentElement.parentElement;
		e_parent.insertAdjacentElement("afterend",e_total);
	}
}

function berichte_main()
{
	if(window.location.href.indexOf("berichte.php")>=0 || window.location.href.indexOf("messages.php")>=0)
	{
		berichte_input_sellect_all_1 = document.getElementById("sAll1");
		if(berichte_input_sellect_all_1 !== null) berichte_clear_report();
		if(window.location.href.indexOf("id=") >=0) berichte_count_res();
	}
}

var berichte_input_sellect_all_1 = null;
berichte_main();