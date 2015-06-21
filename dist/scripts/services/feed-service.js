"use strict";

angular.module("bifrost").factory("feedService", function ($http) {
  return {
    parseFeed: function parseFeed(url) {
      return $http.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=" + encodeURIComponent(url + "?" + new Date().getTime()));
    }
  };
});