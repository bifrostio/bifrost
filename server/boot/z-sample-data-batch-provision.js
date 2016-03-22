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
        shipped: 20 * (i+1),
        promised: 50 * (i+1),
        batchId: batches[0].id,
        provisionRequirementId: provision.id,
        stationId: 1
      }, cb);
    }), done);
  });
};
