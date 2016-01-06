'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.sessionToken
 * @description
 * # sessionToken
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('sessionService', function ($location, $cookies, Users, Owners, loadingSpinner) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //Session Token Variable
    var sessionToken;

    //function to validate a sessionToken
    function validateToken(role, token) {

        var payload = {
            "sessionToken": token
        }

        if(role == "user") {

            //Set our message for the loading spinner
            loadingSpinner.setMessage("/users", "Validating Session...", true);

            //Send the session token to the backend
            return Users.get(payload).$promise.then(function(data, status) {

                //Everything went great
                //return the session Token
                return token;
            },
            //Error Checking
            function (err) {

                if(err.status == 412) {

                    //They are unauthenticated, return false
                    $location.path("#/");
                    loadingSpinner.reset();
                }
                else {

                    //Show an error
                    loadingSpinner.showError("Status: " + err.status + "An error occurred validating your session",
                    "Status: " + err.status + "Error with the session service validating token",
                }

                return false;
            });
        }
        else if(role == "owner") {

            //Set our message for the loading spinner
            loadingSpinner.setMessage("/owners", "Validating Session...", true);

            //Send the session token to the backend
            return Owners.get(payload).$promise.then(function(data, status) {

                //Everything went great
                //return the session Token
                return token;
            },
            //Error Checking
            function (err) {

                if(err.status == 412) {

                    //They are unauthenticated, return false
                    $location.path("#/");
                    loadingSpinner.reset();
                }
                else {

                    //Show an error
                    loadingSpinner.showError("Status: " + err.status + "An error occurred validating your session",
                    "Status: " + err.status + "Error with the session service validating token",
                    "/owners");
                }

                return false;
            });
        }
    }


    //Our functions to be returned from the service
    return {

        //Function to return the sessionToken
        //Role = is the session token for users or owners
        //validate = should we ping the backend to check the sessionToken
        getToken: function(role, validate) {

            if((role == "user" && $cookies.get("sessionToken")) ||
            (role == "owner" && $cookies.get("sessionToken-owner")))
            {

                //get our session token from the cookies
                if(role == "user")sessionToken = $cookies.get("sessionToken");
                else sessionToken = $cookies.get("sessionToken-owner");

                // Check if we need to validate the session token
                if(validate) return validateToken(role, sessionToken);
                else return sessionToken;

            }
            else if($location.search().token)
            {
                //get our session token
                sessionToken = $location.search().token;


                //Place the session token in the cookies
                if(role == "user")$cookies.put("sessionToken", sessionToken);
                else $cookies.put("sessionToken-owner", sessionToken);

                // Check if we need to validate the session token
                if(validate) return validateToken(role, sessionToken);
                else return sessionToken;
            }
            else {
                //Redirect them to a 404
                $location.path("#/");
            }
        }
    }

  });
