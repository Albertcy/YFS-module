function switchBackground()
{
	var jButton = $("#showPic");
	var jDivBlock = ('.pic_day');
	if(jDivBlock.length == 0)
	{
		jDivBlock = $('<div class="pic_day"></div>').appendTo('body');
	}
	
	jDivBlock.toggleClass('pic_night pic_day');
	
	if(jButton.val() == '开灯')
	{
		jButton.val() == '关灯';·
	}
	else
	{
		jButton.val() == '开灯';·
	}
}
if(jDivBlock.hasClass('pic_night'))
{
	jDivBlock.css({
		'height' : $(window).height();
	});
