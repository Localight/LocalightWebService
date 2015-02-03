'use strict';

(function() {
	// Merchants Controller Spec
	describe('Merchants Controller Tests', function() {
		// Initialize global variables
		var MerchantsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Merchants controller.
			MerchantsController = $controller('MerchantsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Merchant object fetched from XHR', inject(function(Merchants) {
			// Create sample Merchant using the Merchants service
			var sampleMerchant = new Merchants({
				name: 'New Merchant'
			});

			// Create a sample Merchants array that includes the new Merchant
			var sampleMerchants = [sampleMerchant];

			// Set GET response
			$httpBackend.expectGET('merchants').respond(sampleMerchants);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.merchants).toEqualData(sampleMerchants);
		}));

		it('$scope.findOne() should create an array with one Merchant object fetched from XHR using a merchantId URL parameter', inject(function(Merchants) {
			// Define a sample Merchant object
			var sampleMerchant = new Merchants({
				name: 'New Merchant'
			});

			// Set the URL parameter
			$stateParams.merchantId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/merchants\/([0-9a-fA-F]{24})$/).respond(sampleMerchant);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.merchant).toEqualData(sampleMerchant);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Merchants) {
			// Create a sample Merchant object
			var sampleMerchantPostData = new Merchants({
				name: 'New Merchant'
			});

			// Create a sample Merchant response
			var sampleMerchantResponse = new Merchants({
				_id: '525cf20451979dea2c000001',
				name: 'New Merchant'
			});

			// Fixture mock form input values
			scope.name = 'New Merchant';

			// Set POST response
			$httpBackend.expectPOST('merchants', sampleMerchantPostData).respond(sampleMerchantResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Merchant was created
			expect($location.path()).toBe('/merchants/' + sampleMerchantResponse._id);
		}));

		it('$scope.update() should update a valid Merchant', inject(function(Merchants) {
			// Define a sample Merchant put data
			var sampleMerchantPutData = new Merchants({
				_id: '525cf20451979dea2c000001',
				name: 'New Merchant'
			});

			// Mock Merchant in scope
			scope.merchant = sampleMerchantPutData;

			// Set PUT response
			$httpBackend.expectPUT(/merchants\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/merchants/' + sampleMerchantPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid merchantId and remove the Merchant from the scope', inject(function(Merchants) {
			// Create new Merchant object
			var sampleMerchant = new Merchants({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Merchants array and include the Merchant
			scope.merchants = [sampleMerchant];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/merchants\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMerchant);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.merchants.length).toBe(0);
		}));
	});
}());
