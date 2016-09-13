var filters = angular.module('member.filters', []);

filters.filter("hello", function(){
	return function(m){
		return m + 'world';
	}
})