'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('SignupController', function($scope, $state, Supporter) {
    $scope.user = {};

    $scope.createUser = function() {
      Supporter.create($scope.user).$promise.then(function() {
        Supporter.login($scope.user).$promise.then(function() {
          $state.go('projects');
        });
      });
    };
  });
})();

