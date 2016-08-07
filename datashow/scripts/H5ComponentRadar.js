/* 雷达图组件对象 */

var H5ComponentRadar = function(name, config){
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

	var r = w / 2;
	var step = config.data.length;

	// 测试代码 S
	// ctx.beginPath();
	// ctx.arc(r, r, 5, 0, 2*Math.PI);
	// ctx.stroke();
	// ctx.beginPath();
	// ctx.arc(r, r, r, 0, 2*Math.PI);
	// ctx.stroke();
	// 测试代码 E

	// 计算一个圆周上的坐标（计算多边形的顶点坐标）
	// 已知：圆心坐标（a, b)、半径 r; 角度deg;
	// rad = (2 * Math.PI / 360) * (360 / step) * i
	// x = a + Math.sin(rad) * r;
	// y = b + Math.cos(rad) * r;

	// 绘制网格背景（分面绘制，分为10份）
	var isBlue = false;
	for(var s = 10; s > 0; s--){
		ctx.beginPath();
		for(var i = 0; i < step; i++){
			var rad = (2 * Math.PI / 360) * (360 / step) * i
			var x = r + Math.sin(rad) * r * (s / 10);
			var y = r + Math.cos(rad) * r * (s / 10);		
			// ctx.arc(x, y, 5, 0, 2*Math.PI);
			ctx.lineTo(x, y)
		}
		ctx.closePath();
		ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
		ctx.fill()
	}
	// 绘制伞骨
	for(var i = 0; i < step; i++){
		var rad = (2 * Math.PI / 360) * (360 / step) * i
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r, r);
		ctx.lineTo(x, y);
		// 输出项目文字
		var $text = $('<div class="text"></div>');
		$text.text(config.data[i][0]);

		$text.css('transition', 'all ' + i*.5 + 's');

		if(x > w/2){
			$text.css('left', x/2 + 5);
		}else{
			$text.css('right', (w - x)/2 + 5)
		}
		if(y > h/2){
			$text.css('top', y/2 + 5);
		}else{
			$text.css('bottom', (h - y)/2 + 5)
		}

		if(config.data[i][2]){
			$text.css(config.data[i][2])
		}
		$text.css('opacity', 0);
	
		component.append($text);
	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();

	// 数据层开发
	// 加入一个画布（数据层）
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	/**
	* 绘制雷达图
	* @param {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
	* @return {DOM} Component元素
	*/
	var draw = function(per){
		if(per >= 1){
			component.find('.text').css('opacity', 1)
		}else{
			component.find('.text').css('opacity', 0)
		}

		ctx.clearRect(0, 0, w, h)
		// 输出数据的折线
		ctx.strokeStyle = '#ff7676';
		for(var i = 0; i < step; i++){
			var rad = (2 * Math.PI / 360) * (360 / step) * i;
			var rate = config.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;

			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.stroke();

		// 输出数据的点
		ctx.fillStyle = '#ff7676';
		for(var i = 0; i < step; i++){
			var rad = (2 * Math.PI / 360) * (360 / step) * i;
			var rate = config.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;

			ctx.beginPath();
			ctx.arc(x, y, 5, 0, 2*Math.PI)
			ctx.fill();
			ctx.closePath();
		}
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