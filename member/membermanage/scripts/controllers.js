var controllers = angular.module('member.controllers', []);

controllers.controller('memberCtrl', ["$rootScope", "$scope", function($rootScope, $scope){
	$rootScope.title = "首页";
	var paramsType = $rootScope.params,
		pageDomain = $rootScope.iframeUrl;

    var page1={
        title:"",
        url:"/#/member/list",
        height: 1000
    };
	var page2={
        title:"",
        url:"/#/member/set",
        height: 1000
    };
    var page3={
        title:"",
        url:"/#/member/level-set",
        height: 1000
    };
    var page4={
        title:"",
        url:"/#/member/integral/set",
        height: 1000
    };


	initBusiness(paramsType.type, pageDomain);

    function initBusiness(type, pageDomain){
        $("#member" + type).addClass("active");
        var page = getType(type);

        $("#mainframe").attr({
            src:(pageDomain + page.url),
            height:page.height
        });
    }
    function getType(type){
        var page = {};
        switch(parseInt(type)){
            case 1:
                page = page1;
                break;
            case 2:
                page = page2;
                break;
            case 3:
                page = page3;
                break;
            case 4:
                page = page4;
                break;
        }
        return page;
    }

}]);


controllers.controller('memberListCtrl', ["$rootScope", "$scope", "$timeout", "services", function($rootScope, $scope, $timeout, services){
	$rootScope.title = '会员列表';
	
    $scope.searchVal = '';
    $scope.searchFn = function(){
        requestFn()
    }


    // 渲染页面
    requestFn();

    // 分页
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 800,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(currentPage, itemsPerPage){
            $scope.currentPage = currentPage;
            $scope.itemsPerPage = itemsPerPage;
console.log(currentPage);
console.log(itemsPerPage);
        }
    };

    $scope.$watch('currentPage', function(){
        requestFn();
    });

    function requestFn(){
        var params = {
            tenant_id: '10905127797663990018',
            page: $scope.currentPage,
            size: $scope.itemsPerPage
        }
        services.getCardList(params).then(function(res){
            $scope.listData = res.data.card_list;
        });
    }
}]);


controllers.controller('memberSetCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){
	$rootScope.title = '会员设置';
    $scope.data = {};
    $scope.card_setting_basic = {};
    $scope.card_setting_basic.basicInfo = {};
    $scope.card_setting_basic.businessDesc = {};
    $scope.card_setting_basic.cardDetails = {};

    $scope.card_setting_activation = {};

    $scope.titcolor = "#ff0000";
    $scope.numcolor = "#00ff00";
    $scope.levcolor = "#0000ff";

    $scope.save = function(){
        $scope.data.card_setting_basic = $scope.card_setting_basic;
        $scope.data.card_setting_activation = $scope.card_setting_activation;

        var params = $scope.data;
console.log(params);

        services.setSetting(params).then(function(res){
            console.log(res);
        });

    }

    function init(){
        services.getSetting({}).then(function(res){
            $scope.card_setting_basic = res.card_setting_basic;
            $scope.card_setting_activation = res.card_setting_activation;
            console.log(res);
        })
    }

}]);


controllers.controller('memberLevelSetCtrl', ["$rootScope", "$scope", "commonSvc", function($rootScope, $scope, commonSvc){
	$rootScope.title = '会员等级设置';
    $scope.data = {};
	$scope.card_setting_level = {};
    $scope.card_setting_level.levelrules = {}


    $scope.saveFn = function(){
        $scope.card_setting_level.levelrules.condition = $scope.condition ? 1 : 0;
        $scope.card_setting_level.levelrules.validity = $scope.validity ? 1 : 0;
        $scope.data.card_setting_level = $scope.card_setting_level;

        var params = $scope.data;
console.log(params);

        services.setSetting(params).then(function(res){
            console.log(res);
        });
    }

    function init(){
        services.getSetting({}).then(function(res){
            $scope.card_setting_basic = res.card_setting_basic;
            $scope.card_setting_activation = res.card_setting_activation;
            console.log(res);
        })
    }

}]);


controllers.controller('memberIntegralSetCtrl', ["$rootScope", "$scope", "commonSvc", function($rootScope, $scope, commonSvc){
	$rootScope.title = '会员积分设置';
	
    $scope.data = {};
    $scope.card_setting_score = {};

    $scope.saveFn = function(){
        $scope.card_setting_score.validity = $scope.validity ? 1 : 0;
        $scope.data.card_setting_score = $scope.card_setting_score;

        var params = $scope.data;
console.log(params);

        // services.setSetting(params).then(function(res){
        //     console.log(res);
        // });
    }

    function init(){
        services.getSetting({}).then(function(res){
            $scope.card_setting_basic = res.card_setting_basic;
            $scope.card_setting_activation = res.card_setting_activation;
            console.log(res);
        })
    }
}]);