'use strict';

describe('Controller: CreatelocationCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var CreatelocationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatelocationCtrl = $controller('CreatelocationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreatelocationCtrl.awesomeThings.length).toBe(3);
  });
});
