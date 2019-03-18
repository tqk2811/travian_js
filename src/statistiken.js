if(window.location.href.indexOf("statistiken.php") >= 0) statistiken_();


function statistiken_()
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
	var hero = {};
	var hero_json = localStorage.getItem("hero");
	if(hero_json !== null) hero = JSON.parse(hero_json);
	
	var current_time = CurrentSec();
	var players_name = table.getElementsByClassName("pla");
	var exps = table.getElementsByClassName("xp");
	for(var i = 0; i < players_name.length; i++)
	{
		var curr = hero[players_name[i].innerText];
		var exp = Number(exps[i].innerText);
		if(curr !== undefined && curr.exp !== undefined && exp > curr.exp.exp )
		{
			exps[i].innerText += "(+" + (exp - curr.exp.exp).toString() + ")";
			exps[i].title = GetTimeTextFromSecondLeft(current_time - curr.exp.time) + " ago";			
			curr.exp.exp = exp;
			curr.exp.time = current_time;
		}
		else
		{
			if(curr === undefined) hero[players_name[i].innerText] = {};
			hero[players_name[i].innerText].exp = {};
			hero[players_name[i].innerText].exp.exp = Number(exps[i].innerText);
			hero[players_name[i].innerText].exp.time = current_time;
		}
	}
	localStorage.setItem("hero",JSON.stringify(hero));
}