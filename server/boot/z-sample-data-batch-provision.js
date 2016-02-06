var async = require('async');

module.exports = function(app, done) {
  var batches, provisions;

  async.series([
    callback => app.models.Provision.find(callback),
    callback => app.models.Batch.find(callback)
  ], (err, results) => {
    provisions = results[0];
    batches = results[1];

    async.series(provisions.map((provision) => function(cb) {
      app.models.ProvisionQuantity.create({
        shipped: 50,
        promised: 20,
        batchId: batches[0].id,
        provisionId: provision.id
      }, cb);
    }), done);
  });
};
