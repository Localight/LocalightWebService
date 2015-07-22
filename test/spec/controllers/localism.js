'use strict';

describe('Controller: LocalismCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var LocalismCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocalismCtrl = $controller('LocalismCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LocalismCtrl.awesomeThings.length).toBe(3);
  });
});
