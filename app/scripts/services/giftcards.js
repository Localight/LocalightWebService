'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.giftcards
 * @description
 * # giftcards
 * Service in the angularLocalightApp.
 */

angular.module('angularLocalightApp')
  .service('Giftcards', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/giftcards', {}, {
      create: {
        method: 'POST',
        params: {},
        isArray: false
      },
      get: {
        method: 'GET',
        params: {},
        isArray: true
      }
    });
  });

angular.module('angularLocalightApp')
  .factory('GiftcardById', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/giftcards/:id', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: false
      }

    });
  }]);
