'use strict';

(() => {
  let app = angular.module('bifrost');

  app.controller('ProjectsController', ($scope, Supporter, Project) => {
    $scope.userLoaded = false;
    Supporter.getCurrent().$promise.then(function(user) {
      $scope.userLoaded = true;
      $scope.user = user;
    }).catch(() => $scope.userLoaded = true);

    Project.find({include: ['supporter']}).$promise.then(projects => {
      $scope.projects = projects;
      $scope.$emit('projects', projects);
    });
  });

  app.controller('MyProjectsController',
  ($scope, $state, $mdSidenav, async, Supporter, Project) => {
    async.series([
      callback => {
        Supporter.getCurrent().$promise.then(user => {
          $scope.user = user;
          callback();
        });
      },
      callback => {
        Supporter.projects({id: $scope.user.id}).$promise.then(projects => {
          $scope.projects = projects;
          callback();
        });
      }
    ]);

    $scope.toggleRight = () => {
      $mdSidenav('right')
      .toggle();
    };

    $scope.logout = () => {
      Supporter.logout().$promise.then(() => $state.go('login'));
    };
  });

})();
