var async = require('async');

module.exports = function(app, done) {
  var stations = [
    {
      name: '大安收容所',
      latitude: 25.0342587,
      longitude: 121.5351892
    },
    {
      name: '信義收容所',
      latitude: 25.0312664,
      longitude: 121.569068
    }
  ];

  var where = {where: {name: '大安森林公園重大災害演習'}};

  app.models.Project.findOne(where, (err, project) => {
    var tasks = stations.map(station => cb => project.stations.create(station, cb));
    async.series(tasks, done);
  });
};
