define([
  'intern/chai!expect',
  'intern!bdd',
  'intern/order!vendor/vendor',
  'intern/order!vendor/angular-mocks/angular-mocks',
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
