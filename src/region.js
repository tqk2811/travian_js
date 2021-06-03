// $(document).ready(region_)

function region_()
{
	if(window.location.href.indexOf("region.php") >= 0) progressbarpop();
}


function progressbarpop()
{
	let regionContainer = document.getElementById("regionContainer");
	if(regionContainer )
	{
		let spans = regionContainer.getElementsByTagName("span");
		if(spans.length == 1)
		{
			let e_div = document.createElement("div");
			e_div.innerText = spans[0]._travianTooltip.text.match(/[0-9/]+$/)[0];
			spans[0].parentElement.insertAdjacentElement("beforebegin",e_div);
		}
	}
}