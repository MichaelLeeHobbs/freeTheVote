'use strict';

angular.module('freeTheVoteApp')
  .controller('CreateCtrl', function ($http, Auth, $location) {
    var self = this;

    self.poll         = {};
    self.poll.name    = '';
    self.poll.title   = '';
    self.poll.options = [];
    self.poll.votes   = [];
    self.poll.ownerId = Auth.getCurrentUser()._id;

    self.options       = {};
    self.options.count = 0;
    // add a new option to the poll
    self.options.add = function (index) {
      if (index > -1) {
        self.poll.options.splice(index, 0, '');
        self.poll.votes.push(0);
        self.options.count = self.poll.options.length;
      }
    };
    // removes the last option if the number of options is > 2 as a poll must have at least two options
    self.options.remove = function (index) {
      if (self.poll.options.length > 2 && index > -1) {
        self.poll.options.splice(index, 1);
        self.poll.votes.pop();
        self.options.count = self.poll.options.length;
      }
    };

    // create two options for a new poll
    self.options.add(0);
    self.options.add(0);

    console.log(self);

    // todo prevent duplicate options
    self.submit = function (form) {
      console.log('submitted');
      self.submitted = true;
      if (form.$valid) {
        $http.post('/api/polls/', self.poll)
          .then(function (res) {
            $location.path( '/poll/' + res.data._id + '/polls' );
            console.log(res);
          }).catch(function (err) {
            console.log('error: ' + err);
          });
      }
    };

  });
