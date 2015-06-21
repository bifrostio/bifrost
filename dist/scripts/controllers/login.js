"use strict";

(function () {
  var app = angular.module("bifrost");

  app.controller("LoginController", function ($scope, $state, Supporter) {
    $scope.user = {};

    $scope.login = function () {
      if (!$scope.user.email || !$scope.user.password) {
        return;
      }
      Supporter.login($scope.user).$promise.then(function () {
        return $state.go("projects");
      });
    };
  });
})();