if(window.location.href.indexOf("karte.php") >= 0) manual_();


function manual_()
{
	var titleInHeaders = document.getElementsByClassName("titleInHeader");
	if(titleInHeaders.length == 1)
	{
		var checkbox_50 = document.createElement("input");
		checkbox_50.type = "checkbox";
		checkbox_50.id = "checkbox_50";
		checkbox_50.style = "margin-left: 50px;"
		if(localStorage["auto_zoom50"] !== undefined && localStorage["auto_zoom50"] !== "true") checkbox_50.checked = false;
		else checkbox_50.checked = true;
		checkbox_50.onchange = function(){ localStorage["auto_zoom50"] = this.checked;}
		
		var label_checkbox_50 = document.createElement("label");
		label_checkbox_50.setAttribute("for",checkbox_50.id);
		label_checkbox_50.innerText = "Auto zoom 50%";		
		
		titleInHeaders[0].appendChild(checkbox_50);
		titleInHeaders[0].appendChild(label_checkbox_50);
		if(checkbox_50.checked == true)
		{
			var zoom = getQueryVariable(window.location.href,"zoom");
			if(zoom == "1") document.getElementsByClassName("iconButton zoomOut")[0].click();
		}
	}
}