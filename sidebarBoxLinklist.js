Element.prototype.remove = function() 
{
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove=function()
{
    for(var i=this.length-1;i>= 0;i--)
    {
        if(this[i] && this[i].parentElement)
        {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
function AddLinkerList(name,uri,parent)
{
    var li_ = document.createElement('li');
    var aTag = document.createElement('a');
    aTag.setAttribute('href',uri);
    aTag.innerHTML = name;
    li_.appendChild(aTag);
    parent.appendChild(li_);
}

//Linker list
//[Name,url]
var list = [
    ["FarmList","/build.php?tt=99&id=39"],
    ["Att Comming","/build.php?gid=16&tt=1&filter=1&subfilters=1"],
    ["Green Attack Report","/berichte.php?t=1&opt=AAABAA=="]
];

var farmlist = "/build.php?tt=99&id=39";
var incoming_attack = "/build.php?gid=16&tt=1&filter=1&subfilters=1";
var safe_attack_report = "/berichte.php?t=1&opt=AAABAA==";

var sidebarBoxLinklist_ = document.getElementById("sidebarBoxLinklist");
var BoxLinklist_InnerBox = sidebarBoxLinklist_.getElementsByClassName("sidebarBoxInnerBox")[0];
var innerBox_content = BoxLinklist_InnerBox.getElementsByClassName("innerBox content")[0];
var linklistNotice_ = innerBox_content.getElementsByClassName("linklistNotice");
if( linklistNotice_!== null)
{
    linklistNotice_[0].remove();
    var ul_linkerlist = document.createElement("ul");
    innerBox_content.appendChild(ul_linkerlist);
    
    var i,length;
    length = list.length;
    for(i = 0;i < length;i++)
    {
        AddLinkerList(list[i][0],list[i][1]);
    }
}
