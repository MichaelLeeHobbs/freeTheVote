'use strict';

angular.module('freeTheVoteApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'requireLoggedIn': false
    },{
      'title': 'View Polls',
      'link': '/polls',
      'requireLoggedIn': false
    },{
      'title': 'Create New Poll',
      'link': '/create',
      'requireLoggedIn': true
    },{
      'title': 'Aggregate View',
      'link': '/aggregate',
      'requireLoggedIn': true
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.shouldShow = function(requireLoggedIn) {
      if (!requireLoggedIn) { return true; }
      return $scope.isLoggedIn();
    };

  });
