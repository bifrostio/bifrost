'use struct';

(() => {
  let app = angular.module('bifrost');

  app.controller('UpdateController', ($scope, $state, Project, Batch,
    Provision, DonatedProvision, LxDialogService, LxNotificationService,
    async) => {
      let filter = {
        where: {id: $state.params.projectId},
        include: ['batches']
      };

      Project.findOne({filter: filter}).$promise.then(project => {
        $scope.project = project;
      });

      $scope.opendDialog = (dialogId, id) => {
        let filter = {
          where: {id: id},
          include: ['donatedProvisions']
        };

        Batch.findOne({filter: filter}).$promise.then(batch => {
          $scope.batch = batch;
          angular.forEach(batch.donatedProvisions, (dp, index) => {

            Provision.findById({id:dp.provisionId})
            .$promise.then(provision => dp.provision = provision);
          });
        });

        LxDialogService.open(dialogId);
      };

      $scope.gotAll = id => {
        let filter = {
          filter: {
            where: {id: id}
          }
        };

        DonatedProvision.findOne(filter)
        .$promise.then(donatedProvision => {
          angular.forEach($scope.batch.donatedProvisions, (dp, index) => {
            if (id === dp.id) {
              dp.shippedQuantity = donatedProvision.promisedQuantity;
            }
          });
        });
      };

      $scope.save = () => {
        let donatedProvisions = $scope.batch.donatedProvisions;
        let tasks = donatedProvisions.map((dpWithProvision, index) => {
          let dp = angular.copy(dpWithProvision);
          delete dp.provision;

          return callback => {
            DonatedProvision.update({where: {id: dpWithProvision.id}}, dp)
            .$promise.then(() => callback());
          };
        });

        async.series(tasks, () => {
          $scope.batch.donatedProvisions.forEach((dp, index) => {
            let shippedQuantity = 0;
            let filter = {
              filter: {
                where: {provisionId: dp.provisionId}
              }
            };
            let provision = dp.provision;

            DonatedProvision.find(filter)
            .$promise.then(dps => {
              angular.forEach(dps, (value, index) =>{
                shippedQuantity += value.shippedQuantity;
              });

              filter = {where: {id: dp.provisionId}};
              provision.shippedQuantity = shippedQuantity;
              console.log('provision.shippedQuantity:' +
                provision.shippedQuantity);
              Provision.update(filter, provision).$promise.then(() => {
                LxNotificationService.success('資料儲存成功!');
              });

            }).catch(error => LxNotificationService.error('資料儲存失敗!!'));
          });
        });
      };
    });
})();
