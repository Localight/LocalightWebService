'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.loadingSpinner
 * @description
 * # loadingSpinner
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('loadingSpinner', function ($scope) {

      //The super cool loading stack system!
      $scope.loadingStack = [];
      $scope.errorStack = [];

      //Function to push onto the error stack
      function errorTimeout(msg, devMsg) {

          //Return a timeout to show a message if it does nt exectue after a set time
          return $timeout(function () {

              $scope.errorStack.push(msg);

              conosle.log(devMsg);

              return false;

          }, 10000);

      }

      //Function to push onto the loading stack and error stack
      //Id of the push
      function pushLoading(loadingMessage,
      "Sorry, but the server is not giving us a response. Please check your internet connection, or the server is down. If this persists, please try again at a later time",
      "The server never gave a response") {

          //Create an object Id
          var randomId = "loading" + $scope.loadingStack.length + Math.random() * (1000 - 1) + 1;

          //Set up the loading!
          $scope.loadingStack.push(
              {
                  request: errorTimeout(),
                  msg: loading,
                  id:
              });
      }

      //Our functions to be returned from the service
      return {

          stopLoading: function(var loadingId) {

              //Search through the stack and pop the error
              for(var i = 0; i < $scope.loadingStack.length; i++) {

                  //If the id is correct, Pop it from the stack and break
                  if($scope.loadingStack[i].id == loadingId){

                      $scope.loadingStack[i].requst.cancel();
                      $scope.loadingStack[i].pop();
                      break;
                  }

              }
          }
      }

  });
