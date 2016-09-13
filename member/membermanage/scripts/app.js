var app = angular.module("app", ["ui.router", "pagination", "member.controllers", "member.directives", "member.filters"]);


app.run(["$rootScope", function($rootScope){

	$rootScope.apiUrl = gConfig.api;  //接口地址
	$rootScope.iframeUrl = gConfig.iframeUrl;
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
					templateUrl: 'tpls/list.html',
					controller: 'memberListCtrl'
				}
			}
		})
		.state('member', {
			url: '/member?type',
			views: {
				'': {
					templateUrl: 'tpls/body.html',
				},
				'left@member': {
					templateUrl: 'tpls/left-menu.html'
				},
				'main@member': {
					templateUrl: 'tpls/member.html',
					controller: 'memberCtrl'
				}
			}
		})
		.state('memberlist', {
			url: '/member/list',
			views: {
				'': {
					templateUrl: 'tpls/list.html',
					controller: 'memberListCtrl'
				}
			}
		})
		.state('memberSet', {
			url: '/member/set',
			views: {
				'': {
					templateUrl: 'tpls/set.html',
					controller: 'memberSetCtrl'
				}
			}
		})
		.state('memberLevelSet', {
			url: '/member/level-set',
			views: {
				'': {
					templateUrl: 'tpls/level-set.html',
					controller: 'memberLevelSetCtrl'
				}
			}
		})
		.state('memberIntegralSet', {
			url: '/member/integral/set',
			views: {
				'': {
					templateUrl: 'tpls/integral-set.html',
					controller: 'memberIntegralSetCtrl'
				}
			}
		})






}])