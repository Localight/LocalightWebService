'use strict';

// Giftcards controller
angular.module('giftcards').controller('GiftcardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Giftcards',
	function($scope, $stateParams, $location, Authentication, Giftcards) {
		$scope.authentication = Authentication;

		// Create new Giftcard
		$scope.create = function() {
			// Create new Giftcard object
			var giftcard = new Giftcards ({
				giftRecipientName:this.giftRecipientName,
				amount:this.amount,
				mobileNumberOfRecipient:this.mobileNumberOfRecipient,
				//ourName:'theUsersname here',
				message:'A gift for you!',
				//toUserUserName:'username',
			//	districtNumber: 'number',
			});
			// var payload = {
			// 	cardNumber:'16-digit number',
			// 	cvv:'3-digit number',
			// 	nameOnCard:'Your Full Name',
			// 	month:'month of expiration',
			// 	year:'year of expiration',
			// 	// check balanced for what they need.
			// 	// either way we need the credit card info for part of this.
			// };

			// Redirect after save
			giftcard.$save(function(response) {
				$location.path('giftcards/' + response._id);

				// Clear form fields
				$scope.amount = '';
				$scope.toUserUserName = '';
				$scope.districtNumber = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Giftcard
		$scope.remove = function(giftcard) {
			if ( giftcard ) {
				giftcard.$remove();

				for (var i in $scope.giftcards) {
					if ($scope.giftcards [i] === giftcard) {
						$scope.giftcards.splice(i, 1);
					}
				}
			} else {
				$scope.giftcard.$remove(function() {
					$location.path('giftcards');
				});
			}
		};

		// Update existing Giftcard
		$scope.send = function() {
			//1. before we can send the giftcard to the user we need the user's id.
			//2. save the giftcard to the that user's id.
			var giftcard = new Giftcards ({
				giftRecipientName:'my friends name',
				amount:1000,
				mobileNumberOfRecipient:1234567890,
				merchant:'aMerchantId here',
				toUserUserName:'username',
				message:'A gift for you!',
				districtNumber: 'number',
			});

			giftcard.$save(function() {
				$location.path('giftcards/');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Update existing Giftcard
		$scope.update = function() {
			var giftcard = $scope.giftcard;

			giftcard.$update(function() {
				$location.path('giftcards/' + giftcard._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find a list of Giftcards
		$scope.find = function() {
			$scope.giftcards = Giftcards.query();
		};

		// Find existing Giftcard
		$scope.findOne = function() {
			$scope.giftcard = Giftcards.get({
				giftcardId: $stateParams.giftcardId
			});
		};
	}
]);
