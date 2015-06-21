"use strict";

(function () {
  angular.module("bifrost", ["lumx", "ui.router", "lbServices", "leaflet-directive", "ngMaterial", "angularFileUpload", "ngMessages"]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("signup", {
      url: "/signup",
      templateUrl: "views/main.html"
    }).state("project", {
      url: "/projects/:id",
      templateUrl: "views/project.html",
      controller: "ProjectController"
    }).state("address", {
      url: "/projects/:projectId/batch/:batchId",
      templateUrl: "views/address.html",
      controller: "AddressController"
    }).state("create", {
      url: "/create",
      templateUrl: "views/create.html",
      controller: "CreateController"
    }).state("projects", {
      url: "/projects",
      templateUrl: "views/projects.html",
      controller: "ProjectsController"
    }).state("login", {
      url: "/login",
      templateUrl: "views/login.html"
    }).state("update", {
      url: "/update/:projectId",
      templateUrl: "views/update.html",
      controller: "UpdateController"
    });

    $urlRouterProvider.otherwise("/projects");
  });
})();