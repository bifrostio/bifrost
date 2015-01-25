'use strict';

(function() {
  angular.module('bifrost',[
    'ui.router',
    'lbServices'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html'
      });

    $urlRouterProvider.otherwise('main');
  });
})();
