'use strict';

// Giftcards controller
angular.module('giftcards').controller('GiftcardsController', ['$scope','$http', '$stateParams', '$location', 'Authentication', 'Giftcards',
	function($scope, $http, $stateParams, $location, Authentication, Giftcards) {
		$scope.authentication = Authentication;
		// Alright so this is what needs to happen.
		// We are given all the information we need to create a giftcard.
		// We have to charge the user before we create the giftcard.
		// collect needed informaiton from forms.
		// make separte form for credit card.
		// tokenize creditcard or debitcard, make sure you know which it is too.
		// assoicate credit card to user,
		// confirm card or what ever.
		// create order and charge card, send money to localism account,
		// create reicpiet and email user the reciept.
		// Create new Giftcard
		// In the async waterfall, first charge the card.
		// charge the card then create the giftcard.
		// make sure form is valid.

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
			var payload = {
				number:'341111111111111',
				cvv:'1234',
				name:'Test User',
				expiration_month:'04',
				expiration_year:'2020',
				// check balanced for what they need.
				// either way we need the credit card info for part of this.
			};
			// The payment sequence.
			// 1. Tokenize credit card, if we haven't already.
			$http.post('/balanced/tokenizeCard', payload).success(function(response){
				// if successsful we clear out the scope for the credit cards.
				payload.number = '';
				payload.cvv = '';
				payload.number = '';
				payload.expiration_month = '';
				payload.expiration_year = '';
				// create a variable in the scope to hold the token.
				$scope.payingCardToken = response;// got thetoken,
				// take amount, amount and charge card.
				$http.post('/balanced/chargeCard', $scope.payingCardToken).success(function(resposne){
					// assume it's been successfully charge,
					// Redirect after save
					giftcard.$save(function(response) {
						// Clear form fields
						$scope.amount = '';
						$scope.toUserUserName = '';
						$scope.districtNumber = '';
						$scope.mobileNumberOfRecipient = '';
						// reset all fields
						$scope.payingCardToken = '';
						$location.path('/');
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}).error(function(resposne){
					$scope.error = response.message;
				})

				$location.path('/');// At the end of the sequence redirect home, or to the splash screen.
				// if any error, show the user where the error is.
			}).error(function(response){
				$scope.error = response.message;
			});// for this run lets not assoicate it to a customer just make a charge.

			// step 1. Charge Card,
			// step 2. Create giftcard,

			// tokenize credit card.

			// otherwise.
			// create order and charge card
			// email customer recipet,
			// save giftcard.



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
