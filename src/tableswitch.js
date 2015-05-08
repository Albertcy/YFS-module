(function($){
    	var title = 'news';
    	$("#newstitle").delegate('a', 'click', function(event){
    		
    		//  当前点击标签
    		var jCur = $(event.currentTarget)
    		    .addClass('on')
    		    .siblings('a')
    			.removeClass('on')
    			.end();
    		
    		//  序号
    		var iIndex = jCur.index() + 1;
    		console.log(iIndex);
    		//  模块
    		var jArea = jCur.parent('div')
    			.nextAll()
    			.removeClass('block_current')
    			.filter("#" + title + '_' + iIndex)
    			.addClass("block_current");
    		event.preventDefault();
    	});
})(jQuery);
/**
	eg:html
	 <!-- 咨询  建筑 游戏 begin -->
		<div class="blockbox" id="newsbox">
		    <div class="block_title clear"  id="newstitle">
		        <a class="on"  href="#"><b>{eval _e('Hxsd news')}</b></a>
		        <a href="#"><b>{eval _e('Hxsd arch')}</b></a>
		        <a href="#"><b>{eval _e('Hxsd game')}</b></a>
		    </div>
		    <div class="block_content block_current" id="news_1">
		        <script type="text/javascript" src="http://cms.hxsd.com/datastore.php?ch=1&t=studentsystem"></script>
		    </div>
		    <div class="block_content" id="news_2">
		        <script type="text/javascript" src="http://cms.hxsd.com/datastore.php?ch=50&t=studentsystem"></script>
		    </div>
		    <div class="block_content" id="news_3">
		        <script type="text/javascript" src="http://cms.hxsd.com/datastore.php?ch=47&t=studentsystem"></script>
		    </div>
		</div>
		<!-- 咨询  建筑 游戏 end -->
*/