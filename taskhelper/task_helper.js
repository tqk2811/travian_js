function LoadLiBuildTimer(e,time,flag,color_)
{
  if(time-window.Current.current_SecondFrom1970 <= 0) return;
  var t = document.createElement("span");
  if(flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "-";//ー
    e.appendChild(t2);
  }
  t.setAttribute("style","color:" + color_);
  t.setAttribute("sound",true);
  t.setAttribute("value",time - window.Current.current_SecondFrom1970);
  e.appendChild(t);  
  window.Current.Timers.push(t);
}
function ShowVillageData(li_element)
{
	var a_element = li_element.getElementsByTagName("a")[0];
	var a_element_href = a_element.getAttribute("href");
	var id_li_element = getQueryVariable(a_element_href,"newdid");	
	var village_object = GetVillageObject(id_li_element);
		
	var e_p1 = document.createElement("p1");
	e_p1.setAttribute("style","font-size:"+font_size);
	li_element.appendChild(e_p1);
	var flag = false;
	var j = 0;
	for(var i = 0; i < village_data.Builds.length; i++) 
	{
		if(village_data.Builds[i] < current_SecondFrom1970) continue;
		LoadLiBuildTimer(e_p1,village_data.Builds[i],flag,task_helper_color_list[j]);
		flag = true;
		j++;
	}
}

var task_helper_color_list = ["Blue","BlueGray","Gray"];
if(window.Current.active_village !== null) for(var i =0; i < window.Current.listVillage.length; i++) ShowVillageData(window.Current.listVillage[i]);