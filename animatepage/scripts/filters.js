var bookStoreFilters = angular.module('bookStoreFilters', []);

bookStoreFilters.filter('titleCase', function() {
	var titleCaseFilter = function(input){
		var words = input.split(' ');
		for(var i = 0, len = words.length; i < len; i++){
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
		}
		return words.join(' ');
	}
	return titleCaseFilter;
});
bookStoreFilters.filter('toFixedTwo', function(){
	return function(input, param){
		if(param != undefined){
			return param + input;
		}else{
			return input;
		}
	}
})