$(document).ready(function(){
	//  �����¼�������ʱ��
	var iTimer = 0;
	//	�ܽ��
	var fTotalPrice = 0;
	//	ʵ�ʽ��
	var iActualTotalPrice = 0;
	var oInputPrice = null;
	var oShowPrice = $("#totalprice");
	
	//	�����
	if({$status})
	{
		//	����ÿ������ķ����˵��е��ܽ��
		$("form[action*='doapprovalserviceorder']").each(function(index, data){
			
			//	ʵ�ʽ��
			iActualTotalPrice = 0;
			//	��ʾ�ܼƽ���λ��
			oShowTotalPrice = $(this).find("#totalprice");
			//	��ȡÿһ��Ľ��
			oInputPrice = $(this).find("table td:nth-child(7)");
			//oInputPrice = $("table td:nth-child(7)", $(this));
			oShowTotalPrice = $("#totalprice", $(this));
			oInputPrice.each(function(){
				var fPrice = $.trim($(this).text()).substr(1);
				iActualTotalPrice += parseFloat(fPrice);
			});
			
			oShowTotalPrice.text('��' + iActualTotalPrice.toFixed(2));
		});
		
	}
	//	�����ҳ��
	else
	{
		oInputPrice = $("form input[name^='finalprice']");
		oInputPrice.keydown(function(){
			if(!iTimer)
			{
				iActualTotalPrice = 0;
				iTimer = setTimeout(function(){
					//	�����ܽ��
					oInputPrice.each(function(){
						if(parseFloat($(this).val()))
						{
							iActualTotalPrice += parseFloat($(this).val());
						}
					});
					iTimer = 0;
					//	������λС��
					oShowPrice.text('��' + iActualTotalPrice.toFixed(2));    
				},250);
			}
		});
		oInputPrice.eq(0).trigger('keydown');
	}
	
});