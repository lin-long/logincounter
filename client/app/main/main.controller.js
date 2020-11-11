'use strict';

angular.module('lin1711App')
  .controller('MainCtrl', function ($scope, $http, userService) {

    $scope.errorMessages = {};
    $scope.errorMessages['0'] = 'Please enter your credentials below';
    $scope.errorMessages['1'] = 1; //success
    $scope.errorMessages['-1'] = 'Invalid username and password combination. Please try again.' //err_bad_creden
    $scope.errorMessages['-2'] = 'This username already exists. Please try again.' //err_user_exists
    $scope.errorMessages['-3'] = 'The user name should be non-empty and at most 128 characters long. Please try again.' //err_bad_username
    $scope.errorMessages['-4'] = 'The password should be at most 128 characters long. Please try again.' //err_bad_password

    $scope.message = $scope.errorMessages['0']; //set to default

    $scope.loggedIn = false; //keep track of which page to display
    $scope.userService = userService;

    //$scope.user = {};
    //$scope.password = {};
    //$scope.currentUser = {};

    $scope.userLogin = function (userForm) {
      var userReq = {user: $scope.userInput, password: $scope.passwordInput};
      $http.post('/users/login', userReq).success(function(response) {
       
        $scope.currentUser = response;
        if (response['errCode'] == $scope.errorMessages['1']) {//successful login
          $scope.loggedIn = true;
          $scope.message = 'Welcome ' + $scope.userInput + ". You have logged in " + response['count'] + " times.";
        } else {
          $scope.message = $scope.errorMessages[response['errCode']];
        }

      });
    };

    $scope.addUser = function (userForm) {
      var userReq = {user: $scope.userInput, password: $scope.passwordInput};
      $http.post('/users/add', userReq).success(function(response) {
        $scope.currentUser = response;
        $scope.message = $scope.errorMessages[response['errCode']];

        $scope.currentUser = response;
        if (response['errCode'] == $scope.errorMessages['1']) {//successful add of new user
          $scope.loggedIn = true;
          var timeString = ' times.';
          if (response['count'] == 1) { timeString = ' time.' } //only say time for count of 1
          $scope.message = 'Welcome ' + $scope.userInput + ", you have logged in " + response['count'] + timeString;
        } else {
          $scope.message = $scope.errorMessages[response['errCode']];
        }

      });
    };

    //reset form and default message displayed when user logs out
    $scope.userLogout = function () {
      $scope.userInput = "";
      $scope.passwordInput = "";
      $scope.userForm.$setPristine();
      $scope.message = $scope.errorMessages['0'];
      $scope.loggedIn = false; //set loggedIn back to false when user logs out
    };

    $scope.TESTAPI_resetFixture = function () {
      $http.post('/TESTAPI/resetFixture', {});
      $scope.message = 'Removed all users from database';
    };
    
  });
