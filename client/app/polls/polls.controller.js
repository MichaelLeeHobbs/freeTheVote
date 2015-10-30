'use strict';

//rename poll to polls
angular.module('freeTheVoteApp')
  .controller('PollsCtrl', function ($scope, $http, $location) {
    var self = this;

    $http.get('/api/polls')
      .then(function (response) {
        self.polls = response.data;
        self.polls.forEach(function (ele) {
          ele.onClick = function () {
            $location.path('/poll/' + ele._id);
          };
        });
      });
  });
