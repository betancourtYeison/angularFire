'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'myApp.config',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
  .run(['$rootScope', 'FBURL', function($rootScope, FBURL) {
    if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
      // double-check that the app has been configured
      angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      setTimeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
    else {
      $rootScope.FBURL = FBURL;
    }
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users',  {templateUrl: 'views/user_index.html', controller: 'UserCtrl'});
    $routeProvider.when('/users/new', {templateUrl: 'views/new_user.html', controller: 'NewUserCtrl'});
    $routeProvider.when('/users/:id',  {templateUrl: 'views/user.html', controller: 'UserDetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/users'});
  }]);
