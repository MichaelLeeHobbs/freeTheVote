'use strict';

angular.module('freeTheVoteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl',
        controllerAs: 'poll'
      });
  });
