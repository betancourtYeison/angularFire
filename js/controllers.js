'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', [function() {

  }])
  .controller('NewUserCtrl', ['$scope', '$location', 'firebaseRef', function($scope, $location, firebaseRef) {
    $scope.createNewUser = function () {
      firebaseRef('users/'+ $scope.user.username).set({
        id: $scope.user.username,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        email: $scope.user.email,
        password: $scope.user.password
      });
      $location.path('/users');
    }
  }])
  .controller('UserDetailCtrl', ['$scope', '$location', '$routeParams', 'syncData', function($scope, $location, $routeParams, syncData) {
    $scope.user = syncData('users/' + $routeParams.id);
    $scope.updateUser = function () {
      $scope.user.$update({
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        email: $scope.user.email,
        password: $scope.user.password
      });

      $location.path('/users');
    }
    $scope.cancel = function () {
      $location.path('/users');
    };
  }])
  .controller('UserCtrl', ['$scope', '$location', 'syncData', function($scope, $location, syncData) {
    $scope.users = syncData('users');

    $scope.createNewUser = function () {
      $location.path('/users/new');
    };

    $scope.editUser = function (id) {
      $location.path('/users/' + id);
    };

    $scope.deleteUser = function(id) {
      $scope.user = syncData('users/' + id);
      $scope.user.$remove();
    }
  }]);
