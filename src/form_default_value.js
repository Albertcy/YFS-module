var defaultInputVal = [
						 "{eval _e('Please provide more details about your problem')}", 
						 "{eval _e('Leave your contact ways, such as mobile, qq, and fixed telephone with district code.')}"
	                  ];	
var textArea = $("#feedbackcontent, #feedbackcontact")
	.initVal(defaultInputVal);
$("#closetinywindow").click(function(){
		textArea.each(function(index){
			console.log(index);
			$(this).val(defaultInputVal[index]);
		});
});


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


// 默认背景消失
(function($){
	 // 猜测由于live()的默认机制是需要时间冒泡的。所以focus，blur可能会被转为focusin，focusout
	$("#keyword").live('focusin focusout', function(event){
	
		/**
		 *	如果在次数打印 focus -> focusin
		 *	console.log(event.type);
		 */
		if (event.type == 'focusin')
		{
			
			$(this).css("background","url(/images/search_input.gif) no-repeat scroll 10px -108px #fff");
		}
		else
		{
			if($(this).val().length==0)
			{
				$(this).css("background","url(/images/search_key.png) no-repeat scroll 10px -108px #fff");
			}
		}
	})
})(jQuery);

/**
*	最后是这个，用keydown去控制
*	有输入内容时，清掉背景图片
*	（1）（2）（3）处标记， 如果在样式中css已经定义。那么
*		1、不用控制默认值。class='default'
		2、减少不必要的代码。code_3处
*/
$(document).ready(function(){
	$("#keyword").bind('focus keydown', function(event){
			if(event.type == 'focus' || jQuery.trim($("#keyword").val()) == '')
			{
				// 用jquery的css（）方法加载样式（1）
				$(this).css("background","url(/images/search_input.gif) no-repeat scroll 10px -108px #fff");
				//$(this).toggleClass('defaultBgpic');
			}
		}).blur(function(){
			
			if(jQuery.trim($("#keyword").val()) == '')
			{
				// 用jquery的css（）方法加载样式（2）
				$(this).css("background","url(/images/search_key.png) no-repeat scroll 10px -108px #fff").val('');
			}
		});
	
		// code_3
		if(jQuery.trim($("#keyword").val()) == '')
		{
			// 用jquery的css（）方法加载样式（3）
			$("#keyword").css("background","url(/images/search_key.png) no-repeat scroll 10px -108px #fff").val('');
		}		
});



/**
	插件模式，加入了默认值
*/
(function($){
	$.fn.initVal = function(opts){
	
		//  定义默认值
		$.fn.initVal.defaults = {
			'defaulttext': ['default value'],
			'num' : 1,
			'defaultcolor' : '#a3a3a3',
			'focuscolor' : '#000'
		};
		
		//  获取参数
		var options = $.extend({}, $.fn.initVal.defaults, opts);
		
		//  获取传入参数（表单中默认的值）
		var argsDefault = options.defaulttext;
		
		this.each(function(index){
			
			//	获取表单中的默认值
			var sDefaultVal = argsDefault[index];
			
			//  设置默认值
			var oInputArea = $(this).val(sDefaultVal);
			
			if(sDefaultVal == jQuery.trim(oInputArea.val()))
			{
				//	控制背景颜色默认为灰色
				oInputArea.css('color', options.defaultcolor);
			}
			else
			{
				//  控制背景颜色
				oInputArea.css('color', options.focuscolor);
			}
			oInputArea.blur(function(){
				if(sDefaultVal == jQuery.trim(oInputArea.val()) || '' == jQuery.trim(oInputArea.val()))
				{
			        oInputArea.val(sDefaultVal).css('color', options.defaultcolor);
				}
			}).focus(function(){
			  if(sDefaultVal==jQuery.trim(oInputArea.val()))
				{
					oInputArea.val('').css('color', options.focuscolor);
				}
			});
		});
		return this;
	};
})(jQuery);
