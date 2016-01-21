'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:AdditionalinfoCtrl
 * @description
 * # AdditionalinfoCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('AdditionalinfoCtrl', function ($scope, $cookies, $location, $timeout, Owners, loadingSpinner, sessionService) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Grab our session token from the cookies
    var sessionToken = sessionService.getToken("owner");

    //Update the owner
    $scope.updateOwner = function() {

        //Create the payload
        var payload = {
            sessionToken : sessionToken,
            dob: $scope.formData.dob
        };

        //Set our message for the loading spinner
        loadingSpinner.setMessage("/owners", "Updating Your Account...");

        //Send the payload to update the owner
        Owners.update(payload, function(data, status) {

            //Everything is good, redirect to the location create page
            $location.path("/dashboard/createlocation");
        });
    }


  });
