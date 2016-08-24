var shopCarFilterModule = angular.module('ShopCarFilterModule', []);

shopCarFilterModule.filter('titleCase', function(){
	var titleCaseFilter = function(input){
		var words = input.split(' ');
		for(var i = 0, l = words.length; i < l; i++){
			word[i] = words[i].charAt[0].toUpperCase() + words[i].slice(1);
		}
		return words.join(' ');
	};
	return titleCaseFilter;
})