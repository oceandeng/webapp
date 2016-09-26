var StartApp = function(){};
StartApp.prototype = {
	constructor: StartApp,
	start: function(){
		this.dialog();
		this.trip();
	},
	slier: function(){
		// 幻灯调用

		$('.top-banner').show()
		$.each($('.swiper-slide'), function(k, v){
			var h = $(v).find('img').height()
			$('.swiper-container').css({'height': h});
		})
		var mySwiper = new Swiper('.swiper-container', {
		    pagination: '.pagination',
		    loop: true,
		    grabCursor: true,
		    paginationClickable: true
		})
	},
	dialog: function(){
		var map = null;
		// 地图弹层
		$('#showMap').on(oTools.clickEvent, function(){
			mapPopup(map)
		})
		// 嘉宾弹层
		$('#guest').on(oTools.clickEvent, '.list-nh-row', function(){
			var $_this = $(this),
				userImg = $_this.find('img').attr('src'),
				username = $_this.find('.username').text(),
				userinfo = $_this.find('.userinfo').text(),
				html = '';

			html += '<div class="u-img"><img src="' + userImg + '" alt="" /></div>'
			html += '<div class="u-box"><div class="u-name">' + username + '</div>'
			html += '<div class="u-info">' + userinfo + '</div></div>'

			$('#userPopup').empty();
			$('#userPopup').append(html);
			userPopup();
		});
	},
	trip: function(){
		// 日程切换 S
		var calendar = {}
		var $tD = $('#tripDay'),
			$tC = $('#tripCon');

		$.ajax({
			type: 'GET',
			url: 'http://ocean.cn/interface/test.php',
			dataType: 'json',
			success: function(data){
				calendar = data;
				injectData({
					data: calendar,
					index: 0,
					$tD: $tD,
					$tC: $tC
				}, calendar)
			}
		})

		$('#leftArrow').on(oTools.clickEvent, function(){
			var iNum = $tD.attr('data-index');
			(iNum > 0) ? iNum-- : (iNum = 0);

			injectData({
				data: calendar,
				index: iNum,
				$tD: $tD,
				$tC: $tC
			}, calendar)
		})
		$('#rightArrow').on(oTools.clickEvent, function(){
			var iNum = $tD.attr('data-index');
			(iNum < calendar.length - 1) ? iNum++ : (iNum = calendar.length - 1);

			injectData({
				data: calendar,
				index: iNum,
				$tD: $tD,
				$tC: $tC
			}, calendar)
		})
		// 日程切换 E
	}

}
var startApp = new StartApp();
$(function(){
	startApp.start();
})
$(window).on('load', function(){
	startApp.slier();
})

function mapPopup(map){
    var mapPopup = new Dialog({
        'id': 'mapPopup',
        'type': 'popup',
        'lock':true,
        'width':'90%',
        'height': 'auto',
        'closeButton': false,
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': '#fff',
            'border-radius': '5px',
        },
        'onReady': function(){
			// 百度地图API功能
			map = new BMap.Map("mapContainer");    // 创建Map实例
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        },
        'onClose': function(){
			map = null
        }
    });
}
function userPopup(){
    var userPopup = new Dialog({
        'id': 'userPopup',
        'type': 'popup',
        'lock':true,
        'width':'80%',
        'height': 'auto',
        'closeButton': false,
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': '#fff',
            'border-radius': '5px',
            'padding': '10px 5%'
        }
    });
}
function injectData(obj, calendar){
	var html = '';
	calendar = obj.data;
	html += '<ul>';
	for(var i = 0, len = calendar[obj.index].list.length; i < len; i++){
		html += '<li>' + oTools.msToTime(calendar[obj.index].list[i].start_time) + ' ' + calendar[obj.index].list[i].content + '</li>';
	}
	html += '</ul>';
	obj.$tD.html(oTools.msToDate(calendar[obj.index].date)).attr('data-index', obj.index);
	obj.$tC.html(html);
}