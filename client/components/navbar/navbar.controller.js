'use strict';

angular.module('freeTheVoteApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'View Polls',
      'link': '/polls'
    }];

    var create = {
      'title': 'Create New Poll',
      'link': '/create'
      };
    var aggregate = {
      'title': 'Aggregate View',
      'link': '/aggregate'
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    if ($scope.isLoggedIn()){
      $scope.menu.push(create);
      $scope.menu.push(aggregate);
    }
  });
