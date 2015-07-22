'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.Users
 * @description
 * # Users
 * Service in the angularLocalightApp.
 */
 angular.module('angularLocalightApp')
 .factory('Users', ['$resource', function($resource) {

 return $resource( '/users',
     { }, {
         update: {
             method: 'PUT',
             params: {},
             isArray: false
         }

     } );
 }]);

angular.module('angularLocalightApp')
.factory('Login', ['$resource', function($resource) {

return $resource( '/users/login',
    { }, {
        submit: {
            method: 'POST',
            params: {},
            isArray: false
        }

    } );
}]);

angular.module('angularLocalightApp')
.factory('Join', ['$resource', function($resource) {

return $resource( '/users/join',
    { }, {
        submit: {
            method: 'POST',
            params: {},
            isArray: false
        }

    } );
}]);
