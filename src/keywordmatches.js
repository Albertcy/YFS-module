/**
 * 技术支持 字符提示
 */
(function($){
	$.fn.tsMatches = function(){
		
		var options = $.fn.tsMatches.defaults;
		
		//  节流参数
		options.throttleTag = null;
		
		//  搜索缓存
		options.api = {};
		
		//  输入框
		options.curObj = $(this); 
		
		//  绑定事件
		options.curObj.keyup(function(){
			
			//  输入框内容
			options.inputKey = $.trim(options.curObj.val());
			
			if(options.inputKey != '')
			{
				//  节流判断
				if(!options.throttleTag)
				{
					//  节流标记
					options.throttleTag = true;
					var list = '';
					setTimeout(function(){
						if(!options.api[options.inputKey])
						{
							options.api[options.inputKey] = $.ajax({
								url: SYSURL + '/technicalsupport/gtsi.php',
								type :'get',
								data:{
									'k': options.inputKey
								},
								dataType : 'json'
							});							
						}
						
						options.api[options.inputKey]
							.done(options.showMatchVal)
							.fail(options.ajaxErrorHandle);
						
						options.throttleTag = null;
					}, 1000);
				}				
			}
		});
		
		//	处理输入框样式
		options.curObj.wrap('<div id="listcontainer" style="position:relative"></div>');
	};
	
	//  默认值
	$.fn.tsMatches.defaults = {
		ajaxErrorHandle : function()
		{
			alert("请稍后重试");
		},
		showMatchVal : function(data)
		{
			if(data)
			{
				list = $.fn.tsMatches.defaults.getHtmlList(data);
				$.fn.tsMatches.defaults.showList(list);
			}
		},
		getHtmlList : function(arg){
			if(arg)
			{
				var uList = '<ul>';  
				var sKey = $.fn.tsMatches.defaults.inputKey;
				var iPos = 0;
				var sWord = '';
				
				//  生成list, 并将匹配的字符标红
				$.each(arg, function(index, val){
					iPos = val.toLowerCase().indexOf(sKey.toLowerCase());
					sWord = val.substring(0, iPos) + '<span>' + val.substring(iPos, sKey.length) + '</span>' + val.substring(iPos+ sKey.length); 
					uList += '<li><a href ="#">' + sWord + '</a></li>';
				});
				uList += '</ul>';
				return uList;
			}
		},
		showList: function(arg){
			if(arg)
			{
				var jListBlock = $("#listcontainer");
				var jList = $('<div class="issuelist" style="position:absolute; left:0px; top:' + jListBlock.height() +'px;"></div>')
					.mouseleave(function(){
						$(this).remove();
					});
				$(".issuelist").remove();
				$(arg)
					.click(function(event){
						var jCur = $(event.target);
						if(jCur.is("a"))
						{
							$.fn.tsMatches.defaults.curObj.val('').val(jCur.text());
							$(this).remove();
							event.preventDefault();
						}
						if(jCur.is("span"))
						{
							jCur.parent('a').click();
							event.preventDefault();
						}
					})
					.appendTo(jListBlock)
					.wrap(jList);
			}
		}
	};
})(jQuery);

$(document).ready(function(){
	$("#issueskey").tsMatches();
});