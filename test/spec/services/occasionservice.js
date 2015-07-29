'use strict';

describe('Service: OccasionService', function () {

  // load the service's module
  beforeEach(module('angularLocalightApp'));

  // instantiate service
  var OccasionService;
  beforeEach(inject(function (_OccasionService_) {
    OccasionService = _OccasionService_;
  }));

  it('should do something', function () {
    expect(!!OccasionService).toBe(true);
  });

});
