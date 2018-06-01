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



function dorf3_main()
{
	if(window.location.href.indexOf("dorf3.php")>=0)
	{
		dorf3_count_att1();
	}
}
dorf3_main();