'use strict';

angular.module('freeTheVoteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:pollId/:linkBack', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl',
        controllerAs: 'poll'
      });
  });
