'use strict';

angular.module('lin1711App')
  .factory('userService', function ($q, $http) {
    // Service logic
    // ...

    var service = {};

    service.allUsers = [];
    service.currentUser = {};

    service.getAllUsers = function () {
      return $http.get('/users')
        .success(function (users) {
          service.allUsers = users;
          return allUsers;
        })
    };

    service.addUser = function (userObj) {
      return $http.post('/users/add', userObj)
        .success(function (data) {
          service.currentUser.push(data);
          return currentUser;
        })
    };

    service.userLogin = function (userObj) {
      return $http.post('/users/login', userObj)
        .success(function (data) {
          service.currentUser.push(data);
          return currentUser;
        })
    };

    service.TESTAPI_resetFixture = function () {
      return $http.post('/TESTAPI/resetFixture')
        .success(function (data) {
          console.log('Removed all users from database');
        })
    };

    return service;


  });
