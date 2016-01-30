var async = require('async');

module.exports = function(app, done) {
  var projects, managers;

  async.series([
    callback => app.models.Manager.find(callback),
    callback => app.models.Project.find(callback)
  ], (err, results) => {
    managers = results[0];
    projects = results[1];

    async.series(managers.map((manager, i) => function(cb) {
      manager.projects.add(projects[i], cb);
    }), done);
  });
};
