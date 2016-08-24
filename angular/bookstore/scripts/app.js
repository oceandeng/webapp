var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'BookListModule', 'BookDetailModule', 'ShopCarModule', 'ShopCarFilterModule']);

/*
由于整个应用都会和路由打交道，所以在这里把$state和$stateParams这两个对象放到$rootScope上，方便其他地方引用和注入。
* 这里的run方法只会在angular启动的时候运行一次
* @params {[type]} $rootScope
* @params {[type]} $state
* @params {[type]} $stateParams
* @return {[type]}
*/
routerApp.run(function($rootScope, $state, $stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

/*
* 配置路由
* 注意这里采用的是ui-router这个路由，而不是ng原生的路由
* ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router
* @params {[type]} $stateProvider
* @params {[type]} $urlRouterProvider
* @return {[type]}
*/
routerApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/index');
	$stateProvider.state('index', {
		url: '/index',
		views: {
			'': {
				templateUrl: 'tpls/home.html'
			},
			'nav@index': {
				templateUrl: 'tpls/nav.html'
			},
			'main@index': {
				templateUrl: 'tpls/login_form.html'
			}
		}
	}).state('booklist', {
		url: '/{bookType:[0-9]{1,4}}',
		views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
			'': {
				templateUrl: 'tpls/book_list.html'
			},
			'booktype@booklist': {
				templateUrl: 'tpls/book_type.html'
			},
			'bookgrid@booklist': {
				templateUrl: 'tpls/book_grid.html'
			}
		}
	}).state('addbook', {
		url: '/addbook',
		templateUrl: 'tpls/add_book_form.html'
	}).state('bookdetail', {
		url: '/bookdetail/:bookId', //注意这里在路由中传递参数的方式
		templateUrl: 'tpls/book_detail.html'
	}).state('shopcar', {
		url: '/shopcar',
		templateUrl: 'tpls/shopcar.html'
	})
})