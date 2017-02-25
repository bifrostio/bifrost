var async = require('async');

module.exports = function(app, done) {
  var address = {
    zipCode: '106',
    city: '台北市',
    district: '大安區',
    detail: '新生南路二段1號'
  };

  var contacts = [
    {
      name: '林雅晴',
      email: 'lin@example.com',
      phone: '029389384',
      _address: address
    }
  ];

  if (process.env.NODE_ENV !== 'production') {
    app.models.Station.find((err, stations) => {
      var tasks = stations.map((station, i) => function(callback) {
        station.contacts.create(contacts[i], callback);
      });
      async.series(tasks, done);
    });
  }
  else {
    done();
  }
};
