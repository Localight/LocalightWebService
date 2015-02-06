'use strict';
//var balanced = require('balanced-offical');
//balanced.configure('ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM');
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
	// or in balanced terms create a customer.
	var merchant = new Merchants({
		//get only the info we need for our model.
		contactInfo:{
			first_name:this.first_name,
			last_name:this.last_name,
			phone_number:this.phone_number,
			email_address:this.email_address,
			},
		businessInfo:{
			business_name:this.business_name,
			// address:{
			// 	city:this.city,
			//   line1:this.line1,
			// 	line2:this.line2,
			// 	state:this.state,
			// 	postal_code:this.postal_code,
			// 	country_code:this.country_code
			//	}
			}
		});
		console.log(merchant);
	var payload = {
		email: this.email,
			  // address:{
				// 	city: this.city,
				//  	country_code:this.country_code,
				//  	line1: this.line1,
				//  	line2: this.line2,
				//  	postal_code: this.postal_code,
				// 	state: this.state,
				// 	},
		name: this.firstName + ' ' +this.lastName,
		business_name: this.business_name,
		phone: this.phone,
	};//end customerInfo
	console.log(payload);
  balanced.marketplace.customers.create(payload, function(response){
		// Handle Errors (Anything that's not Success Code 201)
		if(response.status !== 201){// come back and change status to status_code
			alert(response.error.description);
			return;
		}else{
		//TODO: put an error code here or something.
		console.log('handleResponse failed');
	}//
	//var fundingInstrutment = response.cards !== null ? response.cards[0] : response.bank_accounts[0];
	merchant.href = response.href;
	// possible error right after this point,
	// could be if the post in the next method throws an error message.
	// then save the data to the backend with the response
	// could authorize at this point.
	// $scope.authentication.user = response;
	$http.post('/merchants', merchant).sucess(function(response){
			$location.path('/confirmation');
	}).error(function(response) {
		$scope.error = response.message;
	});// end http post
});
};//end merchant singup

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
