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
	var exp_hero = {};
	var exp_hero_json = localStorage.getItem("exp_hero");
	if(exp_hero_json !== null) exp_hero = JSON.parse(exp_hero_json);
	
	var current_time = CurrentSec();
	var players_name = table.getElementsByClassName("pla");
	var exps = table.getElementsByClassName("xp");
	for(var i = 0; i < players_name.length; i++)
	{
		var curr = exp_hero[players_name[i].innerText];
		var exp = Number(exps[i].innerText);
		if(curr !== undefined && exp > curr.exp)
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
			exp_hero[players_name[i].innerText] = obj;
		}
	}
	localStorage.setItem("exp_hero",JSON.stringify(exp_hero));
}