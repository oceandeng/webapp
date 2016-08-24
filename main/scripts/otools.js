/* 
* @Author: ocean
* @Date:   2015-07-06 16:11:13
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-31 17:33:03
*/

'use strict';

var ua = window.navigator.userAgent.toLowerCase();

var oTools = {
    // 版本检测
	isAndroid: /android/i.test(ua),
	isIOS: /iphone|ipad|ipod/i.test(ua),
	isWechat: /MicroMessenger/i.test(ua),
    // 检测是否支持 touch 事件
    clickEvent: "ontouchstart" in document.documentElement ? "touchstart" : "click",

    alertmess: function(str){
        var html = '<div class="mess">' + str + '</div>',
            fullW = $(window).width(),
            fullH = $(window).height(),
            twidth = parseInt(fullW * 0.6);

        if($('.mess').size() < 1){
            $('body').append(html);

            $('.mess').css({
                'width' : twidth,
                'min-height': '30px',
                'line-height' : '30px',
                'font-size': '16px',
                'marginLeft' : parseInt(-twidth/2-10),
                'background' : 'rgba(255, 145, 0, .9)',
                'color' : '#fff',
                'z-index' : 99999,
                'position' : 'fixed',
                'left' : '50%',
                'top' : '40%',
                'border-radius' : '5px',
                'text-align' : 'center',
                'padding' : '5px 10px'
            }).show();
        
            setTimeout(function(){
                $('.mess').remove();
            }, 1500);
        }
    },
    loading : function(arg){
        var isEmpty = function(obj){
            var name;
            for(name in obj){
                return false;
            }
            return true;
        };

        function LoadingImg(arg){
            this.init(arg);
        }

        LoadingImg.prototype = {
            constructor:LoadingImg,
            init: function (arg) {
                var isConsist = !isEmpty(arg);
                this.block = isConsist ? arg.block ? arg.block : 12 : 12;
                this.height = isConsist ? arg.height ? arg.height : 15 : 15;
                this.width = isConsist ? arg.width ? arg.width : 3 : 3;
                this.time = isConsist ? arg.time ? arg.time : 100 : 100;

                this.cvs = document.getElementById(arg.id);

                this.cvs.width = 160;
                this.cvs.height = 160;
                this.cvs.style.width = "80px";
                this.cvs.style.height = "80px";

                this.ctx = this.cvs.getContext("2d");
                this.ctx.width = this.height*6;
                this.ctx.height = this.height*6;

                this.ctx.translate(this.ctx.width/1.5, this.ctx.height/1.5);
                var radius = 2;
                this.view(radius);
            },
            loop: function(alpha){
                this.ctx.rotate(Math.PI*2/this.block);
                this.ctx.beginPath();
                this.ctx.fillStyle = "rgba(255,255,255,"+alpha+")";
                this.ctx.arc(0, this.ctx.width/2-this.height*2,this.width/2, 0 ,Math.PI, true);
                this.ctx.arc(0, this.ctx.width/2-this.height, this.width/2, Math.PI, 0, true);
                this.ctx.closePath();
                this.ctx.fill();
            },
            view: function(radius){
                var that = this;
                this.ctx.rotate(Math.PI*2/this.block);
                for(var i = 1; i <= this.block; i ++){
                    this.loop(i/this.block);
                };
                setTimeout(function(){
                    that.ctx.clearRect(-that.ctx.width/2, -that.ctx.height/2, that.ctx.width, that.ctx.height);
                    radius >= that.block? radius = 1:radius += 1;
                    that.view(radius);
                }, that.time);
            
            }
        }
        return new LoadingImg(arg);
    },
    getCookie: function(name){
        var cookie_start = document.cookie.indexOf(name);
        var cookie_end = document.cookie.indexOf(";", cookie_start);
        return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
    }
}

//html5 动画
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function(callback) {
            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
        };
})();