'use strict';

describe('Controller: FollowupCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLocalightApp'));

  var FollowupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FollowupCtrl = $controller('FollowupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FollowupCtrl.awesomeThings.length).toBe(3);
  });
});
