var storage_linkerlisttop = localStorage.getItem("linkerlisttop") == "true";

var sidebarBoxLinklist_ = document.getElementById("sidebarBoxLinklist");
if(sidebarBoxLinklist_ !== null)
{
	if(storage_linkerlisttop == true) sidebarBeforeContent_swap(storage_linkerlisttop); 	
	var BoxLinklist_InnerBox = sidebarBoxLinklist_.getElementsByClassName("sidebarBoxInnerBox")[0];
	var innerBox_content = BoxLinklist_InnerBox.getElementsByClassName("innerBox content")[0];
	
	var linklistNotice_ = innerBox_content.getElementsByClassName("linklistNotice");	
	if(linklistNotice_.length > 0)
	{
		linklistNotice_[0].remove();
		window.ul_linkerlist = document.createElement("ul");
		innerBox_content.appendChild(ul_linkerlist);
		for(var i = 0;i < list_sidebarBoxLinklist.length;i++) AddLinkerList(list_sidebarBoxLinklist[i]);
	}
	window.checkbox_linkerlisttop = document.createElement("input");
	checkbox_linkerlisttop.setAttribute("type","checkbox");
	checkbox_linkerlisttop.checked = storage_linkerlisttop;
	checkbox_linkerlisttop.onchange = checkbox_linkerlisttop_change;	
	var label_checkbox_linkerlisttop = document.createElement("label");
	label_checkbox_linkerlisttop.innerText = "Bring to top";
	
	innerBox_content.appendChild(checkbox_linkerlisttop);
	innerBox_content.appendChild(label_checkbox_linkerlisttop);
}


function checkbox_linkerlisttop_change()
{
	localStorage.setItem("linkerlisttop",checkbox_linkerlisttop.checked);
	storage_linkerlisttop = checkbox_linkerlisttop.checked;
	sidebarBeforeContent_swap(checkbox_linkerlisttop.checked);
}

function sidebarBeforeContent_swap(flag)
{
	if(flag) MoveElementUp(sidebarBoxLinklist_,2);//move to top
	else MoveElementDown(sidebarBoxLinklist_,2);// back to bot
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