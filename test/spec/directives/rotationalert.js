'use strict';

describe('Directive: rotationAlert', function () {

  // load the directive's module
  beforeEach(module('angularLocalightApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rotation-alert></rotation-alert>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rotationAlert directive');
  }));
});
