/* 柱图组件对象 */

var H5ComponentPolyline = function(name, config){
	var component = new H5ComponentBase(name, config);

	// 绘制网格线
	var w = config.width;
	var h = config.height;

	// 加入一块画布 （网格线背景）
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	// 水平线 100份 -> 10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#aaa";

	window.ctx = ctx;
	for(var i = 0; i < step + 1; i++){
		var y = (h / step) * i;
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
	}
	// 垂直网格线
	step = config.data.length + 1;
	var textW = w / step >> 0;
	for(var i = 0; i < step + 1; i++){
		var x = (w/step) * i;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);

		if(config.data[i]){
			var text = $('<div class="text"></div>')
			text.text(config.data[i][0]);

			text.css('width', textW / 2).css('left', x / 2 + textW / 4);

			component.append(text);
		}
	}

	ctx.stroke();

	// 加入一块画布 - 数据层
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	/**
	* 绘制折线以及对应的数据和阴影
	* @param {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
	* @return {DOM} Component元素
	*/
	var draw = function(per){
		// 清空画布
		ctx.clearRect(0, 0, w, h);
		// 绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#ff8878";

		var x = 0;
		var y = 0;
		var rotW = (w / (config.data.length + 1));

		// 画点
		for( var i in config.data){
			var item = config.data[i];
			x = rotW * i + rotW;
			y = h - (item[1] * h * per);

			ctx.moveTo(x, y);
			ctx.arc(x, y, 5, 0, 2*Math.PI);
		}
		// 连线
		// 移动画笔到第一个数据点的位置
		ctx.moveTo(rotW, h - (config.data[0][1] * h * per))
		for(var i in config.data){
			var item = config.data[i];
			x = rotW * i + rotW;
			y = h - (item[1] * h * per);
			ctx.lineTo(x, y);
		}
		ctx.stroke();

		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(255, 136, 120, 0)';


		// 绘制阴影
		ctx.lineTo(x, h);
		ctx.lineTo(rotW, h);
		ctx.fillStyle = 'rgba(255, 136, 120, .2)';
		ctx.fill();
		// 写数据
		for( var i in config.data){
			var item = config.data[i];
			x = rotW * i + rotW;
			y = h - (item[1] * h * per);
			ctx.fillStyle = item[2] ? item[2] : '#595959';
			ctx.fillText(((item[1] * 100)>>0) + '%', x - 10, y - 10);
		}
		ctx.stroke();
	}

	component.on('onLoad', function(){
		var s = 0;
		for(i = 0; i < 100; i++){
			setTimeout(function(){
				s += .01;
				draw(s);
			}, i * 10 + 500);
		}
	});
	component.on('onLeave', function(){
		var s = 1;
		for(i = 0; i < 100; i++){
			setTimeout(function(){
				s -= .01;
				draw(s);
			}, i * 10);
		}
	});

	return component;
}