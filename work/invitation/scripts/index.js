var StartApp = function(){};

StartApp.prototype = {
	constructor: StartApp,
	start: function(){
		this.init();
		this.dialogQR();
	},
	init: function(){
		var sW = 0, sH = 0, dW = 0, dH = 0;

		sW = $(window).width(),
		sH = $(window).height(),
		dW = document.body.clientWidth,
		dH = document.body.clientHeight;

		if(dH < sH){
			$('body').css({
				height: sH
			});
		};
	},
	backImg: function(){
		function resizeImg() {
			var bgImg = $('.body-bg').find('img');
			var imgwidth = bgImg.width();
			var imgheight = bgImg.height();
			var winwidth = $(window).width();
			var winheight = $(window).height();
			var widthratio = winwidth/imgwidth;
			var heightratio = winheight/imgheight;
			var widthdiff = heightratio*imgwidth;
			var heightdiff = widthratio*imgheight;

			if(heightdiff > winheight) {
				bgImg.css({
					width: winwidth+'px',
					height: heightdiff+'px'
				});
			} else {
				bgImg.css({
					width: widthdiff+'px',
					height: winheight+'px'
				});
			}
		}
		resizeImg();
	},
	dialogQR: function(){
		$('#open').on(oTools.clickEvent, function(){
		    attention();
		})
		// 提示二维码
		function attention(){
			var download = new Dialog({
			    'id': 'attention',
			    'type': 'popup',
			    'lock':true,
			    'width':'70%',
			    'height': 'auto',
			    'closeButton': false,
			    'animation':'animated bounceInDown',
			    'contentStyle': {
			        'background': '#fff',
			        'border-radius': '5px',
			        'padding': '10px 0'
			    }
			});
		}
	}
}

var startApp = new StartApp();
$(function(){
	startApp.start();
})
$(window).load(function(){
	startApp.backImg();
});
$(window).resize(function(){
	startApp.backImg()
});