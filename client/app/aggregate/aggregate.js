'use strict';

angular.module('freeTheVoteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/aggregate', {
        templateUrl: 'app/aggregate/aggregate.html',
        controller: 'AggregateCtrl',
        controllerAs: 'aggregate'
      });
  });
