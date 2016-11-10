var filters = angular.module('member.filters', []);

filters.filter("scoreAmount", function(){
	return function(m){
		if(m > 0){
			return '+' + m;
		}else{
			return '-' + m;
		}
	}
})