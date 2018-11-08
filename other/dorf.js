function dorf3_icon_count()
{
	var dorf3overview = document.getElementById("overview");
	if(dorf3overview !== null)
	{
		var att1s = dorf3overview.getElementsByClassName("att1");
		for(var i = 0; i < att1s.length; i++)
		{
			var counts= att1s[i].getAttribute("alt").split(" ");
			if(counts.length >= 1)
			{
				var e_numattack = document.createElement("a1");
				e_numattack.setAttribute("style","color:red;");
				e_numattack.innerText = "( " + counts[0] + " ) ";
				att1s[i].insertAdjacentElement("beforebegin",e_numattack);
			}
		}
		
		var units = dorf3overview.getElementsByClassName("unit");
		for(var i = 0; i < units.length; i++)
		{
			var counts= units[i].getAttribute("alt").split(" ");
			if(counts.length >= 1)
			{
				var e_numattack = document.createElement("a1");
				//e_numattack.setAttribute("style","color:red;");
				e_numattack.innerText = counts[0];
				units[i].insertAdjacentElement("beforebegin",e_numattack);
			}
		}		
	}
}

var troop_train_child_div_style = "float: left; width:25%;";
var troop_train_timer = [];

function troop_train_show()
{
	var stockBar = document.getElementById("stockBar");
	var main_div = document.createElement("div");
	main_div.setAttribute("style","height:100%; width:100%; overflow: hidden; margin-top:10px;");
	
	var div_barack = document.createElement("div");// gid 19,29
	div_barack.setAttribute("style",troop_train_child_div_style);
	var barack_19 = localStorage.getItem("troop_train_checkbox_" + window.Current.VillageId + "_19");
	if(barack_19 !== null && Number(barack_19) == 1) troop_train_add_child(div_barack,"Barrack",19);
	
	var barack_29 = localStorage.getItem("troop_train_checkbox_" + window.Current.VillageId + "_29");	
	if(barack_29 !== null && Number(barack_29) == 1) troop_train_add_child(div_barack,"GBarrack",29);
	
	
	var div_stable = document.createElement("div");// gid 20,30
	div_stable.setAttribute("style",troop_train_child_div_style);
	var stable_20 = localStorage.getItem("troop_train_checkbox_" + window.Current.VillageId + "_20");
	if(stable_20 !== null && Number(stable_20) == 1) troop_train_add_child(div_stable,"Stable",20);
	
	var stable_30 = localStorage.getItem("troop_train_checkbox_" + window.Current.VillageId + "_30");	
	if(stable_30 !== null && Number(stable_30) == 1) troop_train_add_child(div_stable,"GStable",30);
	
	
	var div_workshop = document.createElement("div");// gid 21
	div_workshop.setAttribute("style",troop_train_child_div_style);
	var workshop = localStorage.getItem("troop_train_checkbox_" + window.Current.VillageId + "_21");
	if(workshop !== null && Number(workshop) == 1) troop_train_add_child(div_workshop,"Workshop",21);
	
	
	main_div.appendChild(div_barack);
	main_div.appendChild(div_stable);
	main_div.appendChild(div_workshop);
	stockBar.insertAdjacentElement("beforeend",main_div);
}
function troop_train_add_child(e,name,target_gid)
{
	var div_ = document.createElement("div");
	var e_a = document.createElement("a");
	e_a.setAttribute("href","/build.php?gid=" + target_gid);
	e_a.innerText = name + ":";
	e_a.setAttribute("style","float: left; width:40%;color:black;");
	
	var span_time = document.createElement("span");
	
	span_time.setAttribute("value",window.Current.village_object["troop_train_"+target_gid] - Math.round(Date.now()/1000,0));
	span_time.setAttribute("style","float: left; width:60%;");
	span_time.innerText = "...";
	div_.appendChild(e_a);
	div_.appendChild(span_time);
	window.Current.Timers.push(span_time);
	e.appendChild(div_);
}
function ReadDataBuilding()
{
	var Builds_ = [];
	var build = document.getElementsByClassName("buildDuration");
	if(build.length !== 0)//read in dorf
	{			
		var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
		for(var k=0; k < build.length; k++)
		{
			var timeleft = parseFloat(build[k].getElementsByTagName("span")[0].getAttribute("value"));
			Builds_.push(current_SecondFrom1970 + timeleft);
		}			
	}
	window.Current.village_object.Builds = Builds_;
	SaveCurrentVillage();
}

function dorf_main()
{
	if(window.location.href.indexOf("dorf1.php")>=0 || window.location.href.indexOf("dorf2.php")>=0)
	{
		troop_train_show();
		ReadDataBuilding();
	}else if(window.location.href.indexOf("dorf3.php")>=0)
	{
		dorf3_icon_count();
	}
}

dorf_main();