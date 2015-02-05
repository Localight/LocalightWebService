'use strict';
var balanced = require('balanced-offical');
balanced.configure('ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM');
// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location','$http', 'Merchants',
	function($scope, $stateParams, $location, $http, Merchants) {
		// think about authenticaiton with either authenticate or twilio. the page has to be protected.
		// and phone number is the username
		// Save from the form all the info you need and connect with the balanced api.
		// will at some point need to create login and pass word stuff.
		// if ($scope.authentication.user) $location.path('/');
		//
		$scope.signupMerchant = function() {
			// get info from view,
			// send info to token,
			// get info back from token,
			// save info to back end.
			// redirect to confirmation page.

			$http.post('/tokenize', $scope.credentials).sucess(function(response){
				// could authorize at this point.
				// $scope.authentication.user = response;
				$location.path('/confirmation');
			}).error(function(response) {
				$scope.error = response.message;
			});


			 // end of merchant creation
			// step one get info from labels.
			// step 2 before submitting stuff to the backend, call balanced and tokenize stuff.
			// step 3 send everything to backend.
			var path = ((document.URL).substr((document.URL).lastIndexOf('d/')).substr(2));
		  var cardId = path.substr(0, path.indexOf('#'));

			function handleResponse(response) {
				// if account is validated
				if (response.status_code === 201) {
					// get BP credit card href for buyer and store postObj
					var fundingInstrument = response.cards !== null ? response.cards[0] : response.bank_accounts[0];
					merchant.fundingInstrument = fundingInstrument;
					merchant.uniqueLink = cardId;
					// create Buyer and upon POST success create Recipient
					$http.post('/merchants', merchant.createMerchant);
					// now send a email to verify.
					//TODO:, come back and
					//	.success($http.post('/recipient', postObj));
				}else {
					console.log('handleResponse failed');
				}
			}
			// configure month and year to BP parameter standards
			// this has to do with parsing data.
			// if ($scope.formData.Expiry.length === 7) {
			// 	var year = '20' + $scope.formData.Expiry.substring(5,7);
			// }
			// else {
			// 	var year = $scope.formData.Expiry.substr(5,9);
		// j
			// var month = $scope.formData.Expiry.substr(0,2);

			//lets assume my data is correct.

			// data object BP needs to validate/create card
			var payload = {
				name: this.ownerFirstName + ' ' + this.ownerLastName,
				account_number:this.account_number,
				routing_number:this.routing_number,
				account_type: this.account_type
			};

			balanced.marketplace.bank_accounts.create(payload, handleRespone);
// compare screens open, try to use signup from user to signup merchant. think about removing passport for now, and strategies.
		// Redirect after save
		merchant.$save(function(response) {
			// when you save redirect to page that shows final information.
			$location.path('/confirmation');

			// Clear form fields
			$scope.name = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};
		// Remove existing Merchant
		$scope.remove = function(merchant) {
			if ( merchant ) {
				merchant.$remove();

				for (var i in $scope.merchants) {
					if ($scope.merchants [i] === merchant) {
						$scope.merchants.splice(i, 1);
					}
				}
			} else {
				$scope.merchant.$remove(function() {
					$location.path('merchants');
				});
			}
		};

		// Update existing Merchant
		$scope.update = function() {
			var merchant = $scope.merchant;

			merchant.$update(function() {
				$location.path('merchants/' + merchant._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Merchants
		$scope.find = function() {
			$scope.merchants = Merchants.query();
		};

		// Find existing Merchant
		$scope.findOne = function() {
			$scope.merchant = Merchants.get({
				merchantId: $stateParams.merchantId
			});
		};

		// save this for later
		// $scope.signin = function() {
		// 	$http.post('/auth/signin', $scope.credentials).success(function(response) {
		// 		// If successful we assign the response to the global user model
		// 		$scope.authentication.user = response;
		//
		// 		// And redirect to the index page
		// 		$location.path('/');
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };
	}
]);
