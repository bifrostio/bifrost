var async = require('async');

module.exports = function(app, done) {
  var stations, provisions;

  async.series([
    callback => app.models.Provision.find(callback),
    callback => app.models.Station.find(callback)
  ], (err, results) => {
    provisions = results[0];
    stations = results[1];

    async.series(provisions.map((provision) => function(cb) {
      app.models.ProvisionQuantity.create({
        total: 100,
        shipped: 50,
        promised: 20,
        stationId: stations[0].id,
        provisionId: provision.id
      }, cb);
    }), done);
  });
};
