var async = require('async');

module.exports = function(app, done) {
  var stations, provisions;

  async.series([
    callback => app.models.ProvisionRequirement.find(callback),
    callback => app.models.Station.find(callback)
  ], (err, results) => {
    provisions = results[0];
    stations = results[1];

    async.series(provisions.map((provision) => function(cb) {
      provision.updateAttribute('stationId', stations[0].id, cb);
    }), done);
  });
};
