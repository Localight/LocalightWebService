'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.Users
 * @description
 * # Users
 * Service in the angularLocalightApp.
 */

 //Create and Get a user
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

//Login an User
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

//Sign up a user to the app
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

//Send the thanks Email to a user
angular.module('angularLocalightApp')
.factory('Thanks', ['$resource', 'ENV', function($resource, ENV) {

  return $resource(ENV.API_BASE + '/users/thanks', {}, {
    submit: {
      method: 'POST',
      params: {},
      isArray: false
    }

  });
}]);
