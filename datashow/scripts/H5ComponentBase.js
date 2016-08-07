/* 基本图文组件对象 */

var H5ComponentBase = function(name, config){

	var config = config || {};
	var id = ('h5C' + Math.random()).replace('.', '-');
	var className = ' h5-component-' + config.type;
	var component = $('<div class="h5-component ' + className + ' h5-component-name-' + name + '" id="' + id + '"></div>');

	config.text && component.text(config.text);
	config.width && component.width(config.width / 2);
	config.height && component.height(config.height / 2);

	config.css && component.css(config.css)
	config.bg && component.css('backgroundImage', 'url(' + config.bg + ')');

	if(config.center === true){
		component.css({
			marginLeft: (config.width / 4 * -1) + 'px',
			left: '50%'
		})
	}
	// 自定义参数
	if(typeof config.onclick == 'function'){
		component.on('click', config.onclick);
	}

    component.on('onLoad', function(){
    	setTimeout(function(){
	    	component.addClass(className + '-load').removeClass(className + '-leave');
	    	config.animateIn && component.animate(config.animateIn);
    	}, config.delay || 0)
        return false;
    })
    component.on('onLeave', function(){
    	setTimeout(function(){
    		component.addClass(className + '-leave').removeClass(className + '-load');
    		config.animateOut && component.animate(config.animateOut);
    	}, config.delay || 0)
        return false;
    })

	return component;
}