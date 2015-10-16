'use strict';

describe('Controller: EditlocationCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var EditlocationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditlocationCtrl = $controller('EditlocationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditlocationCtrl.awesomeThings.length).toBe(3);
  });
});
