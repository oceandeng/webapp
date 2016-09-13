/************公共模块服务*************/
app.service("commonSvc", ['$rootScope', '$q', '$http', function($rootScope, $q, $http) {
    //服务对象
    var commonSvc = {};

    /*****通用ajax******/

    commonSvc.ajaxData = function(data, url) {
        var deferred = $q.defer();
        $.ajax({
            type: $rootScope.aType,
            url: url,
            data: data,
            dataType: $rootScope.dType,
            success: function(result) {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    commonSvc.ajaxPostData = function(data, url) {
        var deferred = $q.defer();
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            success: function(result) {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    return commonSvc;
}]);

app.service("services", ["$rootScope", "commonSvc", function($rootScope, commonSvc){
    var services = {};

    // 接口描述：获取会员卡列表
    services.getCardList = function(json){
        var url = $rootScope.apiUrl + '/MemberCard/getCardList';
        return commonSvc.ajaxData(json, url);
    }

    // 接口描述：获取设置
    services.getSetting = function(json){
        var url = $rootScope.apiUrl + '/MemberCardSetting/getSetting';
        return commonSvc.ajaxData(json, url);
    }

    // 接口描述：会员卡设置
    services.setSetting = function(json){
        var url = $rootScope.apiUrl + '/MemberCardSetting/setSetting';
        return commonSvc.ajaxData(json, url);
    }    

    // 接口描述：获取设置
    // 接口地址：http://www.domain.com/MemberCardSetting/getSetting
    services.getSetting = function(json){
        // var url = $rootScope.apiUrl + '/MemberCardSetting/getSetting';
        var url = 'http://ocean.cn/interface/test.php';
        return commonSvc.ajaxPostData(json, url);
    }  






    services.create = function(json){
        var url = $rootScope.apiUrl + '/MemberCard/create';
        return commonSvc.ajaxData(json, url);
    }




    return services;
}])

