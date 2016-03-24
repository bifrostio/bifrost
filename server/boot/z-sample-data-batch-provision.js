var async = require('async');

module.exports = function(app, done) {
  var batches, provisions;

  async.series([
    callback => app.models.ProvisionRequirement.find(callback),
    callback => app.models.Batch.find(callback)
  ], (err, results) => {
    provisions = results[0];
    batches = results[1];

    async.series(provisions.map((provision, i) => function(cb) {
      var promised = [100, 100, 100, 10, 0, 20];
      var shipped = [80, 30, 50, 5, 0, 5];
      app.models.ProvisionActivity.create({
        promised: promised[i],
        batchId: batches[0].id,
        provisionRequirementId: provision.id,
        stationId: 1
      }, function() {
        app.models.ProvisionActivity.create({
          shipped: shipped[i],
          batchId: batches[0].id,
          provisionRequirementId: provision.id,
          stationId: 1
        }, cb);
      });
    }), done);
  });
};
