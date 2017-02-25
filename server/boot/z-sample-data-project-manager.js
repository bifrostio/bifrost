var async = require('async');

module.exports = function(app, done) {
  if (process.env.NODE_ENV !== 'production') {
    var projects, users;

    async.series([
      callback => app.models.User.find(callback),
      callback => app.models.Project.find(callback)
    ], (err, results) => {
      users = results[0];
      projects = results[1];

      async.series(users.map((user, i) => function(cb) {
        user.projects.add(projects[i], cb);
      }), done);
    });
  }
  else {
    done();
  }
};
