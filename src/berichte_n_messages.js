function berichte_scouts_count_res(){
	let entityWrapper_resource = document.getElementsByClassName("inlineIcon resources");//res
	let rAreas = document.getElementsByClassName("rArea");//cranny
	if(entityWrapper_resource.length == 4)
	{
		let total = 0;
		let canraid = 0;
		let cranny = rAreas.length == 1 ? Number(rAreas[0].innerText) : 0;
		for(let i =0; i < entityWrapper_resource.length; i++) 
		{
			let r = Number(entityWrapper_resource[i].innerText);
			total += r;
			let canraid_c = r - cranny;
			if(canraid_c > 0) canraid += canraid_c;
		}		
		let e_total  = document.createElement("span");
		if(rAreas.length == 1) e_total.innerText = "Can Raid/Total: " + canraid + "/"  + total;
		else e_total.innerText = "Total: " + total;		
		//e_total.setAttribute("style","margin-left: 10px");
		e_total.setAttribute("style","margin-top: 5px;");
		let e_parent = entityWrapper_resource[0].parentElement.parentElement;
		e_parent.insertAdjacentElement("afterend",e_total);
	}
}
function berichte_scan_arr_troop(e){
	let result = [];
	let tds = e.getElementsByTagName("td");
	for(let i = 0; i < tds.length; i++) result.push(Number(tds[i].innerText));
	return result;
}
function berichte_count_troops_live(){
	//let reportWrapper = document.getElementById("reportWrapper");
	//if(!reportWrapper) return;
	let tables = [	document.getElementById("attacker"),
					document.getElementById("defender")];
	let def_reinfs = document.getElementsByClassName("defender reinforcement");
	for(let i = 0; i < def_reinfs.length; i++) tables.push(def_reinfs[i]);
	
	for(let i = 0; i < tables.length; i++)
	{
		if(!tables[i]) continue;
		let tbodys = tables[i].getElementsByTagName("tbody");
		if(tbodys.length >= 3)// 3 nomal, 2: ???, 4 trap gaul
		{ 
			let arr_in = berichte_scan_arr_troop(tbodys[1]);
			let arr_out = berichte_scan_arr_troop(tbodys[2]);
			let arr_trap;
			if(tbodys.length == 4) arr_trap = berichte_scan_arr_troop(tbodys[3]);
		
			let tbody_live = document.createElement("tbody");
			tbody_live.setAttribute("class","units");
			tbody_live.innerHTML = "<tr><th>Live</th></tr>";
			for(let j = 0; j < arr_in.length; j++){
				let td = document.createElement("td");
				td.innerText = (arr_in[j]-arr_out[j] - (tbodys.length == 4 ? arr_trap[j] : 0)).toString();
				tbody_live.children[0].appendChild(td);
			}
			tables[i].appendChild(tbody_live);
		}
	}
}

function berichte_clear()
{
	let label_clear = document.createElement("label");
	label_clear.setAttribute("style","background-color:green;float:right;color:white;margin-right: 200px;");
	label_clear.setAttribute("onclick","berichte_clear_onclick()");
	label_clear.innerText = "Clear";
	
	let paginator = document.getElementsByClassName("paginator");
	if(paginator.length > 0) paginator[0].insertAdjacentElement("afterend",label_clear);
}
function berichte_clear_onclick()
{
	if(window.confirm("Delete all in this page?"))
	{
		$("#sAll1").click();
		$("#reportsForm button[value='delete']").click();
	}
}



function berichte_main()
{
	if(window.location.href.indexOf("report")>=0 || window.location.href.indexOf("messages")>=0)
	{
		administration = document.getElementsByClassName("administration");
		if(administration.length >= 1) TJS.MoveElementUp(administration[0],3);
		
		berichte_clear();
		
		if(window.location.href.indexOf("id=") >=0) {
			berichte_scouts_count_res();
			berichte_count_troops_live();
		}
	}
}

let administration = null;
berichte_main();
