if(window.location.href.indexOf("statistiken.php") >= 0) statistiken_();


function statistiken_(){
	let table = document.getElementById("heroes");
	if(table ) statistiken_hero(table);
}


function statistiken_hero(table){
	let hero = {};
	let hero_json = localStorage.getItem("hero");
	if(hero_json ) hero = JSON.parse(hero_json);
	
	let current_time = TJS.CurrentSec();
	let players_name = table.getElementsByClassName("pla");
	let exps = table.getElementsByClassName("xp");
	for(let i = 0; i < players_name.length; i++){
		let curr = hero[players_name[i].innerText];
		let exp = Number(exps[i].innerText);
		if(curr  && curr.exp  && exp > curr.exp.exp){
			exps[i].innerText += "(+" + (exp - curr.exp.exp).toString() + ")";
			exps[i].title = TJS.GetTimeTextFromSecondLeft(current_time - curr.exp.time) + " ago";			
			curr.exp.exp = exp;
			curr.exp.time = current_time;
		}else{
			if(!curr) hero[players_name[i].innerText] = {};
			hero[players_name[i].innerText].exp = {};
			hero[players_name[i].innerText].exp.exp = Number(exps[i].innerText);
			hero[players_name[i].innerText].exp.time = current_time;
		}
	}
	localStorage.setItem("hero",JSON.stringify(hero));
}