'use strict';

describe('Controller: MerchantsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var MerchantsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MerchantsCtrl = $controller('MerchantsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MerchantsCtrl.awesomeThings.length).toBe(3);
  });
});
