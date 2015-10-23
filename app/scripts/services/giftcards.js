'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.giftcards
 * @description
 * # giftcards
 * Service in the angularLocalightApp.
 */

//Create a giftcard, or return all of a user's giftcards
angular.module('angularLocalightApp')
  .service('Giftcards', ['$resource', 'ENV', function($resource, ENV) {

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
}]);

//Get a giftcard by it's ID
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
