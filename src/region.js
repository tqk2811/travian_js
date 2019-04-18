//if(window.location.href.indexOf("region.php") >= 0) region_();


function region_()
{
	progressbarpop();
}


function progressbarpop()
{
	var regionContainer = document.getElementById("regionContainer");
	if(regionContainer !== null)
	{
		var spans = regionContainer.getElementsByTagName("span");
		if(spans.length == 1)
		{
			var e_div = document.createElement("div");
			e_div.innerText = spans[0]._travianTooltip.text.match(/[0-9/]+$/)[0];
			spans[0].parentElement.insertAdjacentElement("beforebegin",e_div);
		}
	}
}