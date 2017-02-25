var async = require('async');
var log = require('debug')('bifrost:create-sample-addresses');

module.exports = function(app, done) {
  log('starting build sample data');
  var addresses = [
    {
      zipCode: '106',
      city: '台北市',
      district: '大安區',
      detail: '新生南路二段1號'
    },
    {
      zipCode: '110',
      city: '台北市',
      district: '信義區',
      detail: '信義路五段150巷'
    }
  ];

  if (process.env.NODE_ENV !== 'production') {
    app.models.Contact.find((err, contacts) => {
      log(err, contacts);
      var tasks = contacts.map((c, i) => function(callback) {
        c.address.create(addresses[i], callback);
      });
      async.series(tasks, done);
    });
  }
  else {
    done();
  }
};
