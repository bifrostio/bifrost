'use strict';

/* global L */

(() => {
  let app = angular.module('bifrost');

  app.controller('MapController', ($scope, $rootScope, $timeout, $http,
                                           addressResolver, leafletData,
                                           feedService, Alert, async) => {
    $scope.defaults = {
      tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoomControlPosition: 'bottomright',
      detectRetina: true
    };
    $scope.markers = {};
    let entries, map;

    async.series([
      done => {
        feedService.parseFeed('https://alerts.ncdr.nat.gov.tw/RssAtomFeed.ashx')
        .then(res => {
          entries = res.data.responseData.feed.entries;
          done();
        });
      },
      done => {
        leafletData.getMap().then(resMap => {
          map = resMap;
          done();
        });
      }
    ], function() {
      entries.forEach(f => {
        Alert.get({url: f.link}).$promise.then(cap => {
          let [info, description, location] =
            [cap.alert.info[0], info.description[0], info.area[0].circle[0]];
          let circle = /(.*,.*) .*/g.exec(location)[1].split(',');

          L.circle(circle, 1000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
          }).addTo(map).bindPopup(description);
        });
      });
    });

    function setupMaxBounds(data) {
      let bounds = data.results[0].geometry.bounds ||
        data.results[0].geometry.viewport;
      let offset = (bounds.northeast.lng - bounds.southwest.lng) / 4;
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
      $timeout(() => $scope.maxbounds = {});

    }

    $scope.maxbounds = {};
    addressResolver('台灣').then(data => setupMaxBounds(data));

    $rootScope.$on('projects', (type, projects) => {
      let markers = {};
      let latitudeArray = [];
      let minLng = {longitude: 180};
      let maxLng = {longitude: -180};
      projects.forEach((p, index) => {
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
            message: p.description ?  p.name + ' - ' + p.description : p.name,
          }
        };
        let point = L.latLng(p.latitude, p.longitude);
        latitudeArray.push(point);
      });

      if (projects.length > 1) {
        let additionPoint = L.latLng(minLng.latitude,
          (minLng.longitude - (maxLng.longitude - minLng.longitude)));
        latitudeArray.push(additionPoint);
      }

      $scope.markers = markers;
      leafletData.getMap().then(map => {
        let bounds = new L.LatLngBounds(latitudeArray);
        map.fitBounds(bounds);
      });
    });

    $rootScope.$on('address', (event, data) => {
      $scope.center = {};
      setupMaxBounds(data);
      $scope.markers.mainMaker = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };
    });
  });
})();
