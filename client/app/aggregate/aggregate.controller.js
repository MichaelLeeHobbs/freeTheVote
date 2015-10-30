'use strict';

angular.module('freeTheVoteApp')
  .controller('AggregateCtrl', function ($scope, $http, Auth, $location, $window) {
    var self = this;
    self.raw = function() {
      $window.open('http://' + $location.host() + ':' + $location.port() + '/api/polls/byOwner/' + self.currentUserId);
    };


    Auth.getCurrentUser(function (user) {
      self.currentUserId = user._id;
      $http.get('/api/polls/byOwner/' + self.currentUserId)
        .then(function (response) {
          self.polls = response.data;
          //self.raw = 'http://' + $location.host() + ':' + $location.port() + '/api/polls/byOwner/' + self.currentUserId;
          self.polls.forEach(function (ele) {
            ele.onClick = function () {
              $location.path('/poll/' + ele._id + '/aggregate');
            };
          });
          console.log(self.polls);
        });
    });
  });
