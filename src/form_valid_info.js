/**
 * 用于验证用户提交信息的js
 * 
 * @author chengyang
 */
(function($){
	$.fn.initVal = function(){
	
		//  获取传入参数（表单中默认的值）
		var argsDefault = arguments[0];
		this.each(function(index){
			var keyWord = $(this);
			//	获取表单中的默认值
			var keyVal = argsDefault[index];
			if(keyVal == jQuery.trim(keyWord.val()))
			{
				//	控制背景颜色默认为灰色
				keyWord.css('color', '#a3a3a3');
			}
			else
			{
				//  控制背景颜色
				keyWord.css('color', '#000');
			}
			keyWord.blur(function(){
				if(keyVal == jQuery.trim(keyWord.val()) || '' == jQuery.trim(keyWord.val()))
				{
			        keyWord.val(keyVal).css('color', '#a3a3a3');
				}
			}).focus(function(){
			  if(keyVal==jQuery.trim(keyWord.val()))
				{
					keyWord.val('').css('color', '#000');
				}
			});
		});
		return this;
	};
})(jQuery);

//	控制其他项的显示方式
(function($){
	$("form").delegate('input[type=checkbox]:eq(6)', 'change', function(){
		$("input[name*=otherinfo]").toggle().val();
	});
})(jQuery);


$(document).ready(function(){
	
	//	初始化文本框的默认值
	var defaultInputVal = [
		 "您的宝贵意见就是我们前进的动力",
		 "您的宝贵意见就是我们前进的动力",
		 "您的宝贵意见就是我们前进的动力"
  	];
	$("form textarea").each(function(index){
			$(this).val(defaultInputVal[index]);
		}).initVal(defaultInputVal);
	
	//	初始化选择框
	$("form input").removeAttr('checked');
	
	//  选择“其他”显示文本框
	$("form input[type=checkbox]:eq(6)").change(function(){
		$("input[name*=otherinfo]").toggle().val();
	});
	
	$("form").submit(function(){
		
		// 处理radio
		// 获取所有的radio名
		var bInfoValid = true;
		var oRadioNames = [];
		$("input[type=radio], input[type=checkbox]", 'form').each(function(){
			var sName = $(this).attr('name');
			if(-1==$.inArray(sName, oRadioNames))
			{
				oRadioNames.push(sName);
			}
		});
		
		//  判断是否有漏选项
		$.each(oRadioNames, function(index, data){
			
			var bIsSelected = $("form [name='" + data +"']").filter(":checked").length ? true : false;
			if(!bIsSelected)
			{
				bInfoValid = false;
				alert('请完成全部选择项目。');
				return false;
			}
		});
		
		if(bInfoValid)
		{
			//	处理textarea
			$("form textarea").each(function(index){
				var sVals = $.trim($(this).val());
				if($.trim($(this).val()) == '' || sVals == defaultInputVal[index])
				{
					bInfoValid = false;
					alert('请填写调查信息。');
					return false;
				}
			});
		}
		
		//	提交表单
		if(bInfoValid)
		{
			$.ajax({
				url : $(this).attr('action'),
				dataType : 'json',
				type : 'post',
				data : $(this).serialize(),
				success : function(data)
				{
					if(data && data.flag == true)
					{
						alert('您的信息提交成功。');
						window.location = '/student/index.php';
						return false;
					}
					else
					{
						alert(data.message);
					}	
					
				},
				error: function(){
					alert('请稍后重试。');
					return false;
				}
				
			});
		}
		return false;
	});
});