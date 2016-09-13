var controllers = angular.module('member.controllers', []);

controllers.controller('memberListCtrl', ["$rootScope", "$scope", "$timeout", "services", function($rootScope, $scope, $timeout, services){

    // 初始化页面
    init();

	$rootScope.title = '会员列表';
	
    $scope.searchVal = '';
    $scope.searchFn = function(){
        var searchKey = $scope.searchVal;
        init(searchKey);
    }

    // 分页
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 1,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(currentPage, itemsPerPage){
            $scope.currentPage = currentPage;
            $scope.itemsPerPage = itemsPerPage;
            init();
        }
    };

    function init(searchKey){
        var params = {
            tenant_id: $rootScope.tenant_id,
            search: searchKey || '',
            page: 1,
            size: 10
        }
    
        services.getCardList(params).then(function(res){
            $scope.listData = res.data.card_list;
            $scope.paginationConf.totalItems = res.data.totalPage;
        });
    }

}]);

controllers.controller('memberSetCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){

    // 初始化页面
    init();

	$rootScope.title = '会员设置';
    $scope.data = {};
    $scope.card_setting_basic = {};
    $scope.card_setting_basic.basicInfo = {};
    $scope.card_setting_basic.businessDesc = {};
    $scope.card_setting_basic.cardDetails = {};

    $scope.card_setting_activation = {};

    $scope.save = function(){
        $scope.data.card_setting_basic = $scope.card_setting_basic;
        $scope.data.card_setting_activation = $scope.card_setting_activation;

        var params = $scope.data;
        params.tenant_id = $rootScope.tenant_id;

        services.setSetting(params).then(function(res){
            if(res.status == '101'){
                oTools.alertmess('保存成功！');
            }else{
                oTools.alertmess(res.msg)
            }
        });
    }

    function init(){
        // $scope.card_setting_basic.basicInfo.titcolor = "#ffffff";
        // $scope.card_setting_basic.basicInfo.levcolor = "#ffc975";
        // $scope.card_setting_basic.basicInfo.numcolor = "#58565d";

        var params = {
            'tenant_id': $rootScope.tenant_id
        }

        services.getSetting(params).then(function(res){
            var data = res.data.member_card_setting;

            $scope.card_setting_basic = data.card_setting_basic;
            $scope.card_setting_activation = data.card_setting_activation;

            // $scope.notes = data.card_setting_basic.cardDetails.notes;
            // $scope.privilege = data.card_setting_basic.cardDetails.privilege;
        })
    }
}]);

controllers.controller('memberLevelSetCtrl', ["$rootScope", "$scope", "commonSvc", "services", function($rootScope, $scope, commonSvc, services){

    // 初始化页面
    init();

	$rootScope.title = '会员等级设置';
    $scope.data = {};
	$scope.card_setting_level = {};
    $scope.card_setting_level.levelrules = {}

    $scope.saveFn = function(){
        $scope.card_setting_level.levelrules.condition = $scope.condition ? 1 : 0;
        $scope.card_setting_level.levelrules.validity = $scope.validity ? 1 : 0;
        $scope.data.card_setting_level = $scope.card_setting_level;

        var params = $scope.data;
        params.tenant_id = $rootScope.tenant_id;

        services.setSetting(params).then(function(res){
            console.log(res);
            if(res.status == '101'){
                oTools.alertmess('保存成功！');
            }else{
                oTools.alertmess(res.msg)
            }
        });
    }

    function init(){
        var params = {
            'tenant_id': $rootScope.tenant_id
        }

        services.getSetting(params).then(function(res){
            var data = res.data.member_card_setting.card_setting_level;

            $scope.levelset = data.levelset;
            $scope.condition = data.levelrules.condition == 1 ? true : false;
            $scope.validity = data.levelrules.validity == 1 ? true : false;
            console.log(data);
        })
    }

}]);


controllers.controller('memberIntegralSetCtrl', ["$rootScope", "$scope", "commonSvc", "services", function($rootScope, $scope, commonSvc, services){

    // 初始化页面
    init();

	$rootScope.title = '会员积分设置';
	
    $scope.data = {};
    $scope.card_setting_score = {};

    $scope.saveFn = function(){
        $scope.card_setting_score.validity = $scope.validity ? 1 : 0;
        $scope.data.card_setting_score = $scope.card_setting_score;

        var params = $scope.data;
        params.tenant_id = $rootScope.tenant_id;
console.log(params);

        services.setSetting(params).then(function(res){
            console.log(res);
        });
    }

    function init(){
        var params = {
            'tenant_id': $rootScope.tenant_id
        }

        services.getSetting(params).then(function(res){
            var data = res.data.member_card_setting.card_setting_score;

            $scope.card_setting_score = data;
            $scope.validity = data.validity == 1 ? true : false;
            console.log(data);
        })
    }
}]);


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