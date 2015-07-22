'use strict';

describe('Controller: EnterAmountCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var EnterAmountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnterAmountCtrl = $controller('EnterAmountCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EnterAmountCtrl.awesomeThings.length).toBe(3);
  });
});
