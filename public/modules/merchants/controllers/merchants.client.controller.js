'use strict';

// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Merchants',
	function($scope, $stateParams, $location, Authentication, Merchants) {
		$scope.authentication = Authentication;

		// Create new Merchant
		$scope.create = function() {
			// Create new Merchant object
			var merchant = new Merchants ({
				name: this.name
			});

			// Redirect after save
			merchant.$save(function(response) {
				$location.path('merchants/' + response._id);

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
	}
]);