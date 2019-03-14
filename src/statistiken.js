if(window.location.href.indexOf("statistiken.php") >= 0) statistiken();
	

function statistiken()
{
	var table = document.getElementById("heroes");
	if(table !== null) statistiken_hero(table);
	
	//if(window.Current.tabActives.length == 1)
	//{
		//if(window.Current.tabActives[0].getElementsByTagName("a").href.indexOf("id=3") >= 0) statistiken_hero();
	//}
}


function statistiken_hero(table)
{
	var hero_exp = {};
	var hero_exp_json = localStorage.getItem("hero_exp");
	if(hero_exp_json !== null) hero_exp = JSON.parse(hero_exp_json);
	
	var current_time = CurrentSec();
	var players_name = table.getElementsByClassName("pla");
	var exps = table.getElementsByClassName("xp");
	for(var i = 0; i < players_name.length; i++)
	{
		var curr = hero_exp[players_name.innerText];
		var exp = Number(exps[i].innerText);
		if(curr !== null && exp > curr.exp)
		{
			exps[i].innerText += "(+" + (exp - curr.exp).toString() + ")";
			exps[i].title = GetTimeTextFromSecondLeft(current_time - curr.time) + " ago";			
			curr.exp = exp;
			curr.time = current_time;
		}
		else
		{
			var obj = {};
			obj.exp = Number(exps[i].innerText);
			obj.time = current_time;
			hero_exp[players_name.innerText] = obj;
		}
	}
	localStorage.setItem("hero_exp",JSON.stringify(hero_exp));
}