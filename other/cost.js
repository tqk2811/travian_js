var contract_ = document.getElementById("contract");
if(contract_ !== null | contract_ !== undefined)
{	
	var ress = contract_.getElementsByTagName("span");
	var total_ = 0;
	for(var i =0; i < ress.length - 1; i++)
	{
		total_ += Number.parseInt(ress[i].innerText);
	}
	var parent_ress = ress[0].parentNode;
	var total_element = document.createElement("span");
	total_element.innerText = "Total: " + total_;
	parent_ress.appendChild(total_element);
}