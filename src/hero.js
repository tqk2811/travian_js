function bid()
{
	var e_submitBids = document.getElementsByClassName("submitBid");
	if(e_submitBids.length == 1)
	{
		var e_pr = e_submitBids[0].parentNode;
		var e_spans = e_pr.getElementsByTagName("span");
		var e_inputs = e_pr.getElementsByTagName("input");		
		if(e_spans  && e_inputs  && e_spans.length > 0 && e_inputs.length >0 && e_inputs[0].value.length == 0)
		{
			e_inputs[0].value = Number(e_spans[0].innerText) + 1;
		}
	}
}
//if(window.location.href.indexOf("hero.php")>=0) bid();
