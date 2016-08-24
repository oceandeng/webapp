/* 
* @Author: ocean
* @Date:   2015-07-09 15:08:54
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-05 16:57:04
*/

'use strict';
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


	$('#rule-btn').on('tap', function(){dialogFn('rulebox', toprule)});
	$('#how-btn').on('tap', function(){dialogFn('howbox', toprule)});

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
				var myScroll;

				(function(){
					myScroll = new IScroll('#'+ name +'', obj);
				})();
			}
		});
	}

	$('#appShare').on('tap', function(){
		location.href = $(this).attr('data-href');
	});
});

$(window).load(function(){
	$('.top-btn').addClass('circle-infinite');
})