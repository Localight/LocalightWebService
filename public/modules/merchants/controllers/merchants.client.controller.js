'use strict';
<<<<<<< HEAD
// balanced.configure('ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM');
// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Merchants',
	function($scope, $stateParams, $location, Merchants) {
<<<<<<< HEAD
		// need to make this only avaible to signup or merchant change page.
		$scope.tokenizeAccountInfo = function(){
			var payload = {
				name: this.ownerFirstName + ' ' + this.ownerLastName,
				account_number:this.ba_number,
				routing_number:this.ba_routing
			};
		};

		//$scope.authentication = Authentication;
		// Create new Merchant
		$scope.create = function() {
			// Create new Merchant object
			// see if you can get the balaneced payments stuff to go off first.
			// send the card information away.
			var merchant = new Merchants ({
				basicOwnerInfo:{
					ownerFirstName: this.ownerFirstName,
					ownerLastName: this.ownerLastName,
					ownerPhoneNumber: this.ownerPhoneNumber,
					ownerEmailAddress: this.ownerEmailAddress
				},
				 businessInfo:{
					storeFrontName: this.storeFrontName,
				 	legalCompanyName: this.legalCompanyName,
				 	companyWebsite: this.companyWebsite
				 },
			});

// compare screens open, try to use signup from user to signup merchant. think about removing passport for now, and strategies.
			// Redirect after save
			merchant.$save(function(response) {
				// when you save redirect to page that shows final information.
				$location.path('/billingInfo');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
=======
=======
//var balanced = require('balanced-official');
 //balanced.configure('ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM');
// Merchants controller
angular.module('merchants').controller('MerchantsController', ['$scope', '$http', '$stateParams', '$location', 'Merchants',
	function($scope, $http, $stateParams, $location, Merchants) {
>>>>>>> balanceBackEnd
		// think about authenticaiton with either authenticate or twilio. the page has to be protected.
		// and phone number is the username
		// Save from the form all the info you need and connect with the balanced api.
		// will at some point need to create login and pass word stuff.
		// if ($scope.authentication.user) $location.path('/');
		//
		// change to customer later
		// singup - new customer
$scope.createMerchant = function() {
	var merchant = new Merchants({
		contactInfo:{
<<<<<<< HEAD
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
		merchant.$save(function(response) {
			$location.path('/confirmation');
		}, function(errorResponse) {
>>>>>>> blanceInFrontEnd
				$scope.error = errorResponse.data.message;
		});
	//	console.log(merchant);
	// var payload = {
	// 	email: this.email,
	// 		  // address:{
	// 			// 	city: this.city,
	// 			//  	country_code:this.country_code,
	// 			//  	line1: this.line1,
	// 			//  	line2: this.line2,
	// 			//  	postal_code: this.postal_code,
	// 			// 	state: this.state,
	// 			// 	},
	// 	name: this.firstName + ' ' +this.lastName,
	// 	business_name: this.business_name,
	// 	phone: this.phone,
	// };//end customerInfo

//   balanced.marketplace.customers.create(payload, function(response){
// 		// Handle Errors (Anything that's not Success Code 201)
// 		if(response.status !== 201){// come back and change status to status_code
// 			alert(response.error.description);
// 			return;
// 		}else{
// 		//TODO: put an error code here or something.
// 		console.log('handleResponse failed');
// 	}
// 	merchant.href = response.href;
// 	//var fundingInstrutment = response.cards !== null ? response.cards[0] : response.bank_accounts[0];
// });
	// possible error right after this point,
	// could be if the post in the next method throws an error message.
	// then save the data to the backend with the response
	// could authorize at this pint.
	// $scope.authentication.user = response;

};
=======
		first_name: this.first_name,
		last_name: this.last_name,
		phone_number: this.phone_number,
		email_address: this.email_address
	},
	businessInfo:{
		business_name:this.business_name
	}
});
	merchant.$save(function(response) {
		//$scope.contactInfo.href = response.data.href;
		// you can take the response and the put it onto a single view for that single id.
		// a review form or something.
		$location.path('/confirmation');
	}, function(errorResponse){
		$scope.error = errorResponse.data.message;
	});
};


 	//var fundingInstrutment = response.cards !== null ? response.cards[0] : response.bank_accounts[0];

>>>>>>> balanceBackEnd

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
