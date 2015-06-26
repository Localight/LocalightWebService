'use strict';

angular.module('giftcards').controller('SelectMerchantController', ['$scope',
	function($scope) {
		$scope.merchants = [{
			name: "Goldies On 4th",
			address: "2106 E 4th St, Long Beach, CA"
		},{
			name: "Aji Peruvian Cuisine",
			address: "2308 E 4th St, Long Beach, CA"
		},{
			name: "P3 Artisan Pizza",
			address: "2306 E 4th St, Long Beach, CA"
		},{
			name: "The Social List",
			address: "2105 E 4th St, Long Beach, CA"
		},{
			name: "Lola's",
			address: "2030 E 4th St, Long Beach, CA"
		},{
			name: "Portfolio's Coffee",
			address: "2300 E 4th St, Long Beach, CA"
		}]
	}
]);
