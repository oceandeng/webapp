var shopCarServeModule = angular.module("ShopCarServeModule", []);

shopCarServeModule.factory('Items', function(){
	var items = {};
	items.query = function(){
		// 在真实的应用中，我们会从服务端拉取这块数据…
		return [
			{title: 'Paint pots', description: 'Pots full for paint', price: 3.95},
			{title: 'Polka dots', description: 'Dots with polka', price: 2.95},
			{title: 'Pebbles', description: 'Just little rocks', price: 6.95},
		]
	};
	return items;
});