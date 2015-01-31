'use strict';

(function() {
  angular.module('bifrost',[
    'lumx',
    'ui.router',
    'lbServices',
    'leaflet-directive',
    'ngMaterial',
    'angularFileUpload'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html'
      })
      .state('project', {
        url: '/projects/:id'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'views/create.html',
        controller: 'ProjectController'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html',
      }).state('login', {
        url: '/login',
        templateUrl: 'views/login.html'
      });

    $urlRouterProvider.otherwise('/');
  });
})();
