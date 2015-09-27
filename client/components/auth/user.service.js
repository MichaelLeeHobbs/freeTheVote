'use strict';

angular.module('freeTheVoteApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        updateRole: {
          method: 'PUT',
          params: {
            controller: 'updateRole'
          }
        },
        get:            {
          method: 'GET',
          params: {
            id: 'me'
          }
        }
      });
  });
