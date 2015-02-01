'use strict';

(function() {
  var app = angular.module('bifrost');

  var controller = function($scope, $state, Project, Batch, async) {
    $scope.explained = false;
    $scope.estimations = ['一週內', '一個月內', '超過一個月'];
    $scope.batch = {
      estimate: $scope.estimations[0]
    };

    var filter = {
      where: {id: $state.params.id},
      include: ['provisions']
    };
    Project.findOne({filter: filter}).$promise.then(function(project) {
      $scope.project = project;
      $scope.donatedProvisions = [];
      angular.forEach($scope.project.provisions, function(p) {
        $scope.donatedProvisions.push({
          shippedQuantity: 0
        });
      });
    });

    $scope.donate = function() {
      $scope.batch.createdDate = Date.now();
      var trackingNumber = [];
      for (var i = 0; i < 4; i++) {
        var digist = parseInt(Math.random() * 10);
        trackingNumber.push(digist.toString());
      }
      $scope.batch.trackingNumber = trackingNumber.join('');
      Batch.create($scope.batch).$promise.then(function(batch) {
        var tasks = $scope.donatedProvisions.map(function(p) {
          return function(callback) {
            Batch.donatedProvisions.create({id: batch.id}, p)
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
