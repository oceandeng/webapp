/*
Directive param demo
angular.module('myApp', []) .directive('myDirective', function() {
	var directiveDefinitionObject = {
		restrict: String,
		priority: Number,
		terminal: Boolean,
		template: String or Template Function:
		function(tElement, tAttrs) {...},
		templateUrl: String,
		replace: Boolean or String,
		scope: Boolean or Object,
		transclude: Boolean,
		controller: String or
		function(scope, element, attrs, transclude, otherInjectables) { ... },
		controllerAs: String,
		require: String,
		link: function(scope, iElement, iAttrs) { ... },
		compile: // 返回一个对象或连接函数，如下所示：
		function(tElement, tAttrs, transclude) {
			return {
				pre: function(scope, iElement, iAttrs, controller) { ... },
				post: function(scope, iElement, iAttrs, controller) { ... }
			}
			return function postLink(...) { ... }
		}
	};

	return directiveDefinitionObject;
});
*/

var bookStoreDirectives = angular.module('bookStoreDirectives', []);

// ng-repeat 渲染完成
bookStoreDirectives.directive('repeatFinish', function($timeout) {
	return {
        restrict: 'A',
        scope: false,
		link: function(scope, element, attr){
			// console.log(scope.$index);
			if(scope.$last == true){
				// console.log('ng-repeat执行完毕');
				$timeout(function(){
					scope.$emit('rFinish', element.parent());
				});
			}
		}
	}
});

// 滚动表格指令封装
bookStoreDirectives.directive('stable', function(){
	return {
		restrict: 'EA',
		templateUrl : 'dtpls/d_table_tpl.html',
		replace: true,
		link: function(scope, element, attr){
		    /****************** 表格ping插件调用 S **********************/
		    var allW = $('.part-one').outerWidth() + $('.part-two').outerWidth() + $('.part-thr').outerWidth() + $('.part-fou').outerWidth() + $('.part-fiv').outerWidth();
		    var dyanH = $(window).height() - $('.header').height() - $('.main-title').height() - 75;

		    scope.$on('rFinish', function(){
		    	element.pingTable({
			        width: allW,
			        height: 300
			    });
		    });
		    /****************** 表格ping插件调用 E **********************/
		}
	}
})

// $compile 服务应用demo
bookStoreDirectives.directive('compile', function($compile){
	return {
		restrict: 'EA',
		link: function(scope, element, attr){
			scope.$watch(function(scope){
				return scope.$eval(attr.compile);
			}, function(value){
				element.html(value);
				$compile(element.contents())(scope);
			});
		}
	}
});

// expander
bookStoreDirectives.directive('expander', function(){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: { title: '=expanderTitle'},
		template: '<div>' + 
					'<div class="title" ng-click="toggle()">{{title}}</div>' + 
					'<div class="body" ng-show="showMe" ng-transclude></div>' + 
					'<div>',
		link: function(scope, element, attr){
			scope.showMe = false;
			scope.toggle = function toggle(){
				scope.showMe = !scope.showMe;
			}
		}
	}
});

bookStoreDirectives.directive('clickable', function() {
	return {
	  restrict: "E",
	  scope: {
	    foo: '=',
	    bar: '='
	  },
	  template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
	  link: function(scope, element, attrs) {
	    element.bind('click', function() {
	    	scope.$apply(function(){
				scope.foo++;
				scope.bar++;
	    	})
	    });
	  }
	}
});