function dorf3_icon_count(){
	window.dorf3overview = document.getElementById("overview");
	if(dorf3overview){
		let att1s = dorf3overview.getElementsByClassName("att1");
		dorf3_icon_attack_count("att1","color:red;");
		dorf3_icon_attack_count("att3","color:#E6E6FA");
		
		let units = dorf3overview.getElementsByClassName("unit");
		for(let i = 0; i < units.length; i++){
			let counts= units[i].getAttribute("alt").split(" ");
			if(counts.length >= 1){
				let e_numtroop = document.createElement("a1");
				e_numtroop.innerText = counts[0];
				units[i].insertAdjacentElement("beforebegin",e_numtroop);
			}
		}		
	}
}

function dorf3_icon_attack_count(classname,color){
	let atts = window.dorf3overview.getElementsByClassName(classname);
	for(let i = 0; i < atts.length; i++){
		let counts= atts[i].getAttribute("alt").split(" ");
			if(counts.length >= 1){
				let e_numattack = document.createElement("a1");
				e_numattack.setAttribute("style",color);
				e_numattack.innerText = "( " + counts[0] + " ) ";
				atts[i].insertAdjacentElement("beforebegin",e_numattack);
			}
	}
}


let troop_train_child_div_style = "float: left; width:33%;";

function troop_train_show(){
	let stockBar = document.getElementById("stockBar");
	if(stockBar){
		let main_div = document.createElement("div");
		main_div.setAttribute("class","Tjs_troop_train");
		let div_barack = document.createElement("div");// gid 19,29
		div_barack.setAttribute("style",troop_train_child_div_style);
	
		let barack_19 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_19"];
		if(barack_19) troop_train_add_child(div_barack,"Barrack",19);
	
		let barack_29 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_29"];
		if(barack_29) troop_train_add_child(div_barack,"GBarrack",29);
	
		let div_stable = document.createElement("div");// gid 20,30
		div_stable.setAttribute("style",troop_train_child_div_style);
		let stable_20 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_20"];
		if(stable_20) troop_train_add_child(div_stable,"Stable",20);
	
		let stable_30 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_30"];
		if(stable_30) troop_train_add_child(div_stable,"GStable",30);
	
		let div_workshop = document.createElement("div");// gid 21
		div_workshop.setAttribute("style",troop_train_child_div_style);
		let workshop = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_21"];
		if(workshop) troop_train_add_child(div_workshop,"Workshop",21);

		let smithy_13 = TJS.CurrentData.village_object["checkbox_status"]["troop_train_checkbox_13"];
		if(smithy_13) troop_train_add_child(div_workshop,"Smithy",13);
		
		main_div.appendChild(div_barack);
		main_div.appendChild(div_stable);
		main_div.appendChild(div_workshop);
		stockBar.insertAdjacentElement("beforeend",main_div);
	}
}
function troop_train_add_child(e,name,target_gid){
	let div_ = document.createElement("div");
	let e_a = document.createElement("a");
	e_a.setAttribute("href","/build.php?gid=" + target_gid);
	e_a.innerText = name + ":";
	e_a.setAttribute("style","float: left; width:50%;color:black;");
	
	let span_time = document.createElement("span");	
	span_time.setAttribute("value",TJS.CurrentData.village_object[TJS.Const.LS_trooptrain+target_gid] - TJS.CurrentSec());
	span_time.setAttribute("style","float: left; width:50%;");
	span_time.setAttribute("class",TJS.Const.ClassTimer);
	span_time.innerText = "...";
	div_.appendChild(e_a);
	div_.appendChild(span_time);
	e.appendChild(div_);
}

function img_to_gid16(){
	for(let i = 0; i < TJS.Const.imgs_troop_move.length; i++){
		let img_class = document.getElementsByClassName(TJS.Const.imgs_troop_move[i][0]);
		for(let j = 0; j < img_class.length;j++)
			if(img_class[j].parentElement.tagName == "A"){
				let village_id_str = TJS.getParameterByName(img_class[j].parentElement.href,"newdid");			
				if(village_id_str) img_class[j].parentElement.href = TJS.Const.imgs_troop_move[i][1] + "&newdid=" + village_id_str;
				else img_class[j].parentElement.href = TJS.Const.imgs_troop_move[i][1];
			}
	}
	let troops = document.getElementById("troops");
	if(troops){
		let a_s = troops.getElementsByTagName("a");
		for(let i = 0; i < a_s.length; i++) a_s[i].setAttribute("href","/build.php?gid=16&tt=1&filter=3");
	}
}

function read_celebration_tab(){
	let culture_points = document.getElementById("culture_points");
	if(culture_points ){
		let sec_now = TJS.CurrentSec();
		let vil_fcs = culture_points.getElementsByClassName("vil fc");
		let cels = culture_points.getElementsByClassName("cel");
		for(let i = 0; i< vil_fcs.length;i++){
			let village_id_ = TJS.getParameterByName(vil_fcs[i].getElementsByTagName("a")[0].getAttribute("href"),"newdid");
			let e_span = cels[i].getElementsByTagName("span")[0];
			let e_span_class = e_span.getAttribute("class");
			if(e_span_class == "none") continue;
			
			let village_object = TJS.LSGetObject("village",village_id_);
			if(e_span_class == "dot") village_object["celebration_24"] = 0;
			else village_object["celebration_24"] = sec_now + Number(e_span.getAttribute("value")); // timer
			TJS.LSSaveObject("village",village_id_,village_object);
		}
		let slots_villages = document.getElementsByClassName("slo lc");
		for(let i = 0; i < slots_villages.length; i++){
			let nums_ = slots_villages[i].innerText.match(/\d/g);
			if(nums_[0] == nums_[1] && (nums_[0] == "1" || nums_[0]  == "2" )) slots_villages[i].setAttribute("style","background:#ff99ba");
		}		
	}
}

function dorf_main(){
	if(window.location.href.indexOf("dorf1")>=0 || window.location.href.indexOf("dorf2")>=0){
		troop_train_show();
		img_to_gid16();
	}else if(window.location.href.indexOf("/village/statistics")>=0){
		dorf3_icon_count();
		read_celebration_tab();
		img_to_gid16();
	}
}

dorf_main();
