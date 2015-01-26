'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('SignupController', function($scope, $state, User) {
    $scope.user = {};

    $scope.createUser = function() {
      User.create($scope.user).$promise.then(function() {
        User.login($scope.user).$promise.then(function() {
          $state.go('project');
        });
      });
    };
  });
})();

