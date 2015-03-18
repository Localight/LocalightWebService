'use strict';

// Giftcards controller
angular.module('giftcards').controller('GiftcardsController', ['$scope','$http', '$stateParams', '$location', 'Authentication', 'Giftcards', '$q',
	function($scope, $http, $stateParams, $location, Authentication, Giftcards, $q) {
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
			// now to create the water fall.
			// first gather credit card info, we want to get rid of senstive data as soon as possible.
			// 1. Tokenize credit card info
			// 2. store token in scope for now.
			// 3. charge card, get user customer token, and send that back.
			// 4. find the user if the user doesn't exist create them.
			// 5. get the new user id.
			// 6. create the giftcard.
			// 7. send recipent email, and text new user.
			$http.post('/tokenizeCard', $scope.ccStuff).then(function handler(response){// grab the token
				var holder = response;
				return $http.post('/chargeCard', holder);// could add a step to create an order if we wanted too. charge the card and create an order
			}).then(function anotherHandler(response){
				// give the giftcard the order number or debit token
				var giftcard = new Giftcards ({
					giftRecipientName:this.giftRecipientName,
					amount:this.amount,
					mobileNumberOfRecipient:this.mobileNumberOfRecipient,
					//ourName:'theUsersname here',
					message:'A gift for you!',
					purchaseOrder:response
					//toUserUserName:'username',
					//	districtNumber: 'number',
				});
				return giftcard.$save();
			}).then(function yetAnotherHandler(response) {
				// not sure what you get back at this point.
					// Clear form fields
					$scope.amount = '';
					$scope.toUserUserName = '';
					$scope.districtNumber = '';
					$scope.mobileNumberOfRecipient = '';
					// reset all fields
					$scope.payingCardToken = '';
					$location.path('/');
				}).catch(function(errorResponse){
					$scope.error = errorResponse.data.message;
				});


			// 1. Create Order
			// 2. Tokenize Card
			// 3. Charge Card
			// 4. Save Gitcard
			// Create new Giftcard object

			// I could just make a credit card model.
			// var payload = {
			// 	expiration_month:'12',
			// 	expiration_year:'2020',
			// 	number:'341111111111111',
			// 	cvv:'1234',
			// 	name:'Test User'
			// 	// check balanced for what they need.
			// 	// either way we need the credit card info for part of this.
			// };
			// The payment sequence.
			// 1. Tokenize credit card, if we haven't already

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
