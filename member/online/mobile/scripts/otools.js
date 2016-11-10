/* 
* @Author: ocean
* @Date:   2015-06-29 10:14:28
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-08-05 10:12:41
*/

'use strict';
var ua = window.navigator.userAgent.toLowerCase();

var oTools = {
    charset: 'utf-8',
    // 版本检测
	isAndroid: /android/i.test(ua),
	isIOS: /iphone|ipad|ipod/i.test(ua),
	isWechat: /MicroMessenger/i.test(ua),
    // 检测是否支持 touch 事件
    clickEvent: "ontouchstart" in document.documentElement ? "tap" : "click",
    ranNum: Math.ceil(Math.random() * 1e10),
    timeNum: Date.now(),
    $: function(s){
        return document.querySelectorAll(s);
    },
    $$: function(s){
        return document.querySelector(s);
    },
    alertmess: function(str, time){
        var html = '<div class="mess">' + str + '</div>',
            fullW = $(window).width(),
            fullH = $(window).height(),
            twidth = parseInt(fullW * 0.8);

        if($('.mess').size() < 1){
            $('body').append(html);

            $('.mess').css({
                'width' : twidth,
                'min-height': '30px',
                'line-height' : '30px',
                'font-size': '16px',
                'marginLeft' : parseInt(-twidth/2-10),
                'background' : 'rgba(0, 0, 0, .8)',
                'color' : '#fff',
                'z-index' : 99999,
                'position' : 'fixed',
                'left' : '50%',
                'top' : '40%',
                'border-radius' : '5px',
                'text-align' : 'center',
                'padding' : '5px 10px'
            }).fadeIn();

            setTimeout(function(){
                $('.mess').fadeOut(function(){
                    $('.mess').remove();
                });
            }, time || 2000);
        }
    },
    msToTime: function(ms, showData){
        var date = new Date(parseInt(parseInt(ms) * 1000));
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());

        var h = (date.getHours() < 10 ? ('0' + date.getHours()) :  date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) :  date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) :  date.getSeconds());

        if(showData){
            m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) :  date.getMinutes());
            var dateTime = Y + M + D + ' ' + h + m;
        }else{
            var dateTime = h + m + s;
        }
        return dateTime;
    },
    msToDate: function(ms){
        var date = new Date(parseInt(parseInt(ms) * 1000));
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
        var _date = Y + M + D;
        return _date;
    }

};

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

// html5 audio
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;


$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);

        location.href = $_this.attr('data-href');
    });
});