module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('manager', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    var userId = context.accessToken.userId;
    if (context.modelName !== 'project' || !userId) {
      return reject();
    }

    context.model.findById(context.modelId, function(err, project) {
      if (err || !project) {
        return reject();
      }

      project.managers.findById((userId, function(err, user) {
        if (err || !user) {
          return reject();
        }

        return cb(null, true);
      }));
    });
  });
};
