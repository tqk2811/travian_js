var ul_linkerlist;
var list_sidebarBoxLinklist = [ //[Name,url]
    ["FarmList","/build.php?tt=99&id=39"],
    ["Att Comming","/build.php?gid=16&tt=1&filter=1&subfilters=1"],
    ["Green Attack Report","/berichte.php?t=1&opt=AAABAA=="],
    ["troopEscape","/build.php?tt=0&id=39"]
];
var sidebarBoxLinklist_ = document.getElementById("sidebarBoxLinklist");
var BoxLinklist_InnerBox = sidebarBoxLinklist_.getElementsByClassName("sidebarBoxInnerBox")[0];
var innerBox_content = BoxLinklist_InnerBox.getElementsByClassName("innerBox content")[0];
var linklistNotice_ = innerBox_content.getElementsByClassName("linklistNotice");
function AddLinkerList(item)
{
    var li_ = document.createElement('li');
    var aTag = document.createElement('a');
    aTag.setAttribute('href',item[1]);
    aTag.innerHTML = item[0];
    li_.appendChild(aTag);
    ul_linkerlist.appendChild(li_);
}
if( linklistNotice_!== null)
{
    linklistNotice_[0].remove();
    ul_linkerlist = document.createElement("ul");
    innerBox_content.appendChild(ul_linkerlist);
    for(var i = 0;i < list_sidebarBoxLinklist.length;i++) AddLinkerList(list_sidebarBoxLinklist[i]);
}
