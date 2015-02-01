'use strict';

(function() {
  var app = angular.module('bifrost');

  var controller = function($scope, $state, Batch) {
    var params = {
      filter: {
        where: {
          id: $state.params.batchId
        },
        include: ['project']
      }
    };
    Batch.findOne(params).$promise.then(function(batch) {
      var project = batch.project;
      $scope.address = [project.zipcode, project.city, project.district,
        project.detailAddress].join(' ');
      $scope.contactName = project.contactName;
      $scope.trackingNumber = batch.trackingNumber;
    });
  };

  app.controller('AddressController', controller);
})();
