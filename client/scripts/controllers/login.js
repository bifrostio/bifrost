'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('LoginController', function($scope, $state, Supporter) {
    $scope.user = {};

    this.login = function() {
      if (!$scope.user.email || !$scope.user.password) {
        return;
      }

      Supporter.login($scope.user).$promise.then(function() {
        $state.go('projects');
      });
    };
  });
})();
