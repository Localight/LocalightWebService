'use strict';

// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Merchants',
	function($scope, $stateParams, $location, Authentication, Merchants) {
		$scope.authentication = Authentication;
		// make a new merchant and tokenize them into a customer.

		$scope.createCustomer = function() {
			// Create new Merchant object
			var merchant = new Merchants ({
				name: this.name,
				business_name: this.business_name,
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
			// Create new Merchant objectd
			var merchant = $scope.merchant;
			// TODO: need to pass the account number
			// and routing number to the backend controller.
			// need to look closer at how informaiton is being passed.
			// currently getting a 404 error when tryign to submit.
			merchant.accountNumber = this.accountNumber;
			merchant.routingNumber = this.routingNumber;

			// var merchant = new Merchants ({
			// 	name: this.name,
			// 	accountNumber:this.accountNumber,
			// 	routingNumber:this.routingNumber,
			// 	//account_type:'checking',
			// 	// businessAddress:{
			// 	// 	line:this.line1,
			// 	// 	line2:this.line2,
			// 	// 	city:this.city,
			// 	// 	state:this.state,
			// 	// 	postal_code:this.postal_code
			// 	// }
			// });
			// Redirect after save
			merchant.$save(function(response) {
				$location.path('merchants/' + response._id);

				// Clear form fields
				$scope.accountNumber = '';
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
