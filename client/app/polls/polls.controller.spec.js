'use strict';

describe('Controller: PollCtrl', function () {

  // load the controller's module
  beforeEach(module('freeTheVoteApp'));

  var PollsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PollsCtrl = $controller('PollsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
