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
        url: '/projects/:id',
        templateUrl: 'views/project.html',
        controller: 'ProjectController'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'views/create.html',
        controller: 'CreateController'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController'
      }).state('login', {
        url: '/login',
        templateUrl: 'views/login.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .run(function($rootScope, $location, Supporter) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Supporter.getCurrent().$promise
      .then(function(user) {
        if (!user) {
          $location.url('/login');
        }
      })
      .catch(function() {
        $location.url('/login');
      });
    });
  });
})();
