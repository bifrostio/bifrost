define([
  'intern/chai!expect',
  'intern!bdd',
  'intern/order!vendor/angular/angular',
  'intern/order!vendor/angular-mocks/angular-mocks',
  'intern/order!vendor/angular-resource/angular-resource.js',
  'intern/order!vendor/loopback-services',
  'intern/order!vendor/lumx/dist/js/lumx',
  'intern/order!vendor/angular-ui-router/release/angular-ui-router',
  'intern/order!vendor/angular-aria/angular-aria.js',
  'intern/order!vendor/angular-animate/angular-animate.js',
  'intern/order!vendor/angular-material/angular-material',
  'intern/order!vendor/angular-file-upload/angular-file-upload',
  'intern/order!vendor/angular-leaflet-directive/dist' +
                     '/angular-leaflet-directive',
  'intern/order!vendor/angular-messages/angular-messages',
  'intern/order!vendor/lumx/dist/js/lumx',
  'intern/order!bifrost/all'
], function (expect, bdd) {

  function inject (fn) {
    return function() {
      angular.injector(['ng', 'ngMock', 'bifrost']).invoke(fn);
    };
  }

  bdd.describe('Create Controller', function() {
    var ctrl, scope;

    bdd.it('shoud have a empty user object',
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('LoginController', { $scope: scope });
      scope.$digest();
      expect(scope.user).to.be.empty;
    }));
  });
});
