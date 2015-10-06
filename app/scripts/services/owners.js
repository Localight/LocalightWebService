'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.Owners
 * @description
 * # Owners
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .factory('Owners', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/owners', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('angularLocalightApp')
  .factory('JoinOwner', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/owners/join', {}, {
      submit: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('angularLocalightApp')
  .factory('LoginOwner', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/owners/login', {}, {
      submit: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);
