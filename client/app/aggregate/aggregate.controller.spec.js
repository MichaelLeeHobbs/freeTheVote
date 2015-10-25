'use strict';

describe('Controller: AggregateCtrl', function () {

  // load the controller's module
  beforeEach(module('freeTheVoteApp'));

  var AggregateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AggregateCtrl = $controller('AggregateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
