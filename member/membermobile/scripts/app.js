var app = angular.module("app", ["ui.router", "member.controllers", "member.directives", "member.filters"]);


app.run(["$rootScope", function($rootScope){

	$rootScope.apiUrl = gConfig.api;  //接口地址
	$rootScope.aType = gConfig.aType;
	$rootScope.dType = gConfig.dType;
	$rootScope.$apply();

	// 路由却换成功
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.params = toParams;
    });


}]);

// 配置路由。
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider){

	$urlRouterProvider.otherwise('/index');

	$stateProvider
		.state('index', {
			url: '/index',
			views: {
				'': {
					templateUrl: 'tpls/index.html',
					controller: 'indexCtrl'
				}
			}
		})
		.state('QR', {
			url: '/qr',
			views: {
				'': {
					templateUrl: 'tpls/qr.html',
					controller: 'qrCtrl'
				}
			}
		})
		.state('info', {
			url: '/info',
			views: {
				'': {
					templateUrl: 'tpls/info.html',
					controller: 'infoCtrl'
				}
			}
		})
		.state('level', {
			url: '/level',
			views: {
				'': {
					templateUrl: 'tpls/level.html',
					controller: 'levelCtrl'
				}
			}
		})
		.state('integral', {
			url: '/integral',
			views: {
				'': {
					templateUrl: 'tpls/integral.html',
					controller: 'integralCtrl'
				}
			}
		})
		.state('apply', {
			url: '/apply',
			views: {
				'': {
					templateUrl: 'tpls/apply.html',
					controller: 'applyCtrl'
				}
			}
		})
		.state('applyInfo', {
			url: '/apply/info',
			views: {
				'': {
					templateUrl: 'tpls/apply-info.html',
					controller: 'applyInfoCtrl'
				}
			}
		})




}])