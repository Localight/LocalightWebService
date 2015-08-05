'use strict';

describe('Controller: MainpanelCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var MainpanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainpanelCtrl = $controller('MainpanelCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainpanelCtrl.awesomeThings.length).toBe(3);
  });
});
