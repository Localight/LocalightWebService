'use strict';

describe('Service: sessionToken', function () {

  // load the service's module
  beforeEach(module('angularLocalightApp'));

  // instantiate service
  var sessionToken;
  beforeEach(inject(function (_sessionToken_) {
    sessionToken = _sessionToken_;
  }));

  it('should do something', function () {
    expect(!!sessionToken).toBe(true);
  });

});
