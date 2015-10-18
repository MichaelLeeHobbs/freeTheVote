'use strict';

angular.module('freeTheVoteApp')
  .controller('VoteCtrl', function ($scope, $http, $routeParams, $location) {
    var self = this;

    // -1 = nothing selected
    // -2 = new option selected
    self.selection = -1;
    self.newOption = '';

    $http.get('/api/polls').then(function (response) {
      response.data.forEach(function(ele){
        if (ele._id === $routeParams.pollId) {
          self.poll = ele;
        }
      });
      if (self.poll === undefined) {
        $location.path( '/' );
      }
    });

    $scope.onClick = function () {
      $location.path( '/poll' );
    };

    $scope.onSubmit = function (form) {
      console.log(self.selection);
      console.log(self.newOption);
    };

    $scope.message = $routeParams.pollId;
  });
