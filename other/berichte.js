function clear_report()
{
	var e_div = berichte_input_sellect_all_1.parentElement;
	if(e_div !== null)
	{
		var e_div_clear = document.createElement("div");
		e_div_clear.innerText = "check all and delete";
		e_div_clear.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px");
		e_div_clear.setAttribute("onclick","clear_report_onclick()");
		e_div.insertAdjacentElement("afterend",e_div_clear);
	}	
}

function clear_report_onclick()
{
	berichte_input_sellect_all_1.click();
	var e_del = document.getElementById("del");
	if(e_del !== null) e_del.click();
}

function berichte_main()
{
	if(window.location.href.indexOf("berichte.php")>=0)
	{
		berichte_input_sellect_all_1 = document.getElementById("sAll1");
	}
}

var berichte_input_sellect_all_1 = null;
berichte_main();