'use strict';

describe('Controller: RecipientredirectCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var RecipientredirectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipientredirectCtrl = $controller('RecipientredirectCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecipientredirectCtrl.awesomeThings.length).toBe(3);
  });
});
