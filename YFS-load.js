if ( "undefined" == typeof(YFS) || !YFS ) {
	var YFS = {};
}
YFS.Script = {
	loadedScripts : [],
	STATUS : {
		LOADED : 1,
		LOADING : 2
	},
	cached: {},
	loadScript: function(url, onload) {
		if(YFS.Script.loadedScripts[url])
			return;
		YFS.Script.loadedScripts[url] = YFS.Script.STATUS.LOADING;
		YFS.Script.loadScriptDomElement(url, onload);
	},
	onload : function(url, callback){
		return function(){
			YFS.Script.loadedScripts[url] = YFS.Script.STATUS.LOADED;
			if(callback){
				callback()
			}
			
		}
	},
	loadScripts: function(aUrls, onload, useScriptDom, uniqueOff) {
		// first pass: see if any of the scripts are on a different domain
		var nUrls = aUrls.length;
		var bDifferent = false;
		if(!uniqueOff)
		{
			for(var i = nUrls - 1; i >= 0; i--){
				if(!!YFS.Script.loadedScripts[aUrls[i]] && YFS.Script.loadedScripts[aUrls[i]] == YFS.Script.STATUS.LOADED)
				{
					aUrls.splice(i,1);
				}
			}
			nUrls = aUrls.length;
			if(nUrls == 0 && onload)
			{
				onload();
				return;
			}
		}
		
		
		if(!!useScriptDom)
			bDifferent = true;
		else{
			for ( var i = 0; i < nUrls; i++ ) {
				if ( YFS.Script.differentDomain(aUrls[i]) ) {
					bDifferent = true;
					break;
				}
			}
		}
			
		// pick the best loading function
		var loadFunc = YFS.Script.loadScriptXhrInjection;
		if ( bDifferent ) {
			//loadFunc = YFS.Script.loadScriptDocWrite;/*
			if (!!useScriptDom || -1 != navigator.userAgent.indexOf('Firefox') || 
				 -1 != navigator.userAgent.indexOf('Opera') ) {
				loadFunc = YFS.Script.loadScriptDomElement;
			}
			else {
				loadFunc = YFS.Script.loadScriptDocWrite;
			}
		}
		// second pass: load the scripts
		for ( var i = 0; i < nUrls; i++ ) {
			loadFunc(aUrls[i], ( i+1 == nUrls ? onload : null ), true);
		}
	},

	differentDomain: function(url) {
		if ( 0 === url.indexOf('http://') || 0 === url.indexOf('https://') ) {
			var mainDomain = document.location.protocol + 
				"://" + document.location.host + "/";
			return ( 0 !== url.indexOf(mainDomain) );
		}
		
		return false;
	},

	loadScriptDomElement: function(url, onload) {
		var oHead = document.getElementsByTagName('head')[0];
		var domscript = document.createElement('script');
		domscript.src = url;
		domscript.onloadDone = false;
		YFS.addHandler(domscript, 'load', function() { 
			if ( !domscript.onloadDone ) {
				domscript.onloadDone = true;
				oHead.removeChild(domscript);
				if(onload){
					onload();
				}
			}
		});
		
		YFS.addHandler(domscript, 'readystatechange', function() { 
			if ( ( "loaded" === domscript.readyState || "complete" === domscript.readyState ) && !domscript.onloadDone ) {
				domscript.onloadDone = true;
				oHead.removeChild(domscript);
				if(onload){
					onload();
				}
			}
		});
		oHead.appendChild(domscript);
		//document.getElementsByTagName('head')[0].appendChild(domscript);
	},

	loadScriptDocWrite: function(url, onload) {
		if(YFS.Script.loadedScripts[url] !== YFS.Script.STATUS.LOADING)
		{
			document.write('<scr' + 'ipt src="' + url + 
					   '" type="text/javascript"></scr' + 'ipt>');
			YFS.Script.loadedScripts[url] = YFS.Script.STATUS.LOADING;
		}
		YFS.addHandler(window, "load", YFS.Script.onload(url, onload));
	},

	queuedScripts: new Array(),

	loadScriptXhrInjection: function(url, onload, bOrder) {
		var iQueue = YFS.Script.queuedScripts.length;
		if ( bOrder ) {
			if(!YFS.Script.loadedScripts[url] || (YFS.Script.loadedScripts[url] == YFS.Script.STATUS.LOADING && onload))
			{
				var qScript = { response: null, onload: onload, done: false , url: url};
				YFS.Script.queuedScripts[iQueue] = qScript;
				 if(YFS.Script.loadedScripts[url] == YFS.Script.STATUS.LOADING && onload)
					 qScript.response = YFS.Script.STATUS.LOADING;
			}
		}

		if(YFS.Script.loadedScripts[url] !== YFS.Script.STATUS.LOADING)
		{
			var xhrObj = YFS.Script.getXHRObject();
			xhrObj.onreadystatechange = function() { 
				if ( xhrObj.readyState == 4 ) {
					if ( bOrder ) {
						YFS.Script.queuedScripts[iQueue].response = xhrObj.responseText;
						YFS.Script.injectScripts();
					}
					else {
						var se = document.createElement('script');
						document.getElementsByTagName('head')[0].appendChild(se);
						se.text = xhrObj.responseText;
						if ( onload ) {
							onload();
						}
					}
				}
			};
			YFS.Script.loadedScripts[url] = YFS.Script.STATUS.LOADING;
			xhrObj.open('GET', url, true);
			xhrObj.send('');
		}
	},

	injectScripts: function(url) {
		var len = YFS.Script.queuedScripts.length;
		for ( var i = 0; i < len; i++ ) {
			var qScript = YFS.Script.queuedScripts[i];
			if ( ! qScript.done ) {
				if ( ! qScript.response ) {
					// STOP! need to wait for this response
					break;
				}
				else {
					if(qScript.response !== YFS.Script.STATUS.LOADING)
					{
						var se = document.createElement('script');
						document.getElementsByTagName('head')[0].appendChild(se);
						se.text = qScript.response;
					}
					YFS.Script.loadedScripts[qScript.url] = YFS.Script.STATUS.LOADED;
					if ( qScript.onload ) {
						qScript.onload();
					}
					qScript.done = true;
				}
			}
		}
	},

	getXHRObject: function() {
		var xhrObj = false;
		try {
			xhrObj = new XMLHttpRequest();
		}
		catch(e){
			var aTypes = ["Msxml2.XMLHTTP.6.0", 
						  "Msxml2.XMLHTTP.3.0", 
						  "Msxml2.XMLHTTP", 
						  "Microsoft.XMLHTTP"];
			var len = aTypes.length;
			for ( var i=0; i < len; i++ ) {
				try {
					xhrObj = new ActiveXObject(aTypes[i]);
				}
				catch(e) {
					continue;
				}
				break;
			}
		}
		finally {
			return xhrObj;
		}
	}
};

YFS.addHandler = function(elem, type, func) {
	if ( elem.addEventListener ) {
		elem.addEventListener(type, func, false);
	}
	else if ( elem.attachEvent ) {
		elem.attachEvent("on" + type, func);
	}
};
