'use strict';
angular.module('merchants').controller('MerchantsController', ['$scope', '$stateParams', '$location', 'Merchants',
	function($scope, $stateParams, $location, Merchants) {
		// need to make this only avaible to signup or merchant change page.
$scope.signupMerchant = function() {
	var merchant = new Merchants({
		// first_name:this.first_name,
		// last_name:this.last_name,
		// phone_number:this.phone_number,
		// email_address:this.email_address,
		// business_name: this.business_name,
		// address:{
		// city:this.city,
		// line1:this.line1,
		// line2:this.line2,
		// state:this.state,
		// zipcode:this.zipcode,
		// for testing purupose only!
		first_name:'test',
		last_name:'hall',
		phone_number:'555555555555',
		email_address:'email@email.com',
		business_name: 'localism',
		address:{
		city:'place',
		line1:'234',
		line2:'234',
		state:'ca',
		zipcode:'90802',
		// TODO: need to add in ability to search database for phone, if phone not found add merchant,
		// if merchant found, give error and response, to contact support. need to create support page.
		//
	},
		account_number:'9900000002',
		routing_number:'021000021'
		});
		// have fields for bank info, just need to take data, tokenize it, and associate it to the customer, and done.
		merchant.$save(function(response) {
			$location.path('/confirmation');
		}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
		});
};
// $scope.addBankAccount = function(){
//
// 	$http.post('/auth/signup', $scope.credentials).success(function(response) {
// 		// I could in theory try it here and see what happens or try making this in the backend.
// 		// If successful we assign the response to the global user model
// 		// i'm still not sure what this does, but i think it has to somehting with store the session, if i'm write
// 		// the signin should have similar logic somewhere
// 		$scope.authentication.user = response;// actually logs a user in.
//
// 		// And redirect to the index page
// 		$location.path('/');
// 	}).error(function(response) {
// 		$scope.error = response.message;
// 	});
// };

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
