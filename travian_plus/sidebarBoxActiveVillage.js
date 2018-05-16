function Change_sidebarBoxActiveVillage_Button(index)
{
	var item = list_sidebarBoxActiveVillage[index];
	if (item.length > 0 && item[0] !== undefined)
	{
		var attibute_class = item[0].getAttribute("class");
		if(attibute_class.search("disable") > 0) { return;}
		item[0].setAttribute("class",attibute_class.replace("Black","White").replace("gold","green"));
		item[0].setAttribute("onclick","Change_sidebarBoxActiveVillage_Button_onclick(\""+item[1]+"\")");
		$("#"+item[0].id).off("click");
	}
}
function Change_sidebarBoxActiveVillage_Button_onclick(uri){window.location = uri;}

var list_sidebarBoxActiveVillage = [
	[document.getElementsByClassName("layoutButton workshopBlack gold  ")[0],"/build.php?gid=21"],//workshop
	[document.getElementsByClassName("layoutButton stableBlack gold  ")[0],"/build.php?gid=20"],//stable
	[document.getElementsByClassName("layoutButton barracksBlack gold  ")[0],"/build.php?gid=19"],//barracks
	[document.getElementsByClassName("layoutButton marketBlack gold  ")[0],"/build.php?gid=17"]//market
]
var sidebarBoxActiveVillage = document.getElementById("sidebarBoxActiveVillage");
if(sidebarBoxActiveVillage !== null)
{
	var innerBox_header_sidebarBoxActiveVillage = sidebarBoxActiveVillage.getElementsByClassName("innerBox header ")[0];
	for(var i = 0; i < list_sidebarBoxActiveVillage.length; i++) Change_sidebarBoxActiveVillage_Button(i);
}