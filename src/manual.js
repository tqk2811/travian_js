if(window.location.href.indexOf("manual.php") >= 0) manual_();


function manual_()
{
	var tabItems = document.getElementsByClassName("tabItem");
	if(tabItems.length == 8)tabItems[4].innerText = "Hung";
}