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
