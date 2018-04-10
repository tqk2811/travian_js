function Get_gid()
{
	var gid_str = e_build.getAttribute("class").split(" ")[0];
	var gid = Number(gid_str.substring(3,gid_str.length));
	console.log("gid:" + gid);
	switch(gid)
	{
		case 17: gid17(); return;
		
		default: return;
	}
}


function gid17()
{
	if(tabActive !== null && tabActive !== undefined)
	{
		var tabItem = tabActive[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("t=0")>=0)
		{
			var descriptionAndInfo = document.getElementById("descriptionAndInfo");
			if(descriptionAndInfo !== null && descriptionAndInfo !== undefined)
			{
				var button_clear = document.createElement("button");
				button_clear.innerText = "Clear All Trade Routes";
				button_clear.setAttribute("style","background-color:red;border:none;color:white;padding: 3px;");
				button_clear.setAttribute("onclick","gid17_clear_onclick()");
				descriptionAndInfo.appendChild(button_clear);
				
				var p_traderoutes_res = document.createElement("p");
				descriptionAndInfo.appendChild(p_traderoutes_res);
				for(var i=0; i < 4; i++)
				{
					var input_tr = document.createElement("input");
					input_tr.setAttribute("type","number");
					input_tr.setAttribute("size","4");
					input_tr.setAttribute("style","margin:3px;");
					p_traderoutes_res.appendChild(input_tr);
					Input_traderoutes.push(input_tr);
				}
				
				var p_traderoutes_main = document.createElement("p"); 
				descriptionAndInfo.appendChild(p_traderoutes_main);
				var textbox_times = document.createElement("select");
				for(var i = 0; i < 3; i++)
				{
					var option_times = document.createElement("option");
					option_times.innerText=i+1;
				}
				p_traderoutes_main.appendChild(" times");
				
				
				
			}
		}else if(tabItem.getAttribute("href").indexOf("t=5")>=0)
		{
			var marketSend_ = document.getElementById("marketSend");
			if(marketSend_ !== null && marketSend_ !== undefined)
			{
				var p_button = document.createElement("p1");
				marketSend_.insertAdjacentElement("beforebegin",p_button);
				
				var button_Smallcelebration = document.createElement("button");
				button_Smallcelebration.innerText = "Small celebration";
				button_Smallcelebration.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Smallcelebration.setAttribute("onclick","gid17_celebration_click([6400,6650,5940,1340],1)");
				
				var button_Bigcelebration = document.createElement("button");
				button_Bigcelebration.innerText = "Big celebration";
				button_Bigcelebration.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Bigcelebration.setAttribute("onclick","gid17_celebration_click([29700,33250,32000,6700],1)");
				
				var button_Bigcelebration2 = document.createElement("button");
				button_Bigcelebration2.innerText = "Big celebration/2";
				button_Bigcelebration2.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Bigcelebration2.setAttribute("onclick","gid17_celebration_click([14850,16625,16000,3350],2)");
				
				var button_Bigcelebration3 = document.createElement("button");
				button_Bigcelebration3.innerText = "Big celebration/3";
				button_Bigcelebration3.setAttribute("style","background-color:green;border:none;color:white;padding:3px;margin:3px;");
				button_Bigcelebration3.setAttribute("onclick","gid17_celebration_click([9900,11084,10667,2234],3)");
				
				p_button.appendChild(button_Smallcelebration);
				p_button.appendChild(button_Bigcelebration);
				p_button.appendChild(button_Bigcelebration2);
				p_button.appendChild(button_Bigcelebration3);
			}
		}
	}
	
}
function gid17_clear_onclick()
{	
	if(window.confirm("Are you sure to clear all trade routes?"))
	{
		localStorage.setItem("Flag_deleteAll_Trading_routes",1); 
		window.location.href = window.location.href;
	}
}
function gid17_clear()
{
	var flag = localStorage.getItem("Flag_deleteAll_Trading_routes");
	if(flag !== null && flag !== undefined && flag + 0 != 0)	
	{
		var trading_routes = document.getElementById("trading_routes");
		if(trading_routes !== null |trading_routes !== undefined)
		{
			var sels = trading_routes.getElementsByClassName("sel");
			if(sels !== null && sels !==undefined )
			{
				if(sels.length >0)
				{
					var a_tr = sels[0].getElementsByTagName("a");
					if(a_tr !== null && a_tr !== undefined && a_tr.length >0 )a_tr[0].click();
				}else localStorage.setItem("Flag_deleteAll_Trading_routes",0);
			}
		}
	}
}
function gid17_celebration_click(r,run_twice)
{
	for(var i=0;i<4;i++)
	{
		var e_r = document.getElementById("r" + (i + 1));
		e_r.value = r[i];
	}
	var e_run_twice = document.getElementById("x2");
	e_run_twice.selectedIndex = run_twice-1;
}


gid17_clear();
var Input_traderoutes = [];
var tabActive = document.getElementsByClassName("container active");
var e_build = document.getElementById("build");
if(e_build !== null && e_build !== undefined) Get_gid();