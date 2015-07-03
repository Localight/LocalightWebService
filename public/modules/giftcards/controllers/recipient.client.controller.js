'use strict';

angular.module('giftcards').controller('RecipientController', ['$scope', '$stateParams',
	function($scope, $stateParams) {

		//Switch overlay off
      	document.getElementById('darkerOverlay').style.display = "none";

		//Initialize scope.giftcards
		$scope.giftcards = null;

		//Src to our merchant imgaes
		$scope.merchantImages =
		[
			"/modules/giftcards/img/dolys-delectables-crop.jpg",
			""
		]

		// Find a list of Giftcards
		$scope.find = function() {
			//$scope.giftcards = Giftcards.query();

			//FOr testing, hardcoding scope giftcards
			$scope.giftcards =
			[
				{
					_id: "1",
					to: "John",
					amt: "100",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'Tony',
					message: "hi",
					districtNumber: 'number',
					occasionMessage: "Variety is the spice of life. So I'm giving you the gift of choice!"
				},
				{
					_id: "2",
					to: "John",
					amt: "100",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'Frank',
					message: "hi",
					districtNumber: 'number',
					occasionMessage: "Congratulations on your baby!"
				}
			]
			var giftcard;
			for (giftcard in $scope.giftcards){
				if($scope.giftcards[giftcard]._id == $stateParams.giftcardId){
					$scope.giftcard = $scope.giftcards[giftcard];
					break;
				}
			}
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
