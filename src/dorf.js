function dorf3_icon_count(){
	window.dorf3overview = document.getElementById("overview");
	if(dorf3overview !== null){
		var att1s = dorf3overview.getElementsByClassName("att1");
		dorf3_icon_attack_count("att1","a1");
		dorf3_icon_attack_count("att3","a3");
		
		var units = dorf3overview.getElementsByClassName("unit");
		for(var i = 0; i < units.length; i++){
			var counts= units[i].getAttribute("alt").split(" ");
			if(counts.length >= 1){
				var e_numtroop = document.createElement("a1");
				e_numtroop.innerText = counts[0];
				units[i].insertAdjacentElement("beforebegin",e_numtroop);
			}
		}		
	}
}

function dorf3_icon_attack_count(classname,color_class){
	var atts = window.dorf3overview.getElementsByClassName(classname);
	for(var i = 0; i < atts.length; i++){
		var counts= atts[i].getAttribute("alt").split(" ");
			if(counts.length >= 1){
				var e_numattack = document.createElement("a1");
				e_numattack.setAttribute("class",color_class);
				e_numattack.innerText = "( " + counts[0] + " ) ";
				atts[i].insertAdjacentElement("beforebegin",e_numattack);
			}
	}
}


var troop_train_child_div_style = "float: left; width:33%;";
var troop_train_timer = [];

function troop_train_show(){
	var stockBar = document.getElementById("stockBar");
	if(stockBar !== null){
		var main_div = document.createElement("div");
		main_div.setAttribute("style","height:100%; width:100%; overflow: hidden; margin-top:10px;");
	
		var div_barack = document.createElement("div");// gid 19,29
		div_barack.setAttribute("style",troop_train_child_div_style);
	
		var barack_19 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_19"];
		if(barack_19 !== undefined && barack_19) troop_train_add_child(div_barack,"Barrack",19);
	
		var barack_29 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_29"];
		if(barack_29 !== undefined && barack_29) troop_train_add_child(div_barack,"GBarrack",29);
	
		var div_stable = document.createElement("div");// gid 20,30
		div_stable.setAttribute("style",troop_train_child_div_style);
		var stable_20 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_20"];
		if(stable_20 !== undefined && stable_20) troop_train_add_child(div_stable,"Stable",20);
	
		var stable_30 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_30"];	
		if(stable_30 !== undefined && stable_30) troop_train_add_child(div_stable,"GStable",30);
	
		var div_workshop = document.createElement("div");// gid 21
		div_workshop.setAttribute("style",troop_train_child_div_style);
		var workshop = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_21"];
		if(workshop !== undefined && workshop) troop_train_add_child(div_workshop,"Workshop",21);

		main_div.appendChild(div_barack);
		main_div.appendChild(div_stable);
		main_div.appendChild(div_workshop);
		stockBar.insertAdjacentElement("beforeend",main_div);
	}
}
function troop_train_add_child(e,name,target_gid){
	var div_ = document.createElement("div");
	var e_a = document.createElement("a");
	e_a.setAttribute("href","/build.php?gid=" + target_gid);
	e_a.innerText = name + ":";
	e_a.setAttribute("style","float: left; width:50%;color:black;");
	
	var span_time = document.createElement("span");	
	span_time.setAttribute("value",TJS.CurrentData.village_object[TJS.Const.LS_trooptrain+target_gid] - TJS.CurrentSec());
	span_time.setAttribute("style","float: left; width:50%;");
	span_time.setAttribute("class",TJS.Const.ClassTimer);
	span_time.innerText = "...";
	div_.appendChild(e_a);
	div_.appendChild(span_time);
	e.appendChild(div_);
}

function img_to_gid16(){
	for(var i = 0; i < TJS.Const.imgs_troop_move.length; i++){
		var img_class = document.getElementsByClassName(TJS.Const.imgs_troop_move[i][0]);
		for(var j = 0; j < img_class.length;j++)
			if(img_class[j].parentElement.tagName == "A"){
				var village_id_str = TJS.getParameterByName(img_class[j].parentElement.href,"newdid");			
				if(village_id_str !== null) img_class[j].parentElement.href = TJS.Const.imgs_troop_move[i][1] + "&newdid=" + village_id_str;
				else img_class[j].parentElement.href = TJS.Const.imgs_troop_move[i][1];
			}
	}
	var troops = document.getElementById("troops");
	if(troops !== null){
		var a_s = troops.getElementsByTagName("a");
		for(var i = 0; i < a_s.length; i++) a_s[i].setAttribute("href","/build.php?gid=16&tt=1&filter=3");
	}
}

function read_celebration_tab(){
	var culture_points = document.getElementById("culture_points");
	if(culture_points !== null){
		var sec_now = TJS.CurrentSec();
		var vil_fcs = culture_points.getElementsByClassName("vil fc");
		var cels = culture_points.getElementsByClassName("cel");
		for(var i = 0; i< vil_fcs.length;i++){
			var village_id_ = TJS.getParameterByName(vil_fcs[i].getElementsByTagName("a")[0].getAttribute("href"),"newdid");
			var e_span = cels[i].getElementsByTagName("span")[0];
			var e_span_class = e_span.getAttribute("class");
			if(e_span_class == "none") continue;
			
			var village_object = TJS.LSGetObject("village",village_id_);
			if(e_span_class == "dot") village_object["celebration_24"] = 0;
			else village_object["celebration_24"] = sec_now + Number(e_span.getAttribute("value")); // timer
			TJS.LSSaveObject("village",village_id_,village_object);
		}
		var slots_villages = document.getElementsByClassName("slo lc");
		for(var i = 0; i < slots_villages.length; i++){
			var nums_ = slots_villages[i].innerText.match(/\d/g);
			if(nums_[0] == nums_[1] && (nums_[0] == "1" || nums_[0]  == "2" )) slots_villages[i].setAttribute("style","background:#ff99ba");
		}		
	}
}

function dorf_main(){
	if(window.location.href.indexOf("dorf1.php")>=0 || window.location.href.indexOf("dorf2.php")>=0){
		troop_train_show();
		img_to_gid16();
	}else if(window.location.href.indexOf("dorf3.php")>=0){
		dorf3_icon_count();
		read_celebration_tab();
		img_to_gid16();
	}
}

dorf_main();
