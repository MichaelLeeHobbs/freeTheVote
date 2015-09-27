'use strict';

angular.module('freeTheVoteApp')
  .controller('PollCtrl', function ($scope, $http) {
    var self = this;
    this.polls = [];

    $http.get('/api/polls').then(function(response) {
      self.polls = response.data;
    });
  });
