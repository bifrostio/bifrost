var async = require('async');
var log = require('debug')('bifrost:create-sample');

module.exports = function(app, done) {
  log('starting build sample data');
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

  var managers = [
    {
      email: 'chialin.shr@gmail.com',
      password: '1234'
    },
    {
      email: 'yurenju@gmail.com',
      password: '1234'
    }
  ];
  var projects = [
    { name: '八八風災' },
    { name: '大安森林公園重大災害演習' }
  ];
  var batches = [
    { createdDate: new Date(2015, 1, 18), trackingNumber: '5743', stationId: 1 },
    { createdDate: new Date(2015, 2, 21), trackingNumber: '2837', stationId: 1 }
  ];
  var provisions = [
    { name: '桌子', unit: '張', total: 50, description: '類似國小課桌的桌子'},
    { name: '乾糧', unit: '包', total: 100},
    { name: '瓶裝礦泉水', unit: '瓶', total: 200},
    { name: '睡袋', unit: '個', total: 400}
  ];

  app.dataSources.db.automigrate(function() {
    var tasks = [
      callback => app.models.Contact.create(contacts, callback),
      callback => app.models.Manager.create(managers, callback),
      callback => app.models.Project.create(projects, callback),
      callback => app.models.Batch.create(batches, callback),
      callback => app.models.ProvisionRequirement.create(provisions, callback)
    ];

    async.series(tasks, done);
  });


};
