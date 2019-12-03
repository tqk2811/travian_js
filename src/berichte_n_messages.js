function berichte_scouts_count_res()
{
	var entityWrapper_resource = document.getElementsByClassName("inlineIcon resources");//res
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
		e_total.setAttribute("style","margin-top: 5px;");
		var e_parent = entityWrapper_resource[0].parentElement.parentElement;
		e_parent.insertAdjacentElement("afterend",e_total);
	}
}
function berichte_scan_arr_troop(e){
	var result = [];
	var tds = e.getElementsByTagName("td");
	for(var i = 0; i < tds.length; i++) result.push(Number(tds[i].innerText));
	return result;
}

function berichte_count_troops_live(){
	var reportWrapper = document.getElementById("reportWrapper");
	if(reportWrapper == null) return;
	var tables = [	reportWrapper.getElementById("attacker"),
					reportWrapper.getElementById("defender")];
	
	for(var i = 0; i < tables.length; i++)
	{
		var tbodys = tables[i].getElementsByTagName("tbody");
		var arr_in = berichte_scan_arr_troop(tbodys[1]);
		var arr_out = berichte_scan_arr_troop(tbodys[2]);
		var tbody_live = document.createElement("tbody");
		tbody_live.innerHTML = "<tr class=\"\"><th></th></tr>";
		for(var j = 0; j < arr_in.length; j++){
			var td = document.createElement("td");
			td.innerText = (arr_in[j]-arr_out[j]).toString();
			tbody_live.children[0].appendChild(td);
		}
		tables[i].appendChild(tbody_live);
	}
}


function berichte_main()
{
	if(window.location.href.indexOf("berichte.php")>=0 || window.location.href.indexOf("messages.php")>=0)
	{
		administration = document.getElementsByClassName("administration");
		if(administration.length >= 1) TJS.MoveElementUp(administration[0],3);
		
		if(window.location.href.indexOf("id=") >=0) {
			berichte_scouts_count_res();
			berichte_count_troops_live();
		}
	}
}

var administration = null;
berichte_main();
