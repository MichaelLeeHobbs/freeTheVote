'use strict';

angular.module('freeTheVoteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/vote/:pollId', {
        templateUrl: 'app/vote/vote.html',
        controller: 'VoteCtrl',
        controllerAs: 'vote'
      });
  });
