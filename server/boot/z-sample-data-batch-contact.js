var async = require('async');

module.exports = function(app, done) {
  var contacts = [
    {
      name: '林雅晴',
      email: 'lin@example.com',
      phone: '029389384'
    },
    {
      name: '黃信易',
      email: 'huang@example.com',
      phone: '029192837'
    }
  ];

  app.models.Batch.find((err, batches) => {
    var tasks = batches.map((batch, i) => function(callback) {
      batch.contact.create(contacts[i], callback);
    });
    async.series(tasks, done);
  });
};
