'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('ProjectsController', function($scope, Project) {
    Project.find().$promise.then(function(projects) {
      $scope.projects = projects;
    });
  });
})();
