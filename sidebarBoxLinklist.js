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
var market = "/build.php?gid=17";
var barracks = "/build.php?gid=19";
var stable = "/build.php?gid=20";
var workshop = "/build.php?gid=21";
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

    AddLinkerList("Farm list",farmlist,ul_linkerlist);
    AddLinkerList("Att đến làng",incoming_attack,ul_linkerlist);
    AddLinkerList("Safe report",safe_attack_report,ul_linkerlist);
}
