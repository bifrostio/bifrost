'use strict';

(function() {
  let app = angular.module('bifrost');

  let controller = ($scope, $state, Batch) => {
    let params = {
      filter: {
        where: {
          id: $state.params.batchId
        },
        include: ['project']
      }
    };
    Batch.findOne(params).$promise.then(batch => {
      let project = batch.project;
      $scope.address = `${project.zipcode} ${project.city} ` +
                        `${project.district} ${project.detailAddress}`;

      [$scope.contactName, $scope.trackingNumber] =
        [project.contactName, $scope.trackingNumber = batch.trackingNumber];
    });
  };

  app.controller('AddressController', controller);
})();
