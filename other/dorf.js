function dorf3_count_att1()
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
	}
}

var troop_train_child_div_style = "float: left; width:25%;";
var troop_train_timer = [];

function troop_train_show()
{
	var stockBar = document.getElementById("stockBar");
	var main_div = document.createElement("div");
	main_div.setAttribute("style","height:100%; width:100%; overflow: hidden;");
	
	var div_barack = document.createElement("div");// gid 19,29
	div_barack.setAttribute("style",troop_train_child_div_style);
	var barack_19 = localStorage.getItem("troop_train_checkbox_" + village_id + "_19");
	if(barack_19 !== null && Number(barack_19) == 1) troop_train_add_child(div_barack,"Barack",19);
	
	var barack_29 = localStorage.getItem("troop_train_checkbox_" + village_id + "_29");	
	if(barack_29 !== null && Number(barack_29) == 1) troop_train_add_child(div_barack,"BBarack",29);
	
	
	var div_stable = document.createElement("div");// gid 20,30
	div_stable.setAttribute("style",troop_train_child_div_style);
	var stable_20 = localStorage.getItem("troop_train_checkbox_" + village_id + "_20");
	if(stable_20 !== null && Number(stable_20) == 1) troop_train_add_child(div_stable,"Stable",20);
	
	var stable_30 = localStorage.getItem("troop_train_checkbox_" + village_id + "_30");	
	if(stable_30 !== null && Number(stable_30) == 1) troop_train_add_child(div_stable,"BStable",30);
	
	
	var div_workshop = document.createElement("div");// gid 21
	div_workshop.setAttribute("style",troop_train_child_div_style);
	var workshop = localStorage.getItem("troop_train_checkbox_" + village_id + "_21");
	if(workshop !== null && Number(workshop) == 1) troop_train_add_child(div_workshop,"Workshop",21);
	
	
	main_div.appendChild(div_barack);
	main_div.appendChild(div_stable);
	main_div.appendChild(div_workshop);
	stockBar.insertAdjacentElement("afterend",main_div);
	window.setInterval(troop_train_timer_tick,1000);
}

function troop_train_add_child(e,name,target_gid)
{
	var div_ = document.createElement("div");
	var label_ = document.createElement("label");
	label_.text = name + ":";
	label_.setAttribute("style","float: left; width:40%;");
	
	var span_ = document.createElement("span");
	span_.value = Number(localStorage.getItem("troop_train_" + village_id + "_" + target_gid));
	span_.setAttribute("style","float: left; width:60%;");
	
	div_.appendChild(label_);
	div_.appendChild(span_);
	troop_train_timer.push(span_);
	e.appendChild(div_);
}
function troop_train_timer_tick()
{
	for(var i = 0; i < troop_train_timer.length; i++)
	{
		var num = parseInt(troop_train_timer[i].getAttribute("value")) - 1;
		if(num < 0) continue;
		else 
		{
			if(num === 0) ding_sound.play();
			var sec_ =num % 60;
			var temp_ = (num - sec_)/60;
			var min_ = temp_ % 60;
			var hour_ = (temp_ - min_)/60;
			var text_ = (sec_ < 10) ? "0"+sec_.toString() : sec_.toString();
			text_ = ((min_ < 10) ? "0"+min_.toString() : min_.toString()) + ":" + text_;
			if(hour_ > 0)text_ = ((hour_ < 10) ? "0"+hour_.toString() : hour_.toString()) + ":" + text_;
      
			troop_train_timer[i].innerText = text_;
			troop_train_timer[i].setAttribute("value",num);
		}
	}
}



function dorf_main()
{
	if(window.location.href.indexOf("dorf1.php")>=0 || window.location.href.indexOf("dorf2.php")>=0)
	{
		troop_train_show();
	}else if(window.location.href.indexOf("dorf3.php")>=0)
	{
		dorf3_count_att1();
	}
}

dorf_main();