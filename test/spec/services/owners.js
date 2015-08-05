'use strict';

describe('Service: Owners', function () {

  // load the service's module
  beforeEach(module('angularLocalightApp'));

  // instantiate service
  var Owners;
  beforeEach(inject(function (_Owners_) {
    Owners = _Owners_;
  }));

  it('should do something', function () {
    expect(!!Owners).toBe(true);
  });

});
