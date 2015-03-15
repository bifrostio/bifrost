'use strict';

(() => {
  let app = angular.module('bifrost');

  let controller = ($scope, $state, Project, Provision, Batch, async,
                            Supporter) => {
    $scope.explained = false;
    $scope.estimations = ['一週內', '一個月內', '超過一個月'];
    $scope.batch = {
      estimate: $scope.estimations[0]
    };

    $scope.userLoaded = false;
    Supporter.getCurrent().$promise
    .then(user => {
      $scope.user = user;
      $scope.userLoaded = true;
    })
    .catch(() => {
      $scope.userLoaded = true;
    });

    let filter = {
      where: {id: $state.params.id},
      include: ['provisions']
    };
    Project.findOne({filter: filter}).$promise.then(project => {
      $scope.project = project;
      $scope.$emit('projects', [project]);
      $scope.donatedProvisions = [];

      $scope.project.provisions.forEach((p, index) => {
        $scope.donatedProvisions.push({
          promisedQuantity: 0,
          shippedQuantity: 0,
          provisionId: project.provisions[index].id
        });
      });
    });

    function updateQuantity(dp, callback) {
      Provision.findById({id: dp.provisionId}).$promise.then(p => {
        p.promisedQuantity += dp.promisedQuantity;
        Provision.update({where: {id: p.id}}, p)
          .$promise.then(() => callback());
      });
    }

    $scope.donate = () => {
      $scope.batch.createdDate = Date.now();
      let trackingNumber = [];
      for (let i = 0; i < 4; i++) {
        let digist = parseInt(Math.random() * 10);
        trackingNumber.push(digist.toString());
      }
      $scope.batch.trackingNumber = trackingNumber.join('');
      Project.batches.create({id: $scope.project.id}, $scope.batch)
      .$promise.then(batch => {
        let tasks = $scope.donatedProvisions.map((p, index) => {
          return callback => {
            Batch.donatedProvisions.create({id: batch.id}, p)
            .$promise.then(dp => updateQuantity(dp, callback));
          };
        });
        async.series(tasks, () => {
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
