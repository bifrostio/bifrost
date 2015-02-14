'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('ProjectsController', function($scope, Supporter, Project) {

    Project.find({include: ['supporter']}).$promise.then(function(projects) {
      $scope.projects = projects;
      $scope.$emit('projects', projects);
    });
  })
  .controller('MyProjectsController',
  function($scope, $mdSidenav, async, Supporter, Project) {
    async.series([
      function(callback) {
        Supporter.getCurrent().$promise.then(function(user) {
          $scope.user = user;
          callback();
        });
      },
      function(callback) {
        Supporter.projects({id: $scope.user.id})
        .$promise.then(function(projects) {
          $scope.projects = projects;
          callback();
        });
      }
    ]);

    $scope.toggleRight = function() {
      $mdSidenav('right')
      .toggle()
      .then(function(){});
    };
  });

})();
