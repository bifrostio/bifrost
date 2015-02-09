'use strict';

(function() {
  var app = angular.module('bifrost');

  app.controller('MapController', function($scope, $rootScope, $timeout,
                                           addressResolver) {
    $scope.defaults = {
      tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoomControlPosition: 'bottomright',
      detectRetina: true
    };
    $scope.markers = {};

    function setupMaxBounds(data) {
      var bounds = data.results[0].geometry.bounds ||
        data.results[0].geometry.viewport;
      var offset = (bounds.northeast.lng - bounds.southwest.lng) / 4;
      $scope.maxbounds = {
        southWest: {
          lat: bounds.southwest.lat,
          lng: bounds.southwest.lng - offset
        },
        northEast: {
          lat: bounds.northeast.lat,
          lng: bounds.northeast.lng - offset
        }
      };
      $timeout(function() {
        $scope.maxbounds = {};
      });

    }

    $scope.maxbounds = {};
    addressResolver('台灣').then(function(data) {
      setupMaxBounds(data);
    });
    $rootScope.$on('address', function(event, data) {
      $scope.center = {};
      console.log(data);
      setupMaxBounds(data);
      $scope.markers.mainMaker = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };
    });
  });
})();
