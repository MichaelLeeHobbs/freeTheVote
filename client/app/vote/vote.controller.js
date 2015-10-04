'use strict';

angular.module('freeTheVoteApp')
  .controller('VoteCtrl', function ($scope, $http, $routeParams, $location) {
    var self = this;
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

    $scope.message = $routeParams.pollId;
  });
