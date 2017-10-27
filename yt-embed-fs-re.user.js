// ==UserScript==
// @name         Youtube Embed Full Screen Renable
// @namespace    ytfsre
// @version      0.2
// @description  Some sites don't let users full screen embedded video.  This will override that behavior.  This requires looking for embeded youtube videos on every site you visit so the permissions are broad.  The code is simple so take a second to double check it has not been altered to mine data.  Requires Greasemonkey/Tampermonkey to be installed.
// @author       Raymond Law
// @include http://*/*
// @include https://*/*
// @grant        none
// @run-at document-end
//
// Credits to @adil-malik and @Aristos for updateURLParameter()
// https://stackoverflow.com/a/10997390
//
// Change Log
// 0.2: Add support with fancybox.
// 0.1: Initial Release
// ==/UserScript==

function updateURLParameter(url, param, paramVal){
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
	var tmpAnchor;
	var TheParams;
    if (additionalURL){
        tmpAnchor = additionalURL.split("#");
        TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    else{
        tmpAnchor = baseURL.split("#");
        TheParams = tmpAnchor[0];
        TheAnchor  = tmpAnchor[1];
        if(TheParams)
            baseURL = TheParams;
    }
    if(TheAnchor)
        paramVal += "#" + TheAnchor;
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function add_full_screen(){
    var iframes = document.getElementsByTagName('iframe');
    for (var index = 0; index < iframes.length; ++index) {
        if(iframes[index].src.indexOf('youtube.com/embed/') > -1){
             iframes[index].src = updateURLParameter(iframes[index].src, 'fs', 1);
             iframes[index].setAttribute('allowFullScreen','allowFullScreen');
        }
    }
}

(function() {
    'use strict';
    add_full_screen();
    var fancybox = document.getElementsByClassName('js-fancybox-video');
    for (var i=0; i<fancybox.length;i++){
        fancybox[i].onclick = function(){
            setTimeout(add_full_screen,500);
            fancybox[i].onclick();
        };
    }
})();
