'use strict';

(function() {
  var app = angular.module('bifrost');

  var controller = function($scope, async, FileUploader, Project, Provision) {
    $scope.project = {};
    $scope.provisions = [];
    $scope.pos = 0;
    $scope.pages = ['basic', 'provisions', 'detail'];
    $scope.selectedPage = $scope.pages[0];

    var uploader = $scope.uploader = new FileUploader({
      scope: $scope,
      url: '/api/containers/photos/upload',
      formData: {key: 'value'}
    });

    uploader.onAfterAddingFile = function (item) {
      console.info('After adding a file', item);
      item.upload();
    };

    $scope.$watch('pos', function() {
      $scope.selectedPage = $scope.pages[$scope.pos];
    });

    $scope.addProvision = function() {
      $scope.provisions.push({
        shippedQuantity: 0,
        promisedQuantity: 0
      });
    };

    $scope.create = function() {
      Project.create($scope.project).$promise.then(function(project) {
        console.log(project);
        var tasks = $scope.provisions.map(function(p) {
          return function(callback) {
            Project.provisions.create({id: project.id}, p)
            .$promise.then(function() {
              callback();
            });
          };
        });
        async.series(tasks, function() {
          console.log('done');
        });
      });
    };
  };

  app.controller('ProjectController', controller);
})();
