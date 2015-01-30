'use strict';

// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Merchants',
	function($scope, $stateParams, $location, Merchants) {
		//$scope.authentication = Authentication;
	// Create new Merchant
		$scope.create = function() {
			// Create new Merchant object
			var merchant = new Merchants ({
				basicOwnerInfo:{
					ownerFirstName: this.ownerFirstName,
					ownerLastName: this.ownerLastName,
					ownerPhoneNumber: this.ownerPhoneNumber,
					ownerEmailAddress: this.ownerEmailAddress
				},
				 businessInfo:{
				 	legalCompanyName: this.legalCompanyName,
				 	companyWebsite: this.companyWebsite
				 },
				 bankPayoutInfo:{
					accountNumber: this.accountNumber,
				 	routingNumber: this.routingNumber
				 }
			});

// compare screens open, try to use signup from user to signup merchant. think about removing passport for now, and strategies.
			// Redirect after save
			merchant.$save(function(response) {

				$location.path('/merchants');

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
