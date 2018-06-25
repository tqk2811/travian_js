var list_raidlist = [];
var e_sellect;
function spieler_addraidlist()
{	
	e_sellect = document.createElement("select");
	e_sellect.setAttribute("class","dropdown");
	for(var i = 0; i< list_raidlist.length; i++)
	{
		var e_option = document.createElement("option");
		e_option.setAttribute("value",list_raidlist[i]);
		e_option.innerText = list_raidlist[i];
		e_sellect.appendChild(e_option);
	}
	var villages = document.getElementById("villages");
	if(villages !== null) villages.insertAdjacentElement("beforebegin",e_sellect);
	
	
	
}


function spieler_main()
{
	if(window.location.href.indexOf("spieler.php")>=0)
	{
		var get_list_raidlist = localStorage.getItem(window.uid + "_list_raidlist");
		if(get_list_raidlist !== null) list_raidlist = JSON.parse(get_list_raidlist);
		if(list_raidlist.length > 0) spieler_addraidlist();
	}
}
spieler_main();