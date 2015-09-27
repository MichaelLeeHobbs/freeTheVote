'use strict';

angular.module('freeTheVoteApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    console.log($scope.users);
    console.log(User);

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      $scope.users.splice(this.$index, 1);
    };
    $scope.setRole = function(user, role) {
      console.log(user._id + ' ' + role);
      //$scope.users[userID] = role;
      User.updateRole({ id: user._id}, {role: role});
      $scope.users[this.$index].role = role;
      //User.remove({ id: user._id });
      //$scope.users.splice(this.$index, 1);
    };
  });
