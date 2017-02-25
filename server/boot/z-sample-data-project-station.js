var async = require('async');

module.exports = function(app, done) {
  if (process.env.NODE_ENV !== 'production') {
    var stations = [
      {
        name: '緊急安置所（大安森林防災公園）',
        latitude: 25.030466,
        longitude: 121.535794
      }
    ];

    var where = {where: {name: '大安森林公園重大災害演習'}};

    app.models.Project.findOne(where, (err, project) => {
      var tasks = stations.map(station => cb => project.stations.create(station, cb));
      async.series(tasks, done);
    });
  }
  else {
    done();
  }
};
