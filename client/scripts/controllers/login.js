'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('LoginController', function($scope, $state, User) {
    $scope.user = {};

    this.login = function() {
      if (!$scope.user.email || !$scope.user.password) {
        return;
      }

      User.login($scope.user).$promise.then(function() {
        $state.go('projects');
      });
    };
  });
})();
