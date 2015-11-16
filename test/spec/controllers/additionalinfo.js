'use strict';

describe('Controller: AdditionalinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var AdditionalinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdditionalinfoCtrl = $controller('AdditionalinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdditionalinfoCtrl.awesomeThings.length).toBe(3);
  });
});
