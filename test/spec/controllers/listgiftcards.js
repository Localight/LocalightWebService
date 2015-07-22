'use strict';

describe('Controller: ListgiftcardsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var ListgiftcardsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListgiftcardsCtrl = $controller('ListgiftcardsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListgiftcardsCtrl.awesomeThings.length).toBe(3);
  });
});
