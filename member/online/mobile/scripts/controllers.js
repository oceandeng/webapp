var controllers = angular.module('member.controllers', []);

controllers.controller('indexCtrl', ["$rootScope", "$scope", "$cookies", 'services', function($rootScope, $scope, $cookies, services){

	$rootScope.title = '会员中心'
	$scope.memberId = $cookies.getObject('memberId');

	// 页面初始化
	init();

	function init(){
		var params = {
			tenant_id: $rootScope.tenant_id,
			member_id: $scope.memberId

		}

		services.getCardInfo(params).then(function(res){
			if(res.status == 101){
				var data = res.data.card_info;

				$scope.cardNum = data.card_num;		// 卡号
				$scope.userImg = data.user_img;		// 头像
				$scope.sex = data.sex;		// 性别
				$scope.phone = data.phone;		// 性别
				$scope.nickname = data.nickname;		// 昵称
				$scope.userLevel = data.user_level;		// 用户等级
				$scope.isActivated = data.is_activated;		// 是否激活
				$scope.isFocus = data.is_focus;		// 是否关注公共号
				$scope.expireDate = data.expire_date;		// 过期时间
				$scope.qrUrl = data.qr_url;		// 二维码地址
				$scope.barcodeUrl = data.barcode_url;		// 条形码地址
				$scope.cardScore = data.card_score;		// 积分
				$scope.cardRes = data.card_res;		// 余额
			}
		});


		var paramsTwo = {
            'tenant_id': $rootScope.tenant_id,
            'card_setting_basic': 'card_setting_basic'
        }

        services.getSetting(paramsTwo).then(function(res){
            var data = res.data.member_card_setting;

           	var city = data.card_setting_basic.businessDesc.city.replace(/\//g, '');
            $scope.address = city + data.card_setting_basic.businessDesc.address;

            $scope.basicInfo = data.card_setting_basic.basicInfo;
            $scope.latitude = data.card_setting_basic.businessDesc.latitude;
            $scope.longitude = data.card_setting_basic.businessDesc.longitude;

console.log($scope.basicInfo)

        });
		
	}


}]);

controllers.controller('qrCtrl', ["$rootScope", "$scope", "$cookies", "services", function($rootScope, $scope, $cookies, services){

	$rootScope.title = '会员中心'
	$scope.memberId = $cookies.getObject('memberId');

	// 页面初始化
	init();

	$rootScope.title = '会员码';
	$scope.mLevel = '黄金会员';

	// $scope.barSrc = 'images/test/bar-img.jpg';
	// $scope.qrSrc = 'images/test/qr-img.jpg';


	function init(){
		var params = {
			tenant_id: $rootScope.tenant_id,
			member_id: $scope.memberId
		}

		services.getCardInfo(params).then(function(res){
			if(res.status == 101){
				var data = res.data.card_info;

				$scope.userLevel = data.user_level;		// 用户等级
				$scope.qrUrl = data.qr_url;		// 二维码地址
				$scope.barcodeUrl = data.barcode_url;		// 条形码地址
			}
			console.log(res);
		});

	}

}]);


controllers.controller('infoCtrl', ["$rootScope", "$scope", "$cookies", function($rootScope, $scope, $cookies){
	$rootScope.title = '会员卡说明';
}]);


controllers.controller('levelCtrl', ["$rootScope", "$scope", "$cookies", "services", function($rootScope, $scope, $cookies, services){
	$rootScope.title = '会员等级';
	$scope.memberId = $cookies.getObject('memberId');

	// 页面初始化
	init();

	function init(){
		var params = {
			tenant_id: $rootScope.tenant_id,
			member_id: $scope.memberId
		}

		services.getCardInfo(params).then(function(res){
			if(res.status == 101){
				var data = res.data.card_info;

				$scope.userLevel = data.user_level;		// 用户等级
				$scope.cardScore = data.card_score;		// 积分
		
		        var paramsTwo = {
		            'tenant_id': $rootScope.tenant_id,
		            'card_setting_level': 'card_setting_level'
		        }

		        services.getSetting(paramsTwo).then(function(res){
		            var data = res.data.member_card_setting.card_setting_level;
		            $scope.cardSettingLevel = data.levelset;

		            if($scope.userLevel == 0){
		            	$scope.prevLevName = '初级';
						$scope.nextLevName = data.levelset[$scope.userLevel]['name'];
						var nextLev = data.levelset[$scope.userLevel]['condition'];

		            	$scope.prevLev = 0;
						$scope.nextLev = nextLev;
		            }else{
		            	$scope.prevLevName = data.levelset[$scope.userLevel - 1]['name'];
						$scope.nextLevName = data.levelset[$scope.userLevel]['name'];
						var prevLev = data.levelset[$scope.userLevel - 1]['condition'],
							nextLev = data.levelset[$scope.userLevel]['condition'];

		            	$scope.prevLev = prevLev;
						$scope.nextLev = nextLev;
		            }

		        });
			}
			console.log(res);
		});

		

	}

}]);


controllers.controller('integralCtrl', ["$rootScope", "$scope", "$cookies", "services", function($rootScope, $scope, $cookies, services){
	$rootScope.title = '会员积分';
	$scope.memberId = $cookies.getObject('memberId');

	// 页面初始化
	init();

	$scope.score = 1000;

	function init(){

		var params = {
			tenant_id: $rootScope.tenant_id,
			member_id: $scope.memberId
		}

		services.getCardInfo(params).then(function(res){
			if(res.status == 101){
				var data = res.data.card_info;

				$scope.cardScore = data.card_score;		// 积分
			}
		});

		var parmasTwo = {
			tenant_id: $rootScope.tenant_id,
			member_id: $scope.memberId,
			page: 1,
			size: 10
		}

		services.getScoreHistory(parmasTwo).then(function(res){
			if(res.status == 101){
				var data = res.data;
				console.log(res);

				$scope.history_list = data.history_list;

				$.each(data.history_list, function(k, v){
					console.log(v.score_amount)	
					if(v.score_amount > 0){
						v.isRed = true;						
					}else{
						v.isG999 = true;
					}
				})
			}
		})
	}
}]);

controllers.controller('mapCtrl', ["$rootScope", "$scope", "$stateParams", function($rootScope, $scope, $stateParams){
	$rootScope.title = '地图';
	
	$scope.log = $stateParams.longitude || '116.404';
	$scope.lat = $stateParams.latitude || '39.915';

}]);

controllers.controller('applyCtrl', ["$rootScope", "$scope", "$state", "$cookies", "services", function($rootScope, $scope, $state, $cookies, services){

	$rootScope.title = '申领会员卡';

	$scope.createFn = function(){
		var params = {
			tenant_id: $rootScope.tenant_id
		}

		services.create(params).then(function(res){
			if(res.status == 101){

				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 1);
				$cookies.putObject('memberId', '1', {'expires': expireDate});
				// $cookies.putObject('memberId', res.data.member_id, {'expires': expireDate});
				$state.go('applyInfo');
				// $state.go('applyInfo', {'member_id': res.data.member_id}); 
			}else{
				oTools.alertmess(res.msg)
			}
		});
	}

}]);

controllers.controller('applyInfoCtrl', ["$rootScope", "$scope", "$stateParams", "$cookies", "$state", "services", function($rootScope, $scope, $stateParams, $cookies, $state, services){
	$rootScope.title = '申领会员卡';
	$scope.memberId = $cookies.getObject('memberId');

	// 页面初始化
	init();

 	function init(){
 		// 获取后台配置
		var params = {
            'tenant_id': $rootScope.tenant_id,
            'card_setting_activation': 'card_setting_activation'
        }

        services.getSetting(params).then(function(res){
            $scope.seting = res.data.member_card_setting.card_setting_activation;

            $scope.name = {};
            $scope.sex = {};
            $scope.birthday = {};
            $scope.email = {};
            $scope.jobs = {};
            $scope.address = {};
            $scope.mobile = {};
            $scope.name.isuse = ($scope.seting.name.isuse == 0) ? false : true;
            $scope.name.ismust = ($scope.seting.name.ismust == 0) ? false : true;
            $scope.mobile.isuse = ($scope.seting.mobile.isuse == 0) ? false : true;
            $scope.mobile.ismust = ($scope.seting.mobile.ismust == 0) ? false : true;
            $scope.sex.isuse = ($scope.seting.sex.isuse == 0) ? false : true;
            $scope.sex.ismust = ($scope.seting.sex.ismust == 0) ? false : true;
            $scope.birthday.isuse = ($scope.seting.birthday.isuse == 0) ? false : true;
            $scope.birthday.ismust = ($scope.seting.birthday.ismust == 0) ? false : true;
            $scope.email.isuse = ($scope.seting.email.isuse == 0) ? false : true;
            $scope.email.ismust = ($scope.seting.email.ismust == 0) ? false : true;
            $scope.jobs.isuse = ($scope.seting.jobs.isuse == 0) ? false : true;
            $scope.jobs.ismust = ($scope.seting.jobs.ismust == 0) ? false : true;
            $scope.address.isuse = ($scope.seting.address.isuse == 0) ? false : true;
            $scope.address.ismust = ($scope.seting.address.ismust == 0) ? false : true;
        })
 	}

    // 建卡 激活
	$scope.createFn = function(){
		var params = $scope.data || {};

	 	params.tenant_id = $rootScope.tenant_id;
	 	params.member_id = $scope.memberId;

	 	var checkParams = {
	 		mobile: $scope.data.mobile,
	 		code: $scope.data.valiCode
	 	};

		// 短信验证码验证
	 	services.checkMessage(checkParams).then(function(res){
	 		if(res.status == 101){
		 		createInterface(params);
	 		}else{
	 			oTools.alertmess('验证码错误');
	 		}
	 	});

	 	function createInterface(params){
			services.create(params).then(function(res){
				if(res.status == 101){
					oTools.alertmess('激活成功');
					$state.go('index');
				}else{
					oTools.alertmess(res.msg);
				}
			});
	 	}
	}

	// 短信验证
	$scope.verificationCode = function(mobilenum){
		var messparams = {
			mobile: mobilenum
		}
		services.sendMessage(messparams).then(function(res){
			console.log(res);
		})
	}

}]);