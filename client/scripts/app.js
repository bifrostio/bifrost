'use strict';

(function() {
  angular.module('bifrost',[
    'ui.router',
    'lbServices',
    'leaflet-directive',
    'ngMaterial'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html'
      })
      .state('login', {
        url: '/login'
      })
      .state('project', {
        url: '/projects/:id'
      })
      .state('create', {
        url: '/create'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html'
      }).state('login', {
        url: '/login',
        templateUrl: 'views/login.html'
      });

    $urlRouterProvider.otherwise('/');
  });
})();
