var directives = angular.module('member.directives', []);

directives.directive('selectBox', function() {//下拉列表美化
    return {
        restrict : 'A',
        link : function(scope, element, attr, ngModel) {
            element.selectBox();

			element.selectBox().change(function () {
			    var val = $(this).val();

			    switch(val){
			    	case '1':
			    		scope.cardNumTypeOne = true;
			    		scope.cardNumTypeTwo = false;
			    		break;
			    	case '3':
			    		scope.cardNumTypeTwo = true;
			    		scope.cardNumTypeOne = false;
			    		break;
			    	default:
			    		scope.cardNumTypeOne = false;
			    		scope.cardNumTypeTwo = false;
			    }
			    scope.$apply();
			});
        }
    }
});

directives.directive('radioSwitch', ["$parse", function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attr, ngModel){
			var $oBox = element.find('#outBox'),
				$iBox = element.find('#inBox'),
				$input = element.find('input'),
				scopeProp = $input.attr('ng-model');

			scope.$watch(scopeProp, function(){
				var val = $input.val();

				if(val == 0){
					$oBox.removeClass();
					$oBox.addClass('close-one');
					$iBox.removeClass();
					$iBox.addClass('close-two');
				}else if(val == 1){
					$oBox.removeClass();
					$oBox.addClass('open-one');
					$iBox.removeClass();
					$iBox.addClass('open-two');
				}
			})

			$oBox.on('click', function(){
				var $this = $(this);

				if($iBox.hasClass('close-two')){
					$iBox.removeClass();
					$iBox.addClass('open-two');
				}else{
					$iBox.removeClass();
					$iBox.addClass('close-two');
				}

				if($this.hasClass('close-one')){
					$this.removeClass();
					$this.addClass('open-one');
					$parse(scopeProp).assign(scope, "1");
					scope.$apply();
				}else{
					$this.removeClass();
					$this.addClass('close-one');
					$parse(scopeProp).assign(scope, "0");
					scope.$apply();
				}

		    });	
		}
	}
}]);

directives.directive('parseData', ["$parse", function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attr){
			var scopeProp = element.attr('ng-model'),
				val = element.val();

			$parse(scopeProp).assign(scope, val);
		}
	}
}]);

directives.directive('cityPicker', ["$parse", function($parse){
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        link: function(scope, element, attr) {
			var scopeProp = element.attr('ng-model');
			var val = element.val();
			$parse(scopeProp).assign(scope, val);

            element.citypicker({
                onClose: function(){
					var val = element.val();
					$parse(scopeProp).assign(scope, val);

                    scope[attr.callback] && scope[attr.callback]();
                }
            });
        }
    };
}]);

directives.directive('getCoordinate', function(){
	return {
        restrict: 'A',
        link: function(scope, element, attr) {
        	element.on('blur', function(){

        		var city = scope.card_setting_basic.businessDesc.city || '',
        			address = scope.card_setting_basic.businessDesc.address,
        			addr = '';

        		if(city.indexOf('/') > -1){
        			addr = city.replace(/\//g, '') + address;
        		}else{
        			addr = city + address;
        		}

				var map = new BMap.Map();
				// 创建地址解析器实例
				var myGeo = new BMap.Geocoder();
				// 将地址解析结果显示在地图上,并调整地图视野
				myGeo.getPoint(addr, function(point){
					if (point) {
						scope.card_setting_basic.businessDesc.longitude = point.lng;
						scope.card_setting_basic.businessDesc.latitude = point.lat;
						scope.$apply()
						// map.centerAndZoom(point, 16);
						// map.addOverlay(new BMap.Marker(point));
					}else{
						alert("您选择地址没有解析到结果!");
					}
				}, "北京市");
        	});
        }
    };
})

directives.directive('colorPicker', function(){
	return {
		restrict: 'EA',
		link: function(scope, element, attr){
			var _id = attr['invo'],
				oldcolor = attr['oldcolor'];

			element.ColorPicker({
			    color: '#0000ff',
			    onShow: function(colpkr) {
			        $(colpkr).fadeIn(500);
			        return false;
			    },
			    onHide: function(colpkr) {
			        $(colpkr).fadeOut(500);
			        element.css('backgroundColor', oldcolor);
			        $(_id).css('color', oldcolor);
			        return false;
			    },
			    onChange: function(hsb, hex, rgb) {
			        element.css('backgroundColor', '#' + hex);
			        $(_id).css('color', '#' + hex);
			    },
			    onSubmit: function(hsb, hex, rgb, ele, colpkr){
			    	oldcolor = '#' + hex;
			        $(colpkr).fadeOut(500);
			        return false;
			    }
			});

		}
	}
})


directives.directive('upload', ["$rootScope", function($rootScope){
	return {
		restrict: 'EA',
		link: function(scope, element, attr){
            var uploadimgFile = element.find("input[type='file']"),
            	$upBtn = element.find('.click-btn'),
            	$upWarp = $(attr['imgwarp']);

			$upBtn.on('click', function(){
				$(this).siblings('input[type="file"]').click();
			});
			uploadImgFn(uploadimgFile, 'http://ocean.cn/interface/uploadimg.php');

			function uploadImgFn(ele, ajaxurl){
				$(ele).uploadimg({
					url: ajaxurl,
					success: function(res, ele){
						var res = JSON.parse(res);
						var img = new Image();
						img.onload = function(){
							$upWarp.html(img);
						}
						img.src = res.data.imgpath;
					},
				});
			}
		}
	}
}])

directives.directive('levelSet', ["$rootScope", function($rootScope){
	return {
		restrict: 'EA',
		link: function(scope, element, attr){
			var num = 0;
			var $tbody = element.find('tbody');
			var $son = $tbody.find('tr');
			var $val = $son.find('input').last();
			var $handle = $tbody.find('.handle');
			var btn = '<div class="delete-btn">删除</div>';
			var line = '<tr><td><input type="text"></td><td><span class="num">' + num + '</span>（含）－ <input type="text" /></td><td class="handle"></td></tr>';

			$handle.last().html(btn);

			$('#addLev').click(function(){
				var sonLength = $son.size();
				num = $son.eq(sonLength - 1).find('input').last().val() || 0;
				line = '<tr><td><input type="text"></td><td><span class="num">' + num + '</span>（含）－ <input type="text" /></td><td class="handle"></td></tr>';

				var _prevNum = $son.eq(sonLength - 1).find('input').last().parent().find('.num').text();

				if(num != 0 && num <= _prevNum){
					oTools.alertmess('数值过小~');
					return;
				}

				$tbody.append(line);
				$handle.empty();
				$handle = $tbody.find('.handle');
				$handle.last().html(btn);

				$son = $tbody.find('tr');

				$son.last().find('input').last().on('blur', function(){
					var $_this = $(this),
						_val = $_this.val(),
						prevNum = $_this.parent().find('.num').text();


					if(_val <= prevNum){
						oTools.alertmess('数值过小~');
						return;
					}
				});

			});

			// $val.on('blur', function(){
			// 	console.log($(this).val());
			// })

			$tbody.on('click', '.handle', function(){
				var $_this = $(this);
				$_this.parent('tr').remove();
				$son = $tbody.find('tr');
				
				$handle = $tbody.find('.handle');
				$handle.last().html(btn);
			});
		}
	}
}]);

directives.directive('levSaveFn', function(){
	return {
		restrict: 'EA',
		link: function(scope, element, attr){
			var levelset = [];

			element.on('click', function(){
				var $tbody = $('.lev-set').find('tbody');

				$tbody.find('tr').each(function(k, v){
					var $_this = $(v);
					var obj = {};

					obj.name = $_this.find('input').first().val();
					obj.condition = $_this.find('input').last().val();

					levelset.push(obj);
				})

				scope.card_setting_level.levelset = levelset;

				scope.saveFn();

			})
		}
	}
})