'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

//Get all the giftcards, or create one
angular.module('angularLocalightApp')
  .service('Locations', ['$resource', 'ENV', function($resource, ENV) {

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
  }]);

//Get a location by it's ID
angular.module('angularLocalightApp')
  .factory('LocationById', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/locations/:id', {
        id: '@id'
    },
    {

      get: {
        method: 'GET',
        params: {},
        isArray: false
    },
      update: {
        method: 'PUT',
        params: {},
        isArray: false
    }
    });
  }]);


  //Get all of the locations under an owner
  angular.module('angularLocalightApp')
    .factory('LocationByOwner', ['$resource', 'ENV', function($resource, ENV) {

      return $resource(ENV.API_BASE + '/locations/owner/:id', {
          id: '@id'
      }, {
        get: {
          method: 'GET',
          params: {},
          isArray: true
        }

      });
    }]);


//Get a Location by it's location code
angular.module('angularLocalightApp')
  .factory('LocationByCode', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/locations/code', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: false
      }

    });
  }]);


//Spend a giftcard at a location
angular.module('angularLocalightApp')
  .factory('Spend', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/locations/:id/spend', {
      id: '@id'
    }, {
      spendGiftcard: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);
