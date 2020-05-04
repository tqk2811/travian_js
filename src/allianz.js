function ally_roa_attackcount(){
	var allianceMembers = document.getElementsByClassName("allianceMembers");
	if(allianceMembers.length == 1){
		var attacks = allianceMembers[0].getElementsByClassName("attack");
		for(var  i = 0; i < attacks.length; i++ ){
			var counts= attacks[i].getAttribute("alt").split(" ");
			if(counts.length >= 1){
				var e_numattack = document.createElement("a1");
				e_numattack.setAttribute("style","color:red;");
				e_numattack.innerText = "( " + counts[0] + " ) ";
				attacks[i].insertAdjacentElement("beforebegin",e_numattack);
			}
		}
	}
}

var color_region_control = "#e3f9e3";
var color_region_50percent = "#f5e3f9";
var color_region_otherally = "#f9e3e3";
function ally_regionalTop5(){
	var regionalTop5 = document.getElementById("regionalTop5");
	if(regionalTop5){
		var titleInHeaders = document.getElementsByClassName("titleInHeader");		
		var curr_ally_tag = titleInHeaders[0].innerText.match(/(?<= - ).+$/);
		
		var trs = regionalTop5.getElementsByTagName("tr");
		var th = document.createElement("th");
		th.innerText = "Thông tin";
		trs[0].appendChild(th);
		
		for(var i = 1; i< trs.length; i++){
			var td = document.createElement("td");
			td.innerText = trs[i]._travianTooltip.text;//var title =   /^.+(?= )/
			td.setAttribute("style","font-size:" + window.font_size + ";");
			trs[i].appendChild(td);
			
			var backcolor = color_region_otherally;			
			if(trs[i]._travianTooltip.text.indexOf(curr_ally_tag) == 0) backcolor = color_region_control;
			else if (trs[i]._travianTooltip.text.indexOf("50%") > 0) backcolor = color_region_50percent;
				
			var tds = trs[i].getElementsByTagName("td");
			for(var j = 0; j < tds.length; j++) tds[j].style.background = backcolor;
		}
	}
}

function ally_main(){
	if(window.location.href.indexOf("allianz.php")>=0){
		if (TJS.CurrentData.tabs.length == 2 && 
			TJS.CurrentData.tab_MainActive.getAttribute("href").indexOf("s=1") >= 0 &&
			TJS.CurrentData.tab_SubActive.getAttribute("href").indexOf("action=members") >= 0
			) ally_roa_attackcount();
		ally_regionalTop5();
	}
}
ally_main();