var controllers = angular.module('member.controllers', []);

controllers.controller('indexCtrl', ["$rootScope", "$scope", 'services', function($rootScope, $scope, services){
	$rootScope.title = '会员中心'

	$scope.store = 12000.00;
	$scope.integral = 5555;

	$scope.phoneNum = '13552590197'

	var params = {
		tenant_id: 10905127797663990018,
		member_id: 1
	}

	services.getCardInfo(params).then(function(res){
		console.log(res);
	});


}]);

controllers.controller('qrCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){
	$rootScope.title = '会员码';
	$scope.mLevel = '黄金会员';

	$scope.barSrc = 'images/test/bar-img.jpg';
	$scope.qrSrc = 'images/test/qr-img.jpg';


}]);


controllers.controller('infoCtrl', ["$rootScope", "$scope", function($rootScope, $scope){
	$rootScope.title = '会员卡说明';



}]);


controllers.controller('levelCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){
	$rootScope.title = '会员等级';

	$scope.topLevel = "黄金会员";
	$scope.nowScroe = 1900;
	$scope.prevLev = 1000;
	$scope.nextLev = 2000;





}]);


controllers.controller('integralCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){
	$rootScope.title = '会员积分';
	
	$scope.score = 1000;


	init();

	function init(){
		var parmas = {
			tenant_id: 10905127797663990018,
			member_id: 1,
			page: 1,
			size: 10
		}

		services.getScoreHistory(parmas).then(function(res){
			console.log(res);
		})
	}


}]);

controllers.controller('mapCtrl', ["$rootScope", "$scope", function($rootScope, $scope){
	$rootScope.title = '地图';
	
	

}]);

controllers.controller('applyCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){
	$rootScope.title = '申领会员卡';

	var params = {
		tenant_id: 10905127797663990018
	}

	services.create(params).then(function(res){
		console.log(res)
	});

	


}]);

controllers.controller('applyInfoCtrl', ["$rootScope", "$scope", "services", function($rootScope, $scope, services){
	$rootScope.title = '申领会员卡';

	$scope.name = true;
	$scope.mobile = true;
	$scope.sex = true;
	$scope.birthday = true;
	$scope.email = true;
	$scope.jobs = true;
	$scope.address = true;


 	var params = {
 		tenant_id: '',
 		phone: '',
 		nickname: '',
 		verification_code: ''
 	}

	services.create(params).then(function(res){
		console.log(res)
	});


	var messparams = {
		mobile: 13269917377
	}
	services.sendMessage(messparams).then(function(res){
		console.log(res);
	})



}]);