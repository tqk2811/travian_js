var ul_linkerlist;
var sidebarBoxLinklist_ = document.getElementById("sidebarBoxLinklist");
if(sidebarBoxLinklist_ !== null)
{
	var BoxLinklist_InnerBox = sidebarBoxLinklist_.getElementsByClassName("sidebarBoxInnerBox")[0];
	var innerBox_content = BoxLinklist_InnerBox.getElementsByClassName("innerBox content")[0];
	var linklistNotice_ = innerBox_content.getElementsByClassName("linklistNotice");
	if(linklistNotice_.length > 0)
	{
		linklistNotice_[0].remove();
		ul_linkerlist = document.createElement("ul");
		innerBox_content.appendChild(ul_linkerlist);
		for(var i = 0;i < list_sidebarBoxLinklist.length;i++) AddLinkerList(list_sidebarBoxLinklist[i]);
	}
}

function AddLinkerList(item)
{
    var li_ = document.createElement('li');
    var aTag = document.createElement('a');
    aTag.setAttribute('href',item[1]);
    aTag.innerHTML = item[0];
    li_.appendChild(aTag);
    ul_linkerlist.appendChild(li_);
}