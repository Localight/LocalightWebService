'use strict';
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Merchants',
	function($scope, $stateParams, $location, Merchants) {
		// need to make this only avaible to signup or merchant change page.
$scope.signupMerchant = function() {
	var merchant = new Merchants({
		contactInfo:{
			first_name:this.first_name,
			last_name:this.last_name,
			phone_number:this.phone_number,
			email_address:this.email_address,
			},
		businessInfo:{
			business_name:this.business_name,
			address:{
				city:this.city,
			  line1:this.line1,
				line2:this.line2,
				state:this.state,
				postal_code:this.postal_code,
				}
			}
		});
		merchant.$save(function(response) {
			$location.path('/confirmation');
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
				});}
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
