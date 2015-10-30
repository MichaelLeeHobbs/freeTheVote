'use strict';
(function () {

  function MainController($scope, $http, Auth) {
    var self           = this;
    this.awesomeThings = [];

    $http.get('/api/things').then(function (response) {
      self.awesomeThings = response.data;
    });

    $scope.isLoggedIn = Auth.isLoggedIn;
  }


  angular.module('freeTheVoteApp')
    .controller('MainController', MainController);

})();
