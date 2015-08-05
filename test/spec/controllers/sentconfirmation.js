'use strict';

describe('Controller: SentconfirmationCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var SentconfirmationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SentconfirmationCtrl = $controller('SentconfirmationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SentconfirmationCtrl.awesomeThings.length).toBe(3);
  });
});
