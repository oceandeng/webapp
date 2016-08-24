var bookStoreApp = angular.module('bookStoreApp', ['ui.router', 'ngAnimate', 'ng-pagination', 'bookStoreCtrls', 'bookStoreFilters', 'bookStoreServices', 'bookStoreDirectives']);

bookStoreApp.run(function($rootScope){
    $rootScope.toptitle = 'bookStoreApp';
});

// var str = "$urlRouterProvider.otherwise('/hello');$stateProvider.state('hello', {url: '/hello',views: {'': {templateUrl: 'tpls/hello.html',controller: 'HelloCtrl'}}}).state('list', {url: '/list',views: {'': {templateUrl: 'tpls/bookList.html',controller: 'BookListCtrl'}}}).state('select', {url: '/select',views: {'': {templateUrl: 'tpls/select.html',controller: 'SelectCtrl'}}}).state('table', {url: '/table',views: {'': {templateUrl: 'tpls/table.html',controller: 'TableCtrl'}}}).state('ui', {url: '/ui',views: {'': {templateUrl: 'tpls/ui.html',controller: 'UI'}}}).state('editor', {url: '/editor',views: {'': {templateUrl: 'tpls/editor.html',controller: 'EditorCtrl'}}})"

// bookStoreApp.config(function($stateProvider, $urlRouterProvider){
//     eval(str)
// });

bookStoreApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/hello');
    $stateProvider.state('hello', {
        url: '/hello',
        views: {
            '': {
                templateUrl: 'tpls/hello.html',
                controller: 'HelloCtrl'
            }
        }
    }).state('list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'tpls/bookList.html',
                controller: 'BookListCtrl'
            }
        }
    }).state('select', {
        url: '/select',
        views: {
            '': {
                templateUrl: 'tpls/select.html',
                controller: 'SelectCtrl'
            }
        }
    }).state('table', {
        url: '/table',
        views: {
            '': {
                templateUrl: 'tpls/table.html',
                controller: 'TableCtrl'
            }
        }
    }).state('ui', {
        url: '/ui',
        views: {
            '': {
                templateUrl: 'tpls/ui.html',
                controller: 'UI'
            }
        }
    }).state('editor', {
        url: '/editor',
        views: {
            '': {
                templateUrl: 'tpls/editor.html',
                controller: 'EditorCtrl'
            }
        }
    })
});