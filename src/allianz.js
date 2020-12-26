function ally_roa_attackcount(){
	let allianceMembers = document.getElementsByClassName("allianceMembers");
	if(allianceMembers.length == 1){
		let attacks = allianceMembers[0].getElementsByClassName("attack");
		for(let  i = 0; i < attacks.length; i++ ){
			let counts= attacks[i].getAttribute("alt").split(" ");
			if(counts.length >= 1){
				let e_numattack = document.createElement("a1");
				e_numattack.setAttribute("style","color:red;");
				e_numattack.innerText = "( " + counts[0] + " ) ";
				attacks[i].insertAdjacentElement("beforebegin",e_numattack);
			}
		}
	}
}

let color_region_control = "#e3f9e3";
let color_region_50percent = "#f5e3f9";
let color_region_otherally = "#f9e3e3";
function ally_regionalTop5(){
	let regionalTop5 = document.getElementById("regionalTop5");
	if(regionalTop5){
		let titleInHeaders = document.getElementsByClassName("titleInHeader");		
		let curr_ally_tag = titleInHeaders[0].innerText.match(/(?<= - ).+$/);
		
		let trs = regionalTop5.getElementsByTagName("tr");
		let th = document.createElement("th");
		th.innerText = "Thông tin";
		trs[0].appendChild(th);
		
		for(let i = 1; i< trs.length; i++){
			let td = document.createElement("td");
			td.innerText = trs[i]._travianTooltip.text;//let title =   /^.+(?= )/
			td.setAttribute("style","font-size:" + TJS.Const.font_size + ";");
			trs[i].appendChild(td);
			
			let backcolor = color_region_otherally;			
			if(trs[i]._travianTooltip.text.indexOf(curr_ally_tag) == 0) backcolor = color_region_control;
			else if (trs[i]._travianTooltip.text.indexOf("50%") > 0) backcolor = color_region_50percent;
				
			let tds = trs[i].getElementsByTagName("td");
			for(let j = 0; j < tds.length; j++) tds[j].style.background = backcolor;
		}
	}
}

function ally_main(){
	if(window.location.href.indexOf("/alliance")>=0){
		if (TJS.CurrentData.tabs.length == 2 && 
		TJS.CurrentData.tab_MainActive.getAttribute("href").indexOf("/alliance/profile") >= 0 &&
		TJS.CurrentData.tab_SubActive.getAttribute("href").indexOf("st=members") >= 0) 
			ally_roa_attackcount();
		
		ally_regionalTop5();
	}
}
ally_main();