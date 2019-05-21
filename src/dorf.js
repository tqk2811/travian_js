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
	
	var barack_19 = window.Current.village_object["troop_train_checkbox_19"];
	if(barack_19 !== undefined && barack_19) troop_train_add_child(div_barack,"Barrack",19);
	
	var barack_29 = window.Current.village_object["troop_train_checkbox_29"];
	if(barack_29 !== undefined && barack_29) troop_train_add_child(div_barack,"GBarrack",29);
	
	
	var div_stable = document.createElement("div");// gid 20,30
	div_stable.setAttribute("style",troop_train_child_div_style);
	var stable_20 = window.Current.village_object["troop_train_checkbox_20"];
	if(stable_20 !== undefined && stable_20) troop_train_add_child(div_stable,"Stable",20);
	
	var stable_30 = window.Current.village_object["troop_train_checkbox_30"];	
	if(stable_30 !== undefined && stable_30) troop_train_add_child(div_stable,"GStable",30);
	
	var div_workshop = document.createElement("div");// gid 21
	div_workshop.setAttribute("style",troop_train_child_div_style);
	var workshop = window.Current.village_object["troop_train_checkbox_21"];
	if(workshop !== undefined && workshop) troop_train_add_child(div_workshop,"Workshop",21);
	
	
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
	
	span_time.setAttribute("value",window.Current.village_object["troop_train_"+target_gid] - CurrentSec());
	span_time.setAttribute("style","float: left; width:60%;");
	span_time.setAttribute("class","travian_js_timer");
	span_time.innerText = "...";
	div_.appendChild(e_a);
	div_.appendChild(span_time);
	e.appendChild(div_);
}
function ReadDataBuilding()
{
	var Builds_ = [];
	var build = document.getElementsByClassName("buildDuration");
	if(build.length !== 0)//read in dorf
	{
		for(var k=0; k < build.length; k++)
		{
			var timeleft = parseFloat(build[k].getElementsByTagName("span")[0].getAttribute("value"));
			Builds_.push(CurrentSec() + timeleft);
		}
	}
	window.Current.village_object.Builds = Builds_;
	SaveCurrentVillage();
}

var imgs_troop_move = [	["def1","/build.php?gid=16&tt=1&filter=1&subfilters=2,3"],//all def in
						["def2","/build.php?gid=16&tt=1&filter=2&subfilters=5"],//def yellow out
						["def3","/build.php?gid=16&tt=1&filter=1&subfilters=2,3"],//all def in
						["att1","/build.php?gid=16&tt=1&filter=1&subfilters=1"],//att red in
						["att2","/build.php?gid=16&tt=1&filter=2&subfilters=4"],//att yellow out
						["att3","/build.php?gid=16&tt=1&filter=1&subfilters=1"]//att violet in (Oasis)
					];
function img_to_gid16()
{
	for(var i = 0; i < imgs_troop_move.length; i++)
	{
		var img_class = document.getElementsByClassName(imgs_troop_move[i][0]);
		for(var j = 0; j < img_class.length;j++)
			if(img_class[j].parentElement.tagName == "A")
			{
				var village_id_str = getQueryVariable(img_class[j].parentElement.href,"newdid");			
				if(village_id_str !== null) img_class[j].parentElement.href = imgs_troop_move[i][1] + "&newdid=" + village_id_str;
				else img_class[j].parentElement.href = imgs_troop_move[i][1];
			}
	}
	var troops = document.getElementById("troops");
	if(troops !== null)
	{
		var a_s = troops.getElementsByTagName("a");
		for(var i = 0; i < a_s.length; i++) a_s[i].setAttribute("href","/build.php?gid=16&tt=1&filter=3");
	}
}

function read_celebration_tab()
{
	var culture_points = document.getElementById("culture_points");
	if(culture_points !== null)
	{
		var sec_now = CurrentSec();
		var vil_fcs = culture_points.getElementsByClassName("vil fc");
		var cels = culture_points.getElementsByClassName("cel");
		for(var i = 0; i< vil_fcs.length;i++)
		{
			var village_id_ = getQueryVariable(vil_fcs[i].getElementsByTagName("a")[0].getAttribute("href"),"newdid");
			var e_span = cels[i].getElementsByTagName("span")[0];
			var e_span_class = e_span.getAttribute("class");
			if(e_span_class == "none") continue;
			
			var village_object = GetObject("village",village_id_);
			if(e_span_class == "dot") village_object["celebration_24"] = 0;
			else village_object["celebration_24"] = sec_now + Number(e_span.getAttribute("value")); // timer
			SaveObject("village",village_id_,village_object);
		}
		var slots_villages = document.getElementsByClassName("slo lc");
		for(var i = 0; i < slots_villages.length; i++)
		{
			var nums_ = slots_villages[i].innerText.match(/\d/g);
			if(nums_[0] == nums_[1] && (nums_[0] == "1" || nums_[0]  == "2" )) slots_villages[i].setAttribute("style","background:#ff99ba");
		}		
	}
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
		read_celebration_tab();
	}
	img_to_gid16();
}

dorf_main();