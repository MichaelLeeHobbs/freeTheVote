'use strict';

angular.module('freeTheVoteApp')
  .controller('PollCtrl', function ($scope, $http) {
    var self = this;
    this.polls = [];

    $http.get('/api/polls').then(function(response) {
      self.polls = response.data;
    });

    $scope.options = ['a', 'b', 'c'];
    $scope.votes = ['3', '5', '13'];
  });
