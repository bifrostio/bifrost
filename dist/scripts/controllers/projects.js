"use strict";

(function () {
  var app = angular.module("bifrost");

  app.controller("ProjectsController", function ($scope, Supporter, Project) {
    $scope.userLoaded = false;
    Supporter.getCurrent().$promise.then(function (user) {
      $scope.userLoaded = true;
      $scope.user = user;
    })["catch"](function () {
      return $scope.userLoaded = true;
    });

    Project.find({ include: ["supporter"] }).$promise.then(function (projects) {
      $scope.projects = projects;
      $scope.$emit("projects", projects);
    });
  });

  app.controller("MyProjectsController", function ($scope, $state, $mdSidenav, async, Supporter, Project) {
    async.series([function (callback) {
      Supporter.getCurrent().$promise.then(function (user) {
        $scope.user = user;
        callback();
      });
    }, function (callback) {
      Supporter.projects({ id: $scope.user.id }).$promise.then(function (projects) {
        $scope.projects = projects;
        callback();
      });
    }]);

    $scope.toggleRight = function () {
      $mdSidenav("right").toggle();
    };

    $scope.logout = function () {
      Supporter.logout().$promise.then(function () {
        return $state.go("login");
      });
    };
  });
})();