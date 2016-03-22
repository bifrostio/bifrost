var async = require('async');

module.exports = function(app, done) {
  var stations = [
    {
      name: '大安森林公園災民收容所',
      latitude: 25.030466,
      longitude: 121.535794
    }
  ];

  var where = {where: {name: '大安森林公園重大災害演習'}};

  app.models.Project.findOne(where, (err, project) => {
    var tasks = stations.map(station => cb => project.stations.create(station, cb));
    async.series(tasks, done);
  });
};
