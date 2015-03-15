'use strict';

(() => {
  let app = angular.module('bifrost');

  app.controller('LoginController', ($scope, $state, Supporter) => {
    $scope.user = {};

    this.login = () => {
      if (!$scope.user.email || !$scope.user.password) {
        return;
      }

      Supporter.login($scope.user).$promise.then(() => $state.go('projects'));
    };
  });
})();
