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

//sidebarBoxActiveVillage
var sidebarBoxActiveVillage = document.getElementById("sidebarBoxActiveVillage");
var innerBox_header_sidebarBoxActiveVillage = sidebarBoxActiveVillage.getElementsByClassName("innerBox header ")[0];
var innerBox_header_sidebarBoxActiveVillage_script_arr = innerBox_header_sidebarBoxActiveVillage.getElementsByTagName("script");

var workshop_bt = document.getElementsByClassName("layoutButton workshopBlack gold  ")[0];
var stable_bt = document.getElementsByClassName("layoutButton stableBlack gold  ")[0];
var barracks_bt = document.getElementsByClassName("layoutButton barracksBlack gold  ")[0];
var market_bt = document.getElementsByClassName("layoutButton marketBlack gold  ")[0];

function Change_sidebarBoxActiveVillage_Button(element_name,uri,val_ = -1)
{
    if (element_name !== null && element_name !== undefined)
    {
        var attibute_class = element_name.getAttribute("class");
        if(attibute_class.search("disable") > 0) { return;}
        element_name.setAttribute("class",attibute_class.replace("Black","White").replace("gold","green"));
        element_name.setAttribute("onclick","Change_sidebarBoxActiveVillage_Button_onclick(\""+uri+"\")");
        if( val_ >= 0)
        { 
            //console.log(innerBox_header_sidebarBoxActiveVillage_script_arr[val_].innerHTML);
            //innerBox_header_sidebarBoxActiveVillage_script_arr[val_].remove();
        }
    }
}
function Change_sidebarBoxActiveVillage_Button_onclick(uri)
{
    window.location = uri;
}


Change_sidebarBoxActiveVillage_Button(workshop_bt,workshop,0);
Change_sidebarBoxActiveVillage_Button(stable_bt,stable,1);
Change_sidebarBoxActiveVillage_Button(barracks_bt,barracks,2);
Change_sidebarBoxActiveVillage_Button(market_bt,market,3);
