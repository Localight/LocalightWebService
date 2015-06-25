'use strict';

angular.module('giftcards').controller('ListGiftCardsController', ['$scope',
	function($scope) {

		//Initialize scope.giftcards
		$scope.giftcards = null;

		// Find a list of Giftcards
		$scope.find = function() {
			//$scope.giftcards = Giftcards.query();

			//FOr testing, hardcoding scope giftcards
			$scope.giftcards =
			[
				{
					to: "john",
					amt: "100",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'username',
					message: "hi",
					districtNumber: 'number'
				},
				{
					to: "john",
					amt: "100",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'username',
					message: "hi",
					districtNumber: 'number'
				}
			]
		}

		$scope.totalValue = function()
		{
			//Get the total value of all the giftcards
			var total = 0;
			for(var i = 0; i < $scope.giftcards.length; ++i)
			{
				total = total + parseInt($scope.giftcards[i].amt, 10);
			}

			//Return the total value as a formatted string
			return "$" + total;
		}
	}
]);
