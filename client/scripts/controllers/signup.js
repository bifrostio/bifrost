'use strict';

(() => {
  let app = angular.module('bifrost');

  app.controller('SignupController', ($scope, $state, Supporter) => {
    $scope.user = {};

    $scope.createUser = () => {
      Supporter.create($scope.user).$promise.then(() => {
        Supporter.login($scope.user).$promise.then(() => {
          $state.go('projects');
        });
      });
    };
  });
})();

