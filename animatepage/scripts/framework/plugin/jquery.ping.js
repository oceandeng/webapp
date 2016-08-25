;(function($){

	// 配置项
	var defaultSet = {};

	$.fn.pingTable = function(config){
		var config = $.extend({}, config, defaultSet)
		var $_this = $(this);

		return $_this.each(function(){
			$_this.find('.s-table-con').css({
				width: config.width,
			});

		    $_this.css({height: config.height}).each(function(){
		    	$_this.data('slt', {sl: this.scrollLeft, st: this.scrollTop});
		    }).scroll(function(){
		    	var sl = this.scrollLeft,
		    		st = this.scrollTop,
		    		d = $_this.data('slt');

		    	if(sl != d.sl){
		    		if(sl == 0){
		    			$_this.find('.leftPing,.ltPing').css({
		    				position: 'static'
		    			}).parent().css({
		    				paddingLeft: 0
		    			})
		    		}else{
		    			$_this.find('.leftPing,.ltPing').css({
		    				position: 'absolute',
		    				left: sl,
		    				zIndex: 1
		    			}).parent().css({
		    				paddingLeft: $_this.find('.leftPing').outerWidth()
		    			});
		    			$_this.find('.topPing').css({
		    				zIndex: 2
		    			})
		    		}
		    	}
		    	if(st != d.st){
		    		if(st == 0){
		    			$_this.find('.topPing,.lTopPing').css({
		    				position: 'static'
		    			}).next().css({
		    				paddingTop: 0
		    			})
		    		}else{
		    			$_this.find('.leftPing').css({
		    				zIndex: 1
		    			})
		    			$_this.find('.lTopPing').css({
		    				position: 'absolute',
		    				top: st,
		    				zIndex: 9
		    			}).next().css({
		    				paddingTop: $_this.find('.topPing').outerHeight()
		    			});
		    			$_this.find('.topPing').css({
		    				position: 'absolute',
		    				top: st,
		    				zIndex: 2
		    			}).next().css({
		    				paddingTop: $_this.find('.topPing').outerHeight()
		    			})
		    		}
		    	}
		    	$_this.data('slt', {sl: sl, st: st});
		    });

		});
	}
/*
    // 各行换色
    $('.part-one').find('.leftPing').each(function(k, v){
        if(k % 2 == 0){
            $(v).css({
                background: '#ccc'
            })
        }
    });
*/
})(jQuery);