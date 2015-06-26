'use strict';

angular.module('giftcards').controller('SelectMerchantController', ['$scope', '$window',
	function($scope, $window) {
		$scope.merchants = [{
			area: "4th Street Retro Row",
			name: "Goldies On 4th",
			address: "2106 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Aji Peruvian Cuisine",
			address: "2308 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "P3 Artisan Pizza",
			address: "2306 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "The Social List",
			address: "2105 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Lola's",
			address: "2030 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Portfolio's Coffee",
			address: "2300 E 4th St, Long Beach, CA"
		}]
	}
]);
