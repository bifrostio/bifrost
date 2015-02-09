'use strict';

(function(){
  var app = angular.module('bifrost');

  app.factory('addressResolver', function($http, $q) {
    var q = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
    return function(address) {
      var deferred = $q.defer();

      $http.get(q + address)
        .success(deferred.resolve)
        .error(deferred.reject);

      return deferred.promise;
    };
  });
})();
