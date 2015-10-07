'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

//Get all the giftcards, or creat one
angular.module('angularLocalightApp')
  .service('Locations', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/locations', {}, {
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

//Location By Id
angular.module('angularLocalightApp')
  .factory('LocationById', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/locations/:id', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: false
      }

    });
  }]);

//Spending a Giftcard
angular.module('angularLocalightApp')
  .factory('Spend', ['$resource', function($resource) {

    return $resource(window.location.protocol + "//" + window.location.hostname + ':3000/locations/:id/spend', {
      id: '@id'
    }, {
      spendGiftcard: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);
