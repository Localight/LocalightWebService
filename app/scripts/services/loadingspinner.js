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
      var loadingStack = {};
      var messageStack = {};
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
          load: function(message, requestUrl) {

              //Check if the function is doing it's own error checking
              var errorCheck = false;
              if(message.noError) errorCheck = true;

              //Set up the loading!
              loadingStack[requestUrl] =
              {
                  request: errorTimeout("Sorry, but the server is not giving us a response. Please check your internet connection, or the server may be down." +
                  " If this persists, please try again at a later time",
                  "The server never gave a response"),
                  msg: message,
                  noError: errorCheck
              };
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
          stopLoading: function(url) {

              //Cancel the timeout, and delete the loading object
              if(url) {
                  $timeout.cancel(loadingStack[url].request);
                  delete loadingStack[url];
              }

              //delete
              //delete loadingStack[requestUrl];

              //Find
              //if(loadingStack[requestUrl]) return
          },

          //Function to put on our messages array
          setMessage: function(routeUrl, message, noError) {
              messageStack[routeUrl] = {
                  msg: message,
                  noError: noError
              };
          },

          //Function to get a message from the messages array
          getMessage: function(url) {
              return messageStack[url];
          },

          //Function to return the loading stack
          loading: loadingStack,

          //Function to return the error stack
          error: errorStack
      }

  });
