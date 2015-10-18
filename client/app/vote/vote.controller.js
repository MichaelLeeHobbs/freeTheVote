'use strict';

angular.module('freeTheVoteApp')
  .controller('VoteCtrl', function ($scope, $http, $routeParams, $location) {
    var self = this;

    // -1 = nothing selected
    // -2 = new option selected
    self.selection = -1;
    self.newOption = '';

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

      if (self.selection !== -2) {
        self.poll.votes[self.selection]++;
      }

      if (self.selection === -2) {
        self.poll.votes.push(1);
        self.poll.options.push(self.newOption);
      }

      $http.put('/api/polls/' + $routeParams.pollId + '/vote', self.poll)
        .then(function (res) {
          self.poll = res.data;
        }).catch(function(err){
          console.log('error: ' + err);
        });

    };

    $scope.message = $routeParams.pollId;
  });
