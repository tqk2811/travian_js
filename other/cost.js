var contract_ = document.getElementById("contract");
if(contract_ !== null)
{	
	var ress = contract_.getElementsByTagName("span");
	if(ress !== null)
	{
		var total_ = 0;
		for(var i =0; i < 4; i++)
		{
			total_ += Number.parseInt(ress[i].innerText);
		}
		var parent_ress = ress[0].parentNode;
		var total_element = document.createElement("span");
		total_element.innerText = "Total: " + total_;
		parent_ress.appendChild(total_element);
	}
}