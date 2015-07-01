'use strict';

angular.module('giftcards').controller('TriconController', ['$scope',
	function($scope) {

		//Array of the eatery images and their paths
		$scope.images =
		[
			"/modules/giftcards/img/tricon/unpressed/tricon-coffee-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-cupcake-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-dinner-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-pie-slice-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-sandwich-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-shrimp-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-soup-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-sundae-wht.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-wine-wht.png"
		]

		//Array of the eatery unpressed images and their paths
		$scope.imagesPressed =
		[
			"/modules/giftcards/img/tricon/unpressed/tricon-coffee.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-cupcake.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-dinner.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-pie-slice.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-sandwich.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-shrimp.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-soup.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-sundae.png",
			"/modules/giftcards/img/tricon/unpressed/tricon-wine.png"
		]

		//Get the amount we are going to send the server
		$scope.getAmount = function()
		{
			//Replace this with a backend call eventually
			return (parseInt(1000) / 100).toFixed(2);
		}

		//Get the merchant we are going to send the server
		$scope.getMerchant = function()
		{
			//Replace this with a backend call eventually
			return "Doly's Delectables";
		}

		
	}
]);
