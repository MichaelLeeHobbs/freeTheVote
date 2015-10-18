'use strict';

angular.module('freeTheVoteApp')
  .controller('VoteCtrl', function ($scope, $http, $routeParams, $location, $cookies) {
    var self = this;

    // -1 = nothing selected
    // -2 = new option selected
    self.selection = -1;
    self.newOption = '';
    self.cookie = $cookies.get($routeParams.pollId);
    self.hasVoted = (self.cookie !== undefined);

    if (self.hasVoted) {
      self.selection = self.cookie;
    }

    console.log(self.cookie);

    $http.get('/api/polls').then(function (response) {
      response.data.forEach(function (ele) {
        if (ele._id === $routeParams.pollId) {
          self.poll = ele;
        }
      });
      if (self.poll === undefined) {
        $location.path('/');
      }
    });

    $scope.onClick = function () {
      $location.path('/poll');
    };

    $scope.onSubmit = function () {
      console.log(self.selection);
      console.log(self.newOption);
      if (self.selection === -1) {
        return;
      }

      if (self.hasVoted) {
        if (self.poll.votes[self.cookie] > 0) {
          self.poll.votes[self.cookie]--;
        }
        self.cookie = -1;
      }

      if (self.selection !== -2) {
        self.poll.votes[self.selection]++;
      }

      if (self.selection === -2) {
        // see if the option already exist



        self.poll.votes.push(1);
        self.poll.options.push(self.newOption);
        self.selection = self.poll.votes.length - 1;
      }

      $http.put('/api/polls/' + self.poll._id + '/vote', self.poll)
        .then(function (res) {
          self.poll = res.data;
          self.hasVoted = true;
          $cookies.put(self.poll._id, self.selection);
          self.cookie = $cookies.get($routeParams.pollId);
        }).catch(function(err){
          console.log('error: ' + err);
        });

    };

    $scope.message = $routeParams.pollId;
  });
