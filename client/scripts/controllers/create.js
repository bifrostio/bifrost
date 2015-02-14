'use strict';

(function() {
  var app = angular.module('bifrost');

  var controller = function($scope, $state, $http, async, FileUploader, Project,
                            Provision, Supporter, addressResolver) {
    $scope.$emit('projects', []);
    $scope.project = {
      name: '未命名專案'
    };
    $scope.provisions = [{
      shippedQuantity: 0,
      promisedQuantity: 0
    }];
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

    $scope.checkMap = function() {
      var address = [$scope.project.city, $scope.project.district,
        $scope.project.detailAddress].join('');
      if (address.length !== 0) {
        addressResolver(address).then(function(data) {
          var location = data.results[0].geometry.location;
          $scope.project.latitude = location.lat;
          $scope.project.longitude = location.lng;
          $scope.$emit('address', data);
        });
      }
    };

    $scope.create = function() {
      async.series([
        function(callback) {
          Supporter.getCurrent().$promise.then(function(user) {
            $scope.user = user;
            callback();
          });
        },
        function(callback) {
          Supporter.projects.create({id: $scope.user.id}, $scope.project)
          .$promise.then(function(project) {
            $scope.project = project;
            callback();
          });
        },
        function(callback) {
          var tasks = $scope.provisions.map(function(p) {
            return function(callback) {
              Project.provisions.create({id: $scope.project.id}, p)
              .$promise.then(function() {
                callback();
              });
            };
          });
          async.series(tasks, function() {
            callback();
          });
        }
      ], function() {
        $state.go('project', {id: $scope.project.id});
      });
    };
  };

  app.controller('CreateController', controller);
})();
