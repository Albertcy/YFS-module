$(document).ready(function(){
	//  用于事件节流计时器
	var iTimer = 0;
	//	总金额
	var fTotalPrice = 0;
	//	实际金额
	var iActualTotalPrice = 0;
	var oInputPrice = null;
	var oShowPrice = $("#totalprice");
	
	//	已审核
	if({$status})
	{
		//	计算每个引入的服务账单中的总金额
		$("form[action*='doapprovalserviceorder']").each(function(index, data){
			
			//	实际金额
			iActualTotalPrice = 0;
			//	显示总计金额的位置
			oShowTotalPrice = $(this).find("#totalprice");
			//	获取每一项的金额
			oInputPrice = $(this).find("table td:nth-child(7)");
			//oInputPrice = $("table td:nth-child(7)", $(this));
			oShowTotalPrice = $("#totalprice", $(this));
			oInputPrice.each(function(){
				var fPrice = $.trim($(this).text()).substr(1);
				iActualTotalPrice += parseFloat(fPrice);
			});
			
			oShowTotalPrice.text('￥' + iActualTotalPrice.toFixed(2));
		});
		
	}
	//	待审核页面
	else
	{
		oInputPrice = $("form input[name^='finalprice']");
		oInputPrice.keydown(function(){
			if(!iTimer)
			{
				iActualTotalPrice = 0;
				iTimer = setTimeout(function(){
					//	计算总金额
					oInputPrice.each(function(){
						if(parseFloat($(this).val()))
						{
							iActualTotalPrice += parseFloat($(this).val());
						}
					});
					iTimer = 0;
					//	保留两位小数
					oShowPrice.text('￥' + iActualTotalPrice.toFixed(2));    
				},250);
			}
		});
		oInputPrice.eq(0).trigger('keydown');
	}
	
});