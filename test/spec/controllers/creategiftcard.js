'use strict';

describe('Controller: CreategiftcardCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var CreategiftcardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreategiftcardCtrl = $controller('CreategiftcardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreategiftcardCtrl.awesomeThings.length).toBe(3);
  });
});
