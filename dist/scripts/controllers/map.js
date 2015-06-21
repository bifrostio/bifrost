"use strict";

/* global L */

(function () {
  var app = angular.module("bifrost");

  app.controller("MapController", function ($scope, $rootScope, $timeout, $http, addressResolver, leafletData, feedService, Alert, async) {
    $scope.defaults = {
      tileLayer: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoomControlPosition: "bottomright",
      detectRetina: true
    };
    $scope.markers = {};
    var entries = undefined,
        map = undefined;

    async.series([function (done) {
      feedService.parseFeed("https://alerts.ncdr.nat.gov.tw/RssAtomFeed.ashx").then(function (res) {
        entries = res.data.responseData.feed.entries;
        done();
      });
    }, function (done) {
      leafletData.getMap().then(function (resMap) {
        map = resMap;
        done();
      });
    }], function () {
      entries.forEach(function (f) {
        Alert.get({ url: f.link }).$promise.then(function (cap) {
          if (!cap.alert.info[0].area[0].circle) {
            return;
          }
          var info = cap.alert.info[0];
          var description = info.description[0];
          var location = info.area[0].circle[0];

          var circle = /(.*,.*) .*/g.exec(location)[1].split(",");

          L.circle(circle, 1000, {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5
          }).addTo(map).bindPopup(description);
        });
      });
    });

    function setupMaxBounds(data) {
      var bounds = data.results[0].geometry.bounds || data.results[0].geometry.viewport;
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
      $timeout(function () {
        return $scope.maxbounds = {};
      });
    }

    $scope.maxbounds = {};
    addressResolver("台灣").then(function (data) {
      return setupMaxBounds(data);
    });

    $rootScope.$on("projects", function (type, projects) {
      var markers = {};
      var latitudeArray = [];
      var minLng = { longitude: 180 };
      var maxLng = { longitude: -180 };
      projects.forEach(function (p, index) {
        if (p.longitude > maxLng.longitude) {
          maxLng = p;
        }
        if (p.longitude < minLng.longitude) {
          minLng = p;
        }
        markers[index] = {
          lat: p.latitude,
          lng: p.longitude,
          title: p.name,
          label: {
            message: p.description ? p.name + " - " + p.description : p.name }
        };
        var point = L.latLng(p.latitude, p.longitude);
        latitudeArray.push(point);
      });

      if (projects.length > 1) {
        var additionPoint = L.latLng(minLng.latitude, minLng.longitude - (maxLng.longitude - minLng.longitude));
        latitudeArray.push(additionPoint);
      }

      $scope.markers = markers;
      leafletData.getMap().then(function (map) {
        var bounds = new L.LatLngBounds(latitudeArray);
        map.fitBounds(bounds);
      });
    });

    $rootScope.$on("address", function (event, data) {
      $scope.center = {};
      setupMaxBounds(data);
      $scope.markers.mainMaker = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };
    });
  });
})();