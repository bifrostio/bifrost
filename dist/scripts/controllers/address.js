"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

(function () {
  var app = angular.module("bifrost");

  var controller = function ($scope, $state, Batch) {
    var params = {
      filter: {
        where: {
          id: $state.params.batchId
        },
        include: ["project"]
      }
    };
    Batch.findOne(params).$promise.then(function (batch) {
      var project = batch.project;
      $scope.address = "" + project.zipcode + " " + project.city + " " + ("" + project.district + " " + project.detailAddress);

      var _ref = [project.contactName, batch.trackingNumber];

      var _ref2 = _slicedToArray(_ref, 2);

      $scope.contactName = _ref2[0];
      $scope.trackingNumber = _ref2[1];
    });
  };

  app.controller("AddressController", controller);
})();