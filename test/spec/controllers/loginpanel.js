'use strict';

describe('Controller: LoginpanelCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var LoginpanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginpanelCtrl = $controller('LoginpanelCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginpanelCtrl.awesomeThings.length).toBe(3);
  });
});
