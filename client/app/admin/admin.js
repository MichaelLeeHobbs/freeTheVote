'use strict';

angular.module('freeTheVoteApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
