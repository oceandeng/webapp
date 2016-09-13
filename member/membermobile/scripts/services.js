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

    return commonSvc;
}]);


app.service("services", ["$rootScope", '$q', '$http', "commonSvc", function($rootScope, $q, $http, commonSvc){

    var services = {};

    // 建卡 激活
    services.create = function(json){
        var url = $rootScope.apiUrl + '/MemberCard/create';
        return commonSvc.ajaxData(json, url);
    }

    // 接口描述：获取会员卡信息
    services.getCardInfo = function(json){
        var url = $rootScope.apiUrl + '/MemberCard/getCardInfo';
        return commonSvc.ajaxData(json, url);
    }
    
    // 接口描述：获取积分历史
    services.getScoreHistory = function(json){
        var url = $rootScope.apiUrl + '/ScoreHistory/getScoreHistory';
        return commonSvc.ajaxData(json, url);
    }

    // 发送短信验证码接口
    services.sendMessage = function(json){
        var url = $rootScope.apiUrl + '/SendSMS/sendMessage';
        return commonSvc.ajaxData(json, url);
    }

    




    return services;

}])