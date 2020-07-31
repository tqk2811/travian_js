//if(window.location.href.indexOf("manual.php") >= 0) manual_();


function manual_()
{
	let tabItems = document.getElementsByClassName("tabItem");
	if(tabItems.length == 8)
	{
		tabItems[0].innerText = "Roman";
		tabItems[1].innerText = "Teuton";
		tabItems[2].innerText = "Gaul";
		tabItems[3].innerText = "Egypt";
		tabItems[4].innerText = "Huns";
	}
}