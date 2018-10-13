var list_raidlist = [];
var e_sellect;
function spieler_addraidlist()
{	
	e_sellect = document.createElement("select");
	e_sellect.setAttribute("class","dropdown");
	for(var i = 0; i< list_raidlist.length; i++)
	{
		var e_option = document.createElement("option");
		e_option.setAttribute("value",list_raidlist[i][0]);
		e_option.innerText = list_raidlist[i][1];
		e_sellect.appendChild(e_option);
	}
	var villages = document.getElementById("villages");
	if(villages !== null) 
	{
		villages.insertAdjacentElement("beforebegin",e_sellect);
		
		var e_th = document.createElement("th");
		e_th.width = "20px";
		e_th.innerText = "Add FarmList";
		villages.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].insertAdjacentElement("beforeend",e_th);
		
		var e_coords = villages.getElementsByClassName("coords");
		for(var i =0; i < e_coords.length; i++)
		{
			var uri_ = e_coords[i].getElementsByTagName("a")[0].href;
			var x_ = getParameterByName("x",uri_);
			var y_ = getParameterByName("y",uri_);
						
			var e_button = document.createElement("button");
			e_button.innerText = "Add";
			e_button.setAttribute("style","background-color:green;border:none;color:white;");
			e_button.setAttribute("onclick","Travian.Game.RaidList.addSlotPopupWrapper(e_sellect.value.toString(), '"+x_+"', '"+y_+"'); return false;");
			
			var e_td = document.createElement("td");
			e_td.appendChild(e_button);
			e_coords[i].insertAdjacentElement("afterend",e_td);
		}
	}
}


function spieler_main()
{
	if(window.location.href.indexOf("spieler.php")>=0)
	{
		var get_list_raidlist = localStorage.getItem(window.Current.Uid + "_list_raidlist");
		if(get_list_raidlist !== null) list_raidlist = JSON.parse(get_list_raidlist);
		if(list_raidlist.length > 0) spieler_addraidlist();
	}
}
spieler_main();