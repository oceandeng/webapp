/*
* @Author: ocean_deng
* @Date:   2016-07-23 20:52:43
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-08-13 23:33:53
*/

'use strict';

var H5_loading = function(images, firstPage){
	var id = this.id;
	if(this._images === undefined){ //第一次进入
		this._images = (images || []).length;
		this._loaded = 0;

		window[id] = this;	//把当前对象存储在全局对象 window中，用来进行某个图片加载完成之后的回调

		for(var s in images){
			var item = images[s];
			var image = new Image();
			image.onload = function(){
				window[id].loader();
			}
			image.src = item;
		}

		$('#rate').text('0%');
		return this;
	}else{
		this._loaded++;
		$('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');

		if(this._loaded < this._images){
			return this;
		}
	}

	window[id] = null;

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