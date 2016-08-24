/* 
* @Author: ocean
* @Date:   2015-07-09 15:08:54
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-05 15:43:05
*/

'use strict';

// 全局滚动
var wrapScroll;

var winW, winH;

$(function(){
	winW = $(window).width();
	winH = $(window).height();

});

document.addEventListener('touchmove', function (e){e.preventDefault()}, false);

$(window).load(function(){

	function wraploaded () {
		wrapScroll = new IScroll('#wrapper', {
			probeType: 3,
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			bounce: false
		});
	}
	
	wraploaded();
});
// 弹层滚动
$(function(){

	var toprule = {
			scrollbars: true,
			hideScrollbar: false,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			// fadeScrollbars: true,
			bounce: false,
	}

	var ajaxPage = {
			probeType: 2,
			scrollbars: true,
			mouseWheel: true,  
			fadeScrollbars: true,
			bounce:true,
			interactiveScrollbars:true,
			shrinkScrollbars:'scale',
			click: true ,
			keyBindings:true,
			momentum:true
	}

	// 上拉加载
	// var pullDownEl, 
	// 	pullDownL;  
   	var pullUpEl, 
		pullUpL;  
	var Downcount = 0 ,
		Upcount = 0;  
		var loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  

	function pullUpAction(myScroll) {//上拉事件
		setTimeout(function() {
			ajaxUpLoad();

		    pullUpEl.removeClass('loading');
		    pullUpL.html('上拉显示更多...');
		    pullUpEl['class'] = pullUpEl.attr('class');
		    // pullUpEl.attr('class','').hide();
		    myScroll.refresh();
		    loadingStep = 0;
		}, 1000);
	}

	$('#rule-btn').on('tap', function(){dialogFn('rulebox', toprule)});
	$('#how-btn').on('tap', function(){dialogFn('howbox', toprule)});

	$('#ranking').on('tap', function(){dialogFn('rankingbox', ajaxPage, true)});

	function dialogFn(name, obj, ajaxFn) {
		var html = $('.'+ name +'').html(),
			path = gConfig.path + 'images/close.png';

		Dialog({
			'id': name,
			'type': 'popup',
			'lock':true,
			'width':'100%',
			'height': '100%',
			'closeImg': path,
			'closeTop': '0px',
			'closeRight': '0px',
			'animation':'animated bounceIn',
			'onReady': function(){
				rankp = 1;
				if(pullUp == true){
					$('#pullUp').show();
				};
				var myScroll;

				(function(){
					pullUpEl = $('#pullUp');  
			        pullUpL = pullUpEl.find('.pullUpLabel');  
			        pullUpEl['class'] = pullUpEl.attr('class');  
			        pullUpEl.attr('class','');  
					
					myScroll = new IScroll('#'+ name +'', obj);
				})();

				if(ajaxFn){
			        //滚动时
			        myScroll.on('scroll', function(){
			            if(loadingStep == 0 && !pullUpEl.attr('class').match('flip|loading')){
				            if (this.y < (this.maxScrollY - 5)) {
				                //上拉刷新效果
				                pullUpEl.attr('class',pullUpEl['class']);
				                // pullUpEl.show();
				                myScroll.refresh();
				                pullUpEl.addClass('flip');
				                pullUpL.html('准备加载...');
				                loadingStep = 1;
				            }
			            }
			        });
			        //滚动完毕
			        myScroll.on('scrollEnd',function(){
			            if(loadingStep == 1){
				            if (pullUpEl.attr('class').match('flip|loading')) {
				                    pullUpEl.removeClass('flip').addClass('loading');
				                pullUpL.html('加载中...');
				                loadingStep = 2;
				                pullUpAction(myScroll);
				            }
			            }
			        });
				}
			}
		});
	}
	
    $('#friendBtn').on('tap', function(){
		if(oTools.isWechat){
			$.myPlugin.popup({
				screenW : winW,
				screenH : winH,
				path : gConfig.path + '/images/share-info.png'
			});
		}else{
			oTools.alertmess('打开浏览器菜单，点击分享按钮分享给朋友');
		}

    });	
});

// 动态数字
// $(function(){
// 	var demo = new CountUp("scoreNum", 0, 660, 0, 2);
// 	demo.start();
// })

var screenW,
    screenH;

$(function(){

  screenW = $("#score").width();
  progressbar(gConfig.gameScore);

});

// loading
function showLoading(){
	$('<canvas id="canvas"></canvas>').appendTo('body');
	$('#canvas').css({
		'border-radius':'5px',
		'background':'rgba(0,0,0,0.8)',
		'z-index': 999,
		'position': 'fixed',
		'top': '20%',
		'left': '50%',
		'margin-left': -40
	});
	oTools.loading({
		"id": "canvas",
		"width": 5,
		"height": 20
	});
}


// 全局滚动
// var wrapScroll;

// document.addEventListener('touchmove', function (e){e.preventDefault()}, false);

// $(window).load(function(){

// 	function wraploaded () {
// 		wrapScroll = new IScroll('#wrapper', {
// 			probeType: 3,
// 			scrollbars: true,
// 			mouseWheel: true,
// 			interactiveScrollbars: true,
// 			shrinkScrollbars: 'scale',
// 			fadeScrollbars: true,
// 			bounce: false
// 		});
// 	}

// 	wraploaded();
// });
// // 弹层滚动
// $(function(){

// 	var toprule = {
// 			scrollbars: true,
// 			hideScrollbar: false,
// 			mouseWheel: true,
// 			interactiveScrollbars: true,
// 			shrinkScrollbars: 'scale',
// 			// fadeScrollbars: true,
// 			bounce: false,
// 	}

// 	var ajaxPage = {
// 			probeType: 2,
// 			scrollbars: true,
// 			mouseWheel: true,  
// 			fadeScrollbars: true,
// 			bounce:true,
// 			interactiveScrollbars:true,
// 			shrinkScrollbars:'scale',
// 			click: true ,
// 			keyBindings:true,
// 			momentum:true
// 	}

// 	// 上拉加载
// 	// var pullDownEl, 
// 	// 	pullDownL;  
//    	var pullUpEl, 
// 		pullUpL;  
// 	var Downcount = 0 ,
// 		Upcount = 0;  
// 		var loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  

// 	function pullUpAction(myScroll) {//上拉事件
// 		setTimeout(function() {

// var html = '<dt class="rank-num">1</dt><dd class="rank-info"><div class="rank-head"><img src="' + gConfig.path + 'images/test-header.jpg" alt=""></div><div class="rank-name"><p>哈萨德</p></div></dd><dd class="total-score">获得<span>5555</span>个徽章</dd>';

// $('#rankDl').append(html);
// // ajaxUpLoad();

// 		    pullUpEl.removeClass('loading');
// 		    pullUpL.html('上拉显示更多...');
// 		    pullUpEl['class'] = pullUpEl.attr('class');
// 		    // pullUpEl.attr('class','').hide();
// 		    myScroll.refresh();
// 		    loadingStep = 0;
// 		}, 1000);
// 	}

// 	$('#rule-btn').on('tap', function(){dialogFn('rulebox', toprule)});
// 	$('#how-btn').on('tap', function(){dialogFn('howbox', toprule)});

// 	$('#ranking').on('tap', function(){dialogFn('rankingbox', ajaxPage, true)});

// 	function dialogFn(name, obj, ajaxFn) {
// 		var html = $('.'+ name +'').html(),
// 			path = gConfig.path + 'images/close.png';

// 		Dialog({
// 			'id': name,
// 			'type': 'popup',
// 			'lock':true,
// 			'width':'100%',
// 			'height': '100%',
// 			'closeImg': path,
// 			'closeTop': '0px',
// 			'closeRight': '0px',
// 			'animation':'animated bounceIn',
// 			'onReady': function(){
// 				var myScroll;

// 				(function(){
// 					pullUpEl = $('#pullUp');  
// 			        pullUpL = pullUpEl.find('.pullUpLabel');  
// 			        pullUpEl['class'] = pullUpEl.attr('class');  
// 			        pullUpEl.attr('class','');  
					
// 					myScroll = new IScroll('#'+ name +'', obj);
// 				})();

// 				if(ajaxFn){
// 			        //滚动时
// 			        myScroll.on('scroll', function(){
// 			            if(loadingStep == 0 && !pullUpEl.attr('class').match('flip|loading')){
// 				            if (this.y < (this.maxScrollY - 5)) {
// 				                //上拉刷新效果
// 				                pullUpEl.attr('class',pullUpEl['class']);
// 				                // pullUpEl.show();
// 				                myScroll.refresh();
// 				                pullUpEl.addClass('flip');
// 				                pullUpL.html('准备加载...');
// 				                loadingStep = 1;
// 				            }
// 			            }
// 			        });
// 			        //滚动完毕
// 			        myScroll.on('scrollEnd',function(){
// 			            if(loadingStep == 1){
// 				            if (pullUpEl.attr('class').match('flip|loading')) {
// 				                    pullUpEl.removeClass('flip').addClass('loading');
// 				                pullUpL.html('加载中...');
// 				                loadingStep = 2;
// 				                pullUpAction(myScroll);
// 				            }
// 			            }
// 			        });
// 				}
// 			}
// 		});
// 	}

// 	$('#beginbtn').on('tap', function(){
// 		location.href = $(this).attr('data-href');
// 	});

//     $('#friendBtn').on('tap', function(){
// 		if(oTools.isWechat){
// 			$.myPlugin.popup({
// 				screenW : screenW,
// 				screenH : screenH,
// 				path : gConfig.path + '/images/share-info.png'
// 			});
// 		}else{
// 			oTools.alertmess('打开浏览器菜单，点击分享按钮分享给朋友');
// 		}

//     });	
// });

// // 动态数字
// // $(function(){
// // 	var demo = new CountUp("scoreNum", 0, 660, 0, 2);
// // 	demo.start();
// // })

// var screenW,
//     screenH;

// $(function(){

//   screenW = $("#score").width();
//   progressbar(gConfig.gameScore);

// });

// // loading
// function showLoading(){
// 	$('<canvas id="canvas"></canvas>').appendTo('body');
// 	$('#canvas').css({
// 		'border-radius':'5px',
// 		'background':'rgba(0,0,0,0.8)',
// 		'z-index': 999,
// 		'position': 'fixed',
// 		'top': '20%',
// 		'left': '50%',
// 		'margin-left': -40
// 	});
// 	oTools.loading({
// 		"id": "canvas",
// 		"width": 5,
// 		"height": 20
// 	});
// }
