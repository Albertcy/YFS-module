var DOM={}
    //以className为选择器
    DOM.getElementsByClassName=function (className,parentEle,tagName){
            if(parentEle){
                    //parentEle=parentEle
            }else {
                    parentEle=document
            }
            if(tagName){
                    var eles=parentEle.getElementsByTagName(tagName);
                    var a=[];
                    for(var i=0;i<eles.length;i++){
                            //srt.indexOf('a')
                            if(eles.item(i).className.search( (new RegExp("\\b" + className + "\\b") ))>-1&&eles.item(i).tagName.toLowerCase()==tagName.toLowerCase()){
                                    a.push(eles.item(i));
                            }
                    }
            }else{
                    var eles=parentEle.getElementsByTagName('*');
                    var a=[];
                    for(var i=0;i<eles.length;i++){
                            if(eles.item(i).className.search( (new RegExp("\\b" + className + "\\b") ))>-1){
                                    a.push(eles.item(i));
                            }
                    }
            }
            return a;
    }
var snsInfo = [
	{img : "share_sina_weibo.gif", zh : "转发到新浪微博", u : "http://v.t.sina.com.cn/share/share.php?title={title}&url={url}"	},
	{img : "share_qq_weibo.png", zh : "分享到腾讯微博", u : "http://v.t.qq.com/share/share.php?title={title}&url={url}"},
	{img : "share_renren.png",zh : "转发至人人网",	u : "http://share.renren.com/share/buttonshare.do?title={title}&link={url}"},
	{img : "share_Qzone.gif",zh : "转发至QQ空间",	u : "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?rcontent={title}&url={url}"},
	{img : "share_kaixin001.gif",zh : "转发至开心网",	u : "http://www.kaixin001.com/repaste/share.php?rtitle={title}&rurl={url}"},
	{img : "share_feixin.png",zh : "转发至飞信空间",	u : "http://space.fetion.com.cn/api/share?title={title}&url={url}"},
	{img : "share_139.gif",zh : "转发至139说客",	u : "http://www.139.com/share/share.php?title={title}&url={url}"},
	{img : "share_baidu.png",zh : "分享到i贴吧",	u : "http://tieba.baidu.com/i/sys/share?title={title}&link={url}"},
	{img : "share_tianya.png",zh : "分享到天涯",	u : "http://www.tianya.cn/new/share/compose.asp?strTitle={title}&strFlashurl={url}"},
	{img : "share_douban.png",zh : "推荐到豆瓣",	u : "http://www.douban.com/recommend/?url={url}&title={title}&comment="},
	{img : "share_taobao.png",zh : "分享到淘江湖",	u : "http://img4.hxsd.com/newstopic/2011/1101wangrongrong/share_taobao.png"}
];

function makeShareCode(serverURL, serverIconURL,text){
    var title = encodeURIComponent(document.title.substring(0,76));
    var url = encodeURIComponent(location.href);
    serverURL = serverURL.replace("{title}",title).replace("{url}",url);
    return "<a target=\"_blank\" href=\""
    + serverURL
    +"\" ><img alt="
    + text + " src=\""
    + serverIconURL
    + "\" align=absMiddle border=0> "
    +"<\/a>"
}

function writeSNS()
{
    document.writeln("<div class=\"share\"><span>分享到：</span>");

	for (var i = 0, iLen = snsInfo.length; i < iLen; i++) {
		document.writeln(makeShareCode(snsInfo[i].u, "http://news.hxsd.com/zt/2011/share/img/" + snsInfo[i].img, snsInfo[i].zh));
	}

    document.writeln("</div>");
}
writeSNS();
var newDiv=DOM.getElementsByClassName('share');
for(var n=0;n<newDiv.length;n++){
	var oSpan=newDiv[n].getElementsByTagName('span')[0];
	var oImg=newDiv[n].getElementsByTagName('img');
	var oA=newDiv[n].getElementsByTagName('a');
	//css如下：
	newDiv[n].style.zIndex="100"
	newDiv[n].style.lineHeight="16px"
	newDiv[n].style.height="16px"
	newDiv[n].style.fontSize="12px"
	for(var i=0;i<oA.length;i++){
		oImg[i].style.verticalAlign="-20%";
		oImg[i].style.border="none";
		oA[i].style.textDecoration="none";
		//oA[i].style.display="inline-block";
		oA[i].style.marginLeft="1px";
		oA[i].style.marginRight="1px";
	}
}


//	新浪部分
(function(){
  var _w = 16 , _h = 16;
  var param = {
	url:location.href,
	type:'3',
	count:'',
	appkey:'4243263641',
	title:"{eval _e('Webshare Begining')} {eval echo urlencode($shareTitle)}",
	pic:'{$corpInfo['logo']}',
	ralateUid:'2268384392',
	rnd:new Date().valueOf()
  }
  var temp = [];
  for( var p in param ){
	temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
  }
  document.write('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>')
})()

