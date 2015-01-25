'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('MapController', function($scope) {
    $scope.defaults = {
      tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoomControlPosition: 'bottomright',
      maxZoom: 14,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      }
    };
    $scope.center = {
      lat: 51.505,
      lng: -0.09,
      zoom: 8
    };
  });
})();
