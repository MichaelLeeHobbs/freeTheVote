'use strict';

// todo add goBackLink to url to tell the poll if it should return to poll or aggregate
// todo rename vote to poll
angular.module('freeTheVoteApp')
  .controller('PollCtrl', function ($scope, $http, $routeParams, $location, $cookies, Auth, $window) {
    var self = this;

    // undefined = nothing selected
    // new = new option selected
    self.selection = undefined;
    self.newOption = '';
    self.oldVote   = $cookies.get($routeParams.pollId);
    self.hasVoted  = (self.oldVote !== undefined);
    self.link      = $location.absUrl();
    self.tweet     = 'https://twitter.com/intent/tweet?hashtags=fcc&original_referer=http%3A%2F%2Flocalhost%3A9000%2Fpoll%2F562ba365f7f4d9ab396cfa27&ref_src=twsrc%5Etfw&text=Check%20out%20my%20poll%20at&tw_p=tweetbutton&url=http%3A%2F%2Flocalhost%3A9000%2Fpoll%2F' + $routeParams.pollId;
    self.raw       = function() {
      $window.open('http://' + $location.host() + ':' + $location.port() + '/api/polls/' + $routeParams.pollId);
    };

    Auth.getCurrentUser(function (user) {
      self.currentUserId = user._id;
    });
    self.owner     = false;

    if (self.hasVoted) {
      self.selection = self.oldVote;
    }

    $http.get('/api/polls/' + $routeParams.pollId).then(function (response) {
      self.poll    = response.data;
      self.isOwner = (self.poll.ownerId === self.currentUserId);
    }).catch(function () {
      $location.path('/');
    });

    $scope.onClick = function () {
      $location.path('/' + $routeParams.linkBack);
    };

    $scope.onSubmit = function () {
      // if no option selected return
      if (self.selection === undefined) {
        return;
      }
      // if has voted then remove 1 vote from old vote
      if (self.hasVoted) {
        if (self.poll.votes[self.oldVote] > 0) {
          self.poll.votes[self.oldVote]--;
          self.hasVoted = false;
        }
      }

      // if selection is equal to 'new' then add option and one vote
      if (self.selection === 'new') {

        // see if the option already exist
        var result = self.poll.options.some(function (ele, i) {
          if (ele.toString().toLowerCase() === self.newOption.toLowerCase()) {
            // new option already exist so set selection to index
            self.selection = i;
            return true;
          }
        });

        // new option doesn't exist so add it
        if (result === false) {
          self.poll.votes.push(1);
          self.poll.options.push(self.newOption);
          self.selection = self.poll.votes.length - 1;
          self.hasVoted  = true;
        }
      }

      // if selection is not equal to 'new' then add one vote
      if (self.hasVoted === false) {
        self.poll.votes[self.selection]++;
      }

      $http.put('/api/polls/' + self.poll._id + '/vote', self.poll)
        .then(function (res) {
          self.poll     = res.data;
          self.hasVoted = true;
          $cookies.put(self.poll._id, self.selection);
          self.oldVote  = $cookies.get($routeParams.pollId);
        }).catch(function (err) {
          console.log('error: ' + err);
        });

    };

    $scope.message = $routeParams.pollId;
    $scope.delete  = function () {
      $http.delete('/api/polls/' + $routeParams.pollId)
        .then(function () {
          $location.path('/');
        })
        .catch(function () {
          $location.path('/');
        });
    };
    $scope.socialWidth = $('#socialDiv').width();

    angular.element($window).bind('resize', function(){
      $('.fb-comments iframe,.fb-comments span:first-child').css({'width':$('#socialDiv').width()});
    });
  });
