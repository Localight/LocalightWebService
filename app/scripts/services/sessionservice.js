'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.sessionToken
 * @description
 * # sessionToken
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('sessionService', function ($location, $cookies) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //Array of routes that are allowed as
    //Query Param Entry Points into the
    //Application
    var entryRoutes = [
        //Both giftCreate and giftView
        "/#/giftcards/",
        "/#/thankYou"
    ]

    //Get the session token
    var sessionToken;

    if($location.search().token)
    {
        //get our session token
        sessionToken = $location.search().token;

        //Place the session token in the cookies
        $cookies.put("sessionToken", sessionToken);
    }
    else if($cookies.get("sessionToken"))
    {
        //get our session token from the cookies
        sessionToken = $cookies.get("sessionToken");
    }
    else {
        //Redirect them to a 404
        $location.path("#/");
    }



    //Our functions to be returned from the service
    return {
        //Function to return the sessionToken
        getToken: sessionToken,
    }
  });
