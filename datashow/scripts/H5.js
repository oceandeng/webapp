/* 内容管理对象 */

var H5 = function(){

	this.id = ('h5-' + Math.random()).replace('.', '-');
	this.ele = $('<div class="h5" id="' + this.id + '">').hide();
	this.page = [];

	$('body').append(this.ele);

	/*
	* 新增一个页面
	* @param {string} name 组件的名称，会加入到ClassName中
	* @param {string} text 页面的默认文本
	* @return {H5} H5对象，可以重复使用H5对象支持的方法
	*/
	this.addPage = function(name, text){
		var page = $('<div class="h5-page section"></div>');

		if(name != undefined){
			page.addClass('h5-page-' + name);
		}
		if(text != undefined){
			page.text(text);
		}
		this.ele.append(page);
		this.page.push(page);
		if(typeof this.whenAddPage === 'function'){
			this.whenAddPage();
		}
		return this;
	}

	// 新增一个组件
	this.addComponent = function(name, config){
		var config = config || {};
		config = $.extend({type: 'base'}, config);

		var component;  //定义一个变量，存储组件元素
		var page = this.page.slice(-1)[0];

		switch(config.type){
			case 'base':
				component = new H5ComponentBase(name, config);
				break;
			case 'polyline':
				component = new H5ComponentPolyline(name, config);
				break;
			case 'pie':
				component = new H5ComponentPie(name, config);
				break;
			case 'bar':
				component = new H5ComponentBar(name, config);
				break;
			case 'bar_v':
				component = new H5ComponentBar_v(name, config);
				break;
			case 'radar':
				component = new H5ComponentRadar(name, config);
				break;
			case 'ring':
				component = new H5ComponentRing(name, config);
				break;
			case 'point':
				component = new H5ComponentPoint(name, config);
				break;

			default: 
		}

		page.append(component);
		return this;
	}

	// H5对象初始化呈现
	this.loader = function( firstPage ){
		this.ele.fullpage({
			onLeave: function(index, nextIdex, direction){
                $(this).find('.h5-component').trigger('onLeave');
            },
            afterLoad: function(anchorLink, index){
                $(this).find('.h5-component').trigger('onLoad');
            }
		});
		this.page[0].find('.h5-component').trigger('onLoad');
		this.ele.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	}
	this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;
	return this;
}