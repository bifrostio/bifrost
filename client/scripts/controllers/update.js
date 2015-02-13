'use struct';

(function(){
  var app = angular.module('bifrost');

  app.controller('UpdateController',
    function(
      $scope,
      $state,
      Project,
      Batch,
      Provision,
      DonatedProvision,
      LxDialogService,
      LxNotificationService
    ) {
      var filter = {
        where: {id: $state.params.projectId},
        include: ['batches']
      };

      Project.findOne({filter: filter}).$promise.then(function(project) {
        $scope.project = project;
      });

      this.opendDialog = function(dialogId, id) {
        var filter = {
          where: {id: id},
          include: ['donatedProvisions']
        };

        Batch.findOne({filter: filter}).$promise.then(function(batch) {
          $scope.batch = batch;
          angular.forEach(batch.donatedProvisions, function(dp, index) {

            Provision.findById({id:dp.provisionId})
            .$promise.then(function(provision) {
              dp.provision = provision;
            });
          });
        });

        LxDialogService.open(dialogId);
      };

      this.gotAll = function(id) {
        var filter = {
          filter: {
            where: {id: id}
          }
        };

        DonatedProvision.findOne(filter)
        .$promise.then(function(donatedProvision) {
          angular.forEach($scope.batch.donatedProvisions, function(dp, index) {
            if (id === dp.id) {
              dp.shippedQuantity = donatedProvision.promisedQuantity;
            }
          });
        });
      };

      this.save = function() {
        var tasks = $scope.batch.donatedProvisions.map(function(dpWithProvision, index) {
          var dp = angular.copy(dpWithProvision);
          delete dp.provision;

          return function(callback) {
            DonatedProvision.update({where: {id: dpWithProvision.id}}, dp)
            .$promise.then(function() {
              callback();
            });
          };
        });

        async.series(tasks, function() {
          angular.forEach($scope.batch.donatedProvisions, function(dp, index) {
            var shippedQuantity = 0;
            var filter = {
              filter: {
                where: {provisionId: dp.provisionId}
              }
            };
            var provision = dp.provision;

            DonatedProvision.find(filter)
            .$promise.then(function(dps) {
              angular.forEach(dps, function(value, index){
                shippedQuantity += value.shippedQuantity;
              });

              filter = {where: {id: dp.provisionId}};
              provision.shippedQuantity = shippedQuantity;
              console.log('provision.shippedQuantity:' + provision.shippedQuantity);
              Provision.update(filter, provision).$promise.then(function() {
                LxNotificationService.success('資料儲存成功!');
              });

            }).catch(function(error) {
              LxNotificationService.error('資料儲存失敗!!');
            });
          });
        });
      };
    });
})();
