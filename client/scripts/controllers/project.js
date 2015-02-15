'use strict';

(function() {
  var app = angular.module('bifrost');

  var controller = function($scope, $state, Project, Provision, Batch, async,
                            Supporter) {
    $scope.explained = false;
    $scope.estimations = ['一週內', '一個月內', '超過一個月'];
    $scope.batch = {
      estimate: $scope.estimations[0]
    };

    $scope.userLoaded = false;
    Supporter.getCurrent().$promise
    .then(function(user) {
      $scope.user = user;
      $scope.userLoaded = true;
    })
    .catch(function() {
      $scope.userLoaded = true;
    });

    var filter = {
      where: {id: $state.params.id},
      include: ['provisions']
    };
    Project.findOne({filter: filter}).$promise.then(function(project) {
      $scope.project = project;
      $scope.$emit('projects', [project]);
      $scope.donatedProvisions = [];
      angular.forEach($scope.project.provisions, function(p, index) {
        $scope.donatedProvisions.push({
          promisedQuantity: 0,
          shippedQuantity: 0,
          provisionId: project.provisions[index].id
        });
      });
    });

    function updateQuantity(dp, callback) {
      Provision.findById({id: dp.provisionId}).$promise.then(function(p) {
        p.promisedQuantity += dp.promisedQuantity;
        Provision.update({where: {id: p.id}}, p).$promise.then(function() {
          callback();
        });
      });
    }

    $scope.donate = function() {
      $scope.batch.createdDate = Date.now();
      var trackingNumber = [];
      for (var i = 0; i < 4; i++) {
        var digist = parseInt(Math.random() * 10);
        trackingNumber.push(digist.toString());
      }
      $scope.batch.trackingNumber = trackingNumber.join('');
      Project.batches.create({id: $scope.project.id}, $scope.batch)
      .$promise.then(function(batch) {
        var tasks = $scope.donatedProvisions.map(function(p, index) {
          return function(callback) {
            Batch.donatedProvisions.create({id: batch.id}, p)
            .$promise.then(function(dp) {
              updateQuantity(dp, callback);
            });
          };
        });
        async.series(tasks, function() {
          console.log('done');
          $state.go(
            'address',
            { projectId: $scope.project.id, batchId: batch.id }
          );
        });
      });
    };
  };

  app.controller('ProjectController', controller);
})();
