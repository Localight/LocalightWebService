'use strict';

//giftcards service used to communicate Giftcards REST endpoints
angular.module('giftcards')
  .factory('AuthTwilio', ['$resource', function($resource) {

    return $resource( '/auth/twilioWebHookLogin/:token',
        { }, {
            login: {
                method: 'GET',
                params: { },
                isArray: false
            }
        });
}]);
