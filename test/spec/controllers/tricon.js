'use strict';

describe('Controller: TriconCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var TriconCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TriconCtrl = $controller('TriconCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TriconCtrl.awesomeThings.length).toBe(3);
  });
});
