var directives = angular.module('member.directives', []);

directives.directive('allHeight', function(){
	return{
		restrict: 'EA',
		link: function($scope, iElm, iAttrs){
			var $iElm = $(iElm[0]);

			// $viewContentLoaded 检测页面渲染完成
			$scope.$watch('$viewContentLoaded', function() {  
				var sH = $(window).height();
				var dH = $iElm.height();
				
				if(dH < sH){
					$('body').css({
						height: sH
						// overflow: 'hidden'
					});
				};
			});  
		}
	}
})

directives.directive('touchHref', ['$state', function($state){
	return{
		restrict: 'A',
		link: function($scope, iElm, iAttrs){
			var href = iAttrs.touchHref,
				$e = $(iElm[0]);

			$e.on(oTools.clickEvent, function(){

				var params = iAttrs['params'];

				if(params){
					params = JSON.parse(params);
					$state.go(href, params);
				}else{
					$state.go(href, {});
				}

			})
		}
	}
}]);

directives.directive('hello', ["$rootScope", function($rootScope){
// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		restrict: 'EA',
		link: function($scope, iElm, iAttrs, controller) {
			console.log($(iElm[0]).html('aaaaa'));
		}
	};
}]);
directives.directive('imgAllH', function(){
	return {
		restrict: 'A',
		link: function($scope, iEle, iAttrs){
			var $iEle = $(iEle[0])

			var $bgImg = $iEle.find('.body-bg').find('img');

			$bgImg.on('load', function(){
				var imgwidth = $bgImg.width();
				var imgheight = $bgImg.height();

				var winwidth = $(window).width();
				var winheight = $(window).height();
				var widthratio = winwidth/imgwidth;
				var heightratio = winheight/imgheight;
				var widthdiff = heightratio*imgwidth;
				var heightdiff = widthratio*imgheight;

				if(heightdiff > winheight) {
					$bgImg.css({
						width: winwidth+'px',
						height: heightdiff+'px'
					});
				} else {
					$bgImg.css({
						width: widthdiff+'px',
						height: winheight+'px'
					});
				}
			})
		}
	}
});

directives.directive('activateFn', function(){
	return {
		restrict: 'A',
		link: function($scope, iEle, iAttrs){
			var $iEle = $(iEle[0]);

			$scope.$watch('$viewContentLoaded', function() {
				$iEle.on(oTools.clickEvent, function(){
					$scope.$apply(function(){
						var valiObj = {}
						// console.log($scope.applyinfo.$valid);
						// console.log($scope.applyinfo.username.$valid);

						// 姓名验证
						if($scope.applyinfo.username){
							valiObj.username = $scope.applyinfo.username.$error
							if(valiObj.username.required){
								oTools.alertmess('请填写姓名');
								return;
							}
						}
						// 姓别验证
						if($scope.applyinfo.sex){
							valiObj.sex = $scope.applyinfo.sex.$error
							if(valiObj.sex.required){
								oTools.alertmess('请填写姓别');
								return;
							}
						}
						// 生日验证
						if($scope.applyinfo.birthday){
							valiObj.birthday = $scope.applyinfo.birthday.$error
							if(valiObj.birthday.required){
								oTools.alertmess('请填写生日');
								return;
							}
						}
						// 邮箱验证
						if($scope.applyinfo.email){
							valiObj.email = $scope.applyinfo.email.$error
							if(valiObj.email.required){
								oTools.alertmess('请填写邮件');
								return;
							}else if(valiObj.email.email){
								oTools.alertmess('请填写正确的邮件')
								return;
							}
						}
						// 职业验证
						if($scope.applyinfo.jobs){
							valiObj.jobs = $scope.applyinfo.jobs.$error
							if(valiObj.jobs.required){
								oTools.alertmess('请填写职业');
								return;
							}
						}
						// 地址验证
						if($scope.applyinfo.address){
							valiObj.address = $scope.applyinfo.address.$error
							if(valiObj.address.required){
								oTools.alertmess('请填写地址');
								return;
							}
						}
						// 手机号验证
						if($scope.applyinfo.mobile){
							valiObj.mobile = $scope.applyinfo.mobile.$error
							if(valiObj.mobile.required){
								oTools.alertmess('请填写手机号');
								return;
							}else if(valiObj.mobile.pattern){
								oTools.alertmess('请填写正确手机号');
								return;
							}
						}

						$scope.createFn()
					});
				});
			})

		}
	}
});

directives.directive('progressBar', function(){
	return {
		restrict: 'A',
		link: function($scope, iEle, iAttrs){
			var $iEle = $(iEle[0]),
				$proBarBg = $iEle.find('.progress-bar-bg'),
				$proBar = $iEle.find('.progress-bar');

			$scope.$watch('nextLev', function(){
				var nextLev = $scope.nextLev,
					prevLev = $scope.prevLev,
					cardScore = $scope.cardScore;
				
				var ratio = (cardScore - prevLev) / (nextLev - prevLev);
				var totalW = $proBarBg.width();

				var nowW = parseInt(totalW * ratio)

				$proBar.animate({
					width: nowW
				}, 1000)

			})
		}
	}
});

// 获取验证码
directives.directive('getValiCode', function(){
	return {
		restrict: 'A',
		link: function($scope, iEle, iAttrs){
			var $iEle = $(iEle[0]);
			var second = 60;
			var end = 0;
			var timer = null;

			$iEle.on(oTools.clickEvent, function(){
				if(!$iEle.data('switch')){return false};
				$scope.$apply();

				var mobileNum = $scope.data.mobile;

				// 手机号验证
				if(isNull(mobileNum)){
					oTools.alertmess('请填写手机号!');
					return false;
				}
				if(!checkMobile(mobileNum)){
					oTools.alertmess('请填写正确的手机号！');
					return false;
				}

				// 验证码倒计时
				$iEle.data('switch', false).addClass('g999').html(second + 's');
				timer = setInterval(function(){
					second--;
					$iEle.html(second + 's');

					if(second == end){
						second = 60;
						$iEle.data('switch', true).removeClass('g999').html('验证');
						clearInterval(timer);
					}
				}, 1000);
				$scope.verificationCode(mobileNum);
			});

		}
	}
});

// 地图
directives.directive('map', ["$stateParams", function($stateParams){
	return {
		restrict: 'EA',
		template: '<div id="map"></div>',
		replace: true,
		transclude: true,
		link: function($scope, iElm, iAttrs){
			var sW = $(window).width(),
				sH = $(window).height();
			var $iElm = $(iElm[0]);

			var longitude = null,
				latitude = null;

			$iElm.css({
				width: sW,
				height: sH
			})

	        if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
				    longitude = position.coords.longitude;
				    latitude = position.coords.latitude;

					drawMap(longitude, latitude)
				});
			}

			function drawMap(longitude, latitude){
				
				// 百度地图API功能
				var map = new BMap.Map("map");    // 创建Map实例
				var point = new BMap.Point($scope.log, $scope.lat);
				map.centerAndZoom(point, 12);  // 初始化地图,设置中心点坐标和地图级别

				var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
				map.addControl(top_right_navigation);    

				var toPoint = new BMap.Point($scope.log, $scope.lat);
				// var marker = new BMap.Marker(toPoint);

				var nowPoint = new BMap.Point(longitude, latitude);
				// var nowMarker = new BMap.Marker(nowPoint);

				// map.addOverlay(marker);
				// map.addOverlay(nowMarker);

				var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
				driving.search(toPoint, nowPoint);

			}
		}
	}
}]);