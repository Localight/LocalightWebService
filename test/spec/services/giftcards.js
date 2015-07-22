'use strict';

describe('Service: giftcards', function () {

  // load the service's module
  beforeEach(module('angularLocalightApp'));

  // instantiate service
  var giftcards;
  beforeEach(inject(function (_giftcards_) {
    giftcards = _giftcards_;
  }));

  it('should do something', function () {
    expect(!!giftcards).toBe(true);
  });

});
