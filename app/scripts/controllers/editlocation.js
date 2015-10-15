'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:EditlocationCtrl
 * @description
 * # EditlocationCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('EditlocationCtrl', function ($scope, $cookies, $location, $route, $routeParams, Owners, LocationById) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //get our session token
    var sessionToken = $cookies.get("sessionToken");

    //switch the pages
    $scope.switchPage = function() {
        //Set the background to dark
        document.body.className = "darkBlurBodyBg";

        //Set show the next page to true
        $scope.showNextPage = true;
    }

    //Set the background class back if going to a new url
    $scope.$on('$locationChangeStart', function(next, current) {
        document.body.className = "";
    });

    //Get our location
    $scope.getLocation = function() {
        //Get our giftcards from the user
        //First set up some JSON for the session token
        var getJson = {
            "id" : $routeParams.locationId,
            "sessionToken" : $scope.sessionToken
        }

        $scope.merchantLocation = LocationById.get(getJson, function(response){
            //Check for errors
            if(response.status)
            {
                if(response.status == 401)
                {
                    //Bad session
                    //Redirect them to a 404
                    $location.path("#/");
                    return;
                }
                else
                {
                    console.log("Status:" + response.status + ", " + $scope.giftcards.msg);
                    return;
                }
            }
            else {
                //Set the variables for the form here!
                $scope.locationName = $scope.merchantLocation.name;
                $scope.address1 = $scope.merchantLocation.address1;
                $scope.address2 = $scope.merchantLocation.address2;
                $scope.city = $scope.merchantLocation.city;
                $scope.state = $scope.merchantLocation.state;
                $scope.zipcode= $scope.merchantLocation.zipcode;
            }
        },
        //check for a 500
        function(response)
        {
            console.log("Status:" + response.status + ", Internal Server Error");
            return;
        })
     };


    /*--------------------------------
    *
    *   SECOND PAGE LOGIC
    *
    --------------------------------*/
    //Our tricon message
    $scope.triconMessage = "Please enter (or re-enter) a 3 item tricon code. This will be used by employees for confirmation to use a giftcard at your location.";

    //our array of tricons
    $scope.triconArray = [];

    $scope.confirmedCode = false;

    //Shuffles an array using the Fisher-Yates algorithm
    $scope.shuffle = function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    //When tricon is being pressed, this function will be launched
    $scope.pressed = function(id){

        //remove the error text
        //Error message
        $scope.errorMsg = "";

        //Add tricon code here
        //console.log("Tricon Pressed: " + $scope.images[id]);
        //
        var offset;
        if(window.innerWidth <= 320){
            offset = '-75px';
        } else {
            offset = '-100px';
        }
        event.currentTarget.style.backgroundPositionY = offset;

        //Check if they had already entered a code
        if($scope.triconArray.length > 2) {
            //Reset the code fresh
            $scope.triconMessage = "Please enter (or re-enter) a 3 item tricon code. This will be used by employees for confirmation to use a giftcard at your location.";

            //our array of tricons
            $scope.triconArray = [];

            $scope.confirmedCode = false;
        }

        //Push the tricon onto the array
        $scope.triconArray.push($scope.images[id]);

        //Check if it has more than 2 images, if it does, go to the confirmation page
        if($scope.triconArray.length > 2) {

            //Inform the user that it is good!
            $scope.triconMessage = "Please submit to finish creating your location, or enter another code"

            $scope.confirmedCode = true;
        }
    }

    //When tricon is unpressed, this function will be launched
    $scope.unpressed = function(id){
        event.currentTarget.style.backgroundPositionY = '0px';
    }

    //Holds the table layout for the dynamic ng-repeat table
    $scope.tableLayout = [
            [0,1,2],
            [3,4,5],
            [6,7,8]
    ];

    //Array of the eatery tricons and their paths
    $scope.images =
    [
        {name: "tricon-coffee", pos: "600", code: "e107"},
        {name: "tricon-cupcake", pos: "0", code: "e101"},
        {name: "tricon-dinner", pos: "300", code: "e104"},
        {name: "tricon-pie", pos: "800", code: "e109"},
        {name: "tricon-sandwich", pos: "100", code: "e102"},
        {name: "tricon-sushi", pos: "200", code: "e103"},
        {name: "tricon-pho-soup", pos: "400", code: "e105"},
        {name: "tricon-sundae", pos: "700", code: "e108"},
        {name: "tricon-wine", pos: "500", code: "e106"}
    ];

    if(window.innerWidth <= 320){
        for(var i = 0; i < $scope.images.length; i++){
            $scope.images[i].pos = $scope.images[i].pos * .75;
        }
    }

    //Shuffles the images array of tricons to always
    //display in different order
    $scope.images = $scope.shuffle($scope.images);

    //Create the location
    $scope.updateLocation = function() {

        //First set up some JSON for the session token
        var postJson = {
           "id": $routeParams.locationId,
           "sessionToken": sessionToken,
           "name": $scope.locationName,
           "triconKey": $scope.triconArray[0].code + "" + $scope.triconArray[1].code + "" + $scope.triconArray[2].code,
           "address1": $scope.address1,
           "address2": $scope.address2,
           "city": $scope.city,
           "state": $scope.state,
           "zipcode": $scope.zipcode
       };

        $scope.newLocation = LocationById.update(postJson, function(){

            //Success!
            //redirect back to the main page
            $location.path("/panel/main");
        },
        //check for errors
        function(response)
        {
            //Create the error object
            $scope.error = {
                isError : true,
                text: ""
            };

            if(response.status == 401)
            {
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            else {
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }
        });
    }

  });
