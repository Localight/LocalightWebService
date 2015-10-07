'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.Users
 * @description
 * # Users
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .factory('Users', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users', {}, {
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

angular.module('angularLocalightApp')
  .factory('Login', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/login', {}, {
      submit: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('angularLocalightApp')
  .factory('Join', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/join', {}, {
      submit: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);
