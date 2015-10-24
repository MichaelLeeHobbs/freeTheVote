'use strict';

angular.module('freeTheVoteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create', {
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      });
  });
