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

	// 水平线 100份 -> 10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#f00";

	window.ctx = ctx;
	for(var i = 0; i < step + 1; i++){
		var y = (h / step) * i;
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);

	}

	// 垂直网格线 
	step = config.data.length + 1;
	for(var i = 0; i < step + 1; i++){
		var x = (w/step) * i;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
	}


	ctx.stroke();



	component.append(canvas);

	return component;
}