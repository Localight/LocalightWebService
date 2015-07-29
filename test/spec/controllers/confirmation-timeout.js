'use strict';

describe('Controller: ConfirmationTimeoutCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var ConfirmationTimeoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmationTimeoutCtrl = $controller('ConfirmationTimeoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfirmationTimeoutCtrl.awesomeThings.length).toBe(3);
  });
});
