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
      app.models.ProvisionActivity.create({
        shipped: 50 * i,
        promised: 20 * i,
        batchId: batches[0].id,
        provisionRequirementId: provision.id,
        stationId: 1
      }, cb);
    }), done);
  });
};
