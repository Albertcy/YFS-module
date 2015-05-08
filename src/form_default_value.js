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
	
		//  ��ȡ�������������Ĭ�ϵ�ֵ��
		var argsDefault = arguments[0];
		this.each(function(index){
			var keyWord = $(this);
			//	��ȡ���е�Ĭ��ֵ
			var keyVal = argsDefault[index];
			if(keyVal == jQuery.trim(keyWord.val()))
			{
				//	���Ʊ�����ɫĬ��Ϊ��ɫ
				keyWord.css('color', '#a3a3a3');
			}
			else
			{
				//  ���Ʊ�����ɫ
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


// Ĭ�ϱ�����ʧ
(function($){
	 // �²�����live()��Ĭ�ϻ�������Ҫʱ��ð�ݵġ�����focus��blur���ܻᱻתΪfocusin��focusout
	$("#keyword").live('focusin focusout', function(event){
	
		/**
		 *	����ڴ�����ӡ focus -> focusin
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
*	������������keydownȥ����
*	����������ʱ���������ͼƬ
*	��1����2����3������ǣ� �������ʽ��css�Ѿ����塣��ô
*		1�����ÿ���Ĭ��ֵ��class='default'
		2�����ٲ���Ҫ�Ĵ��롣code_3��
*/
$(document).ready(function(){
	$("#keyword").bind('focus keydown', function(event){
			if(event.type == 'focus' || jQuery.trim($("#keyword").val()) == '')
			{
				// ��jquery��css��������������ʽ��1��
				$(this).css("background","url(/images/search_input.gif) no-repeat scroll 10px -108px #fff");
				//$(this).toggleClass('defaultBgpic');
			}
		}).blur(function(){
			
			if(jQuery.trim($("#keyword").val()) == '')
			{
				// ��jquery��css��������������ʽ��2��
				$(this).css("background","url(/images/search_key.png) no-repeat scroll 10px -108px #fff").val('');
			}
		});
	
		// code_3
		if(jQuery.trim($("#keyword").val()) == '')
		{
			// ��jquery��css��������������ʽ��3��
			$("#keyword").css("background","url(/images/search_key.png) no-repeat scroll 10px -108px #fff").val('');
		}		
});



/**
	���ģʽ��������Ĭ��ֵ
*/
(function($){
	$.fn.initVal = function(opts){
	
		//  ����Ĭ��ֵ
		$.fn.initVal.defaults = {
			'defaulttext': ['default value'],
			'num' : 1,
			'defaultcolor' : '#a3a3a3',
			'focuscolor' : '#000'
		};
		
		//  ��ȡ����
		var options = $.extend({}, $.fn.initVal.defaults, opts);
		
		//  ��ȡ�������������Ĭ�ϵ�ֵ��
		var argsDefault = options.defaulttext;
		
		this.each(function(index){
			
			//	��ȡ���е�Ĭ��ֵ
			var sDefaultVal = argsDefault[index];
			
			//  ����Ĭ��ֵ
			var oInputArea = $(this).val(sDefaultVal);
			
			if(sDefaultVal == jQuery.trim(oInputArea.val()))
			{
				//	���Ʊ�����ɫĬ��Ϊ��ɫ
				oInputArea.css('color', options.defaultcolor);
			}
			else
			{
				//  ���Ʊ�����ɫ
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
