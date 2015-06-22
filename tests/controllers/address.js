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

  bdd.describe('Address Controller', function() {
    var ctrl, scope;

    bdd.it('shoud have address with information detail',
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      var batch = {
          findOne: function(params) {
            return {
              '$promise': {
                then: function(callback) {
                  callback({
                    project: {
                      zipcode: 'zipcode',
                      city: 'city',
                      district: 'district',
                      detailAddress: 'detailAddress',
                      contactName: 'contactName'
                    },
                    trackingNumber: 'trackingNumber'
                  });
                }
              }
            };
          }
        };
      ctrl = $controller('AddressController', {
        $scope: scope,
        $state: { params: { batchId: 'batchId'}},
        Batch: batch
      });
      scope.$digest();
      expect(scope.contactName).to.be.equal('contactName');
      expect(scope.trackingNumber).to.be.equal('trackingNumber');
      expect(scope.address).to.be.equal('zipcode city district detailAddress');
    }));
  });
});
