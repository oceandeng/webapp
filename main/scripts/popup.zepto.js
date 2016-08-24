/* 
* @Author: ocean
* @Date:   2015-05-13 14:02:53
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-13 16:06:51
*/

'use strict';
;(function($){
//定义弹出层对象
	function Popup(opts){
		this.screenW = opts.screenW;
		this.screenH = opts.screenH;
		opts.path ? this.path = opts.path : '';

		this.init();
	};
//初始化
	Popup.prototype.init = function(){
		this.create();
	};
//定义Html
	Popup.prototype.create = function(){
		this.html = '<div id="popup">' + 
						'<div id="share-info"><img src="'+this.path+'" /></div>' +
						'<div id="share-btn"><div id="btn-close">我知道了</div></div>' +	
					'</div>';

		this.render();
	};
//渲染页面
	Popup.prototype.render = function(){
		$(this.html).appendTo('body');

		$('#popup').css({
			width: this.screenW,
			height: this.screenH,
			background: "rgba(0, 0, 0, 0.8)",
			zIndex: 99,
			position: 'fixed',
			top: 0,
			left: 0,
		});
		$('#popup').find('img').css({
			'max-width': '100%'
		});
		$('#share-info').css({
			position: 'absolute',
			width: '70%',
			right: '10%',
			top: '10px'

		});
		$('#share-btn').css({
			position: 'absolute',
			top: '50%',
			width: '100%'
		});
		$('#btn-close').css({
			width: '50%',
			height: '50px',
			lineHeight : '50px',
			fontSize: '20px',
			textAlign: 'center',
			color: '#ff9000',
			border: '2px solid #ff9000',
			marginLeft: 'auto',
			marginRight: 'auto'
		}).on('tap', function(){
			$('#popup').remove();
		});

	};

//定义外部调用接口
	$.myPlugin = {
		popup : function(opts){
			return new Popup(opts);
		}
	}

})(Zepto);