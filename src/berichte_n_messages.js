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
		administration = document.getElementsByClassName("administration");
		if(administration.length == 1) TJS.MoveElementUp(administration[0],3);
		//if(window.location.href.indexOf("id=") >=0) berichte_count_res();
	}
}

var administration = null;
berichte_main();
