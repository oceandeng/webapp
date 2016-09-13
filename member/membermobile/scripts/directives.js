var directives = angular.module('member.directives', []);

directives.directive('allHeight', function(){
	return{
		restrict: 'EA',
		link: function($scope, iElm, iAttrs){
			var sW = 0, sH = 0, dW = 0, dH = 0;

			$(document).ready(function(){
				sW = $(window).width(),
				sH = $(window).height(),
				dW = document.body.clientWidth,
				dH = document.body.clientHeight;

				if(dH < sH){
					$('body').css({
						height: sH,
						overflow: 'hidden'
					});
				};
			})
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
				console.log(href);
				$state.go(href, {});
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

			$iEle.on(oTools.clickEvent, function(){
				console.log('a');
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

			var nextLev = $scope.nextLev,
				prevLev = $scope.prevLev,
				nowScroe = $scope.nowScroe;

			var ratio = (nowScroe - prevLev) / (nextLev - prevLev);
			var totalW = $proBarBg.width();

			var nowW = parseInt(totalW * ratio)

			$proBar.animate({
				width: nowW
			}, 1000)


			console.log(ratio)				
			console.log(totalW)				

			console.log(nowW)


		}
	}
});