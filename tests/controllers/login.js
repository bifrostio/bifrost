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

  bdd.describe('Login Controller', function() {
    var ctrl, scope, params, target;

    bdd.beforeEach(inject(function ($controller, $rootScope) {
      target = undefined;
      scope = $rootScope.$new();
      ctrl = $controller('LoginController', { $scope: scope });
      params = {
        $scope: scope,
        $state: { go: function(state) { target = state; }},
        Supporter: {
          login: function() {
            return { '$promise': { then: function(callback) { callback(); }}}
          }
        }
      };
    }));

    bdd.it('should have an empty user object', inject(function($controller) {
      scope.$digest();
      expect(scope.user).to.be.empty;
    }));

    bdd.it('should call $state.go(\'projects\')', inject(function($controller) {
      ctrl = $controller('LoginController', params);
      scope.user = {email: 'test@example.com', password: 'password'};
      scope.login();
      scope.$digest();
      expect(target).to.be.equal('projects');
    }));

    bdd.it('should directly return without calling $state.go()', function() {
      scope.user = {};
      scope.$digest();
      expect(target).to.be.undefined;
    })
  });
});
