'use strict';
//var balanced = require('balanced-official');
// balanced.configure('ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM');
// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$http','$stateParams', '$location', 'Merchants',
	function($scope, $http, $stateParams, $location, Merchants) {
		// think about authenticaiton with either authenticate or twilio. the page has to be protected.
		// and phone number is the username
		// Save from the form all the info you need and connect with the balanced api.
		// will at some point need to create login and pass word stuff.
		// if ($scope.authentication.user) $location.path('/');
		//
$scope.createCustomer = function() {

$http.post('/createCustomer', $scope.contactInfo).sucess(function(response){
	$location.path('/confirmation');
}).error(function(response){
	$scope.error = response.message;
});
};



 	//var fundingInstrutment = response.cards !== null ? response.cards[0] : response.bank_accounts[0];


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
