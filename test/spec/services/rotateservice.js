'use strict';

describe('Service: rotateService', function () {

  // load the service's module
  beforeEach(module('angularLocalightApp'));

  // instantiate service
  var rotateService;
  beforeEach(inject(function (_rotateService_) {
    rotateService = _rotateService_;
  }));

  it('should do something', function () {
    expect(!!rotateService).toBe(true);
  });

});
