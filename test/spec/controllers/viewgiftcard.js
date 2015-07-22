'use strict';

describe('Controller: ViewgiftcardCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var ViewgiftcardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewgiftcardCtrl = $controller('ViewgiftcardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewgiftcardCtrl.awesomeThings.length).toBe(3);
  });
});
