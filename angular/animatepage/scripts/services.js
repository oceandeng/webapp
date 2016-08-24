var bookStoreServices = angular.module('bookStoreServices', []);

/*
*	@param {string} url 访问接口链接
*	@param {object} data 向服务端传递数据参数
*/
bookStoreServices.factory('HttpServe', ['$http', '$q', function($http, $q){
	return {
		query: function(url){
			var deferred = $q.defer();
			$http.get(url).success(function(data, status, headers, config){
				// 加载成功后做一些事
				deferred.resolve(data);
			}).error(function(data, status, headers, config){
				// 处理错误
				deferred.reject(data);
			});
			return deferred.promise;
		},
		post: function(url, objData){
			var deferred = $q.defer();
			$http.post(url, objData, {'Content-Type':'application/x-www-form-urlencoded'}).success(function(data, status, headers, config){
				deferred.resolve(data);
			}).error(function(data, status, headers, config){
				deferred.reject(data);
			});
			return deferred.promise;
		}
	}
}]);

bookStoreServices.factory('AjaxServe', ['$q', function($q){
	return {
		query: function(obj){
			var deferred = $q.defer();
			$.ajax({
				url: obj.url,
				type: obj.type || 'GET',
				data: obj.data || {},
				dataType: obj.dataType || 'json',
				beforeSend: function(){

				},
				success: function(data){
					deferred.resolve(data);
				},
				error: function(err){
					deferred.reject(err);
					console.log('网络错误~');
				}
			})
			return deferred.promise;
		}
	}
}]);