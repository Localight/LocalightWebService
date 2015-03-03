'use strict';

// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Merchants',
	function($scope, $stateParams, $location, Authentication, Merchants) {
		$scope.authentication = Authentication;

		// Create new Merchant
		$scope.createCustomer = function() {
			// Create new Merchant object
			var merchant = new Merchants ({
				name: this.name,
				business_name:this.business_name,
				ein:this.ein,
				email:this.email,
				phoneNumber:this.phoneNumber,
				// businessAddress:{
				// 	line:this.line1,
				// 	line2:this.line2,
				// 	city:this.city,
				// 	state:this.state,
				// 	postal_code:this.postal_code
				// }
			});
			// Redirect after save
			merchant.$save(function(response) {
				$location.path('merchants/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.business_name ='';
				$scope.ein ='';
				$scope.email ='';
				$scope.phoneNumber ='';
				$scope.line1 ='';
				$scope.line2 ='';
				$scope.city ='';
				$scope.state ='';
				$scope.postal_code ='';
}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.createBankAccount = function() {
			// Create new Merchant object
			var merchant = new Merchants ({
				name: this.name,
				account_number:this.account_number,
				routing_number:this.account_number,
				account_type:this.account_type,
				// businessAddress:{
				// 	line:this.line1,
				// 	line2:this.line2,
				// 	city:this.city,
				// 	state:this.state,
				// 	postal_code:this.postal_code
				// }
			});
			// Redirect after save
			merchant.$save(function(response) {
				$location.path('merchants/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.account_number = '';
				$scope.routing_number = '';
				$scope.account_type = '';

}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Remove existing Merchanot
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
