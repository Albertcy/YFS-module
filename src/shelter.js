//$("#showPic").closest('div, body');
//$("#showPic").unbind();
(function($){
	$.fn.picShelter = function(opt){
		var options = $.extend(true,{}, $.fn.picShelter.defaults, opt, true);
		options.curObj = $(this).addClass("shelterpic");
		options.parent = $(this).parent(); 
		
		//  图片副本
		options.pic = options.curObj.clone()
			.css({
				position:'relative',
				margin:0,
				padding:0,
				top: 0,
				left: 0,
				'z-index':102
			}).addClass('shelterpic');
		
		//  遮罩图层
		options.jShelter = $('<div id="#picShelterBlock"></div>')
			.css(options.shelterPreStyle)
			.addClass('shelterPre')
			.appendTo('body');
		
		//  绑定事件
		var clickEventHandler = function (event)
        {
			options.jShelter.toggleClass('shelterAfter shelterPre');	
			options.curObj.toggle();
			if(options.jShelter.hasClass('shelterAfter'))
			{
				options.jShelter.css(options.shelterAfterStyle);
				options.pic.prependTo(options.parent);
			}
			else
			{
				options.jShelter.css(options.shelterPreStyle);
				options.pic.remove();
			}
			 event.preventDefault();
			
        };
		options.parent.delegate('.shelterpic', 'click', clickEventHandler);
	};
	
	$.fn.picShelter.defaults = {
		button:null,
		pic:null,
		shelter:null,
		shelterPreStyle:{
			display:'none'
		},
		shelterAfterStyle:{
			display:'block',
			background: '#000',
			position:'absolute',
			left:0,
			top:0,
			width:$(document).width(),
			height:$(document).height(),
			'z-index':'101',
			'filter':'alpha(opacity=90)',
			'-moz-opacity':0.9,
			'-khtml-opacity': 0.9,
			'opacity': 0.9
		},
		picStyle:{
			position:'absolute',
			left:0,
			top:0,
			'z-index':102
		}
	};
})(jQuery);
//$('#showPic').picShelter();