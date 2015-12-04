'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.loadingSpinner
 * @description
 * # loadingSpinner
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('loadingSpinner', function ($timeout) {

      //The super cool loading stack system!
      var loadingStack = [];
      var errorStack = [];

      //Function to push onto the error stack
      function errorTimeout(msg, devMsg) {

          //Return a timeout to show a message if it doesn't exectue after a set time
          return $timeout(function () {

              errorStack.push(msg);

              console.log(devMsg);

              return false;

          }, 10000);

      }

      //Our functions to be returned from the service
      return {

          //Function to push onto the loading stack and error stack
          //Param: Message of what is loading
          //Param: noError, signifies error handling is handled somewhere else
          load: function(message, noError) {

              //Create an object Id
              var randomId = "loading" + loadingStack.length + Math.floor(Math.random() * (9999 - 1000) + 1000);

              //Set up the loading!
              if(noError) {
                  loadingStack.push(
                      {
                          request: errorTimeout("Sorry, but the server is not giving us a response. Please check your internet connection, or the server may be down." +
                          " If this persists, please try again at a later time",
                          "The server never gave a response"),
                          msg: message,
                          id: randomId,
                          noError: true
                      });
              }
              else {
                  loadingStack.push(
                      {
                          request: errorTimeout("Sorry, but the server is not giving us a response. Please check your internet connection, or the server may be down." +
                          " If this persists, please try again at a later time",
                          "The server never gave a response"),
                          msg: message,
                          id: randomId
                      });
              }

             return randomId;
         },

          //Function to push onto the error stack
          //Param: Message to display to the user, Message to output into the console
          showError: function (userMessage, consoleMessage) {
              //Push our error onto the stack
              errorTimeout(userMessage, consoleMessage);

              //Then Pop off all of the loading requests, to simply show the error
              for(var i = 0; i < loadingStack.length; i++)
              {
                  $timeout.cancel(loadingStack[i].request);
                  loadingStack.splice(i, 1);
              }
          },

          //Function to pop off of the loading stack
          stopLoading: function(loadingId) {

              //Search through the stack and pop the error
              for(var i = 0; i < loadingStack.length; i++) {

                  //If the id is correct, Pop it from the stack and break
                  if(loadingStack[i].id == loadingId){

                      $timeout.cancel(loadingStack[i].request);
                      loadingStack.splice(i, 1);
                      break;
                  }

              }
          },

          //Function to return the loading stack
          loading: loadingStack,

          //Function to return the error stack
          error: errorStack
      }

  });
