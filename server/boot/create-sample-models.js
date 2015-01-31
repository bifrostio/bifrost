var async = require('async');

module.exports = function(app, done) {

  var tasks = [
    function(callback) {
      app.models.user.create([
        {
          email: 'chialin.shr@gmail.com',
          password: '1234',
          lastName: 'shih',firstName: 'chialin'
        },
        {
          email: 'yurenju@gmail.com',
          password: '1234',
          lastName: 'Ju',firstName: 'yuren'
        }
      ], function(err, users) {
        if (err) throw err;
        console.log('Models created: \n', users);
        callback();
      });
    },
    function(callback) {
      app.models.Project.create([
        {
          'name': 'test1 name',
          'description': 'test1',
          'zipcode': '112',
          'city': 'Taipei',
          'district': 'tet',
          'detailAddress': 'Taipei',
          'contactName': 'chialin',
          'contactEmail': 'chialin.shr@gmail.com',
          'contactPhone':'0911111111',
          'ownerId': 1,
          'userId': 1
        },
        {'name': 'test2 name',
          'description': 'test2',
          'zipcode': '112',
          'city': 'Taipei',
          'district': 'tet',
          'detailAddress': 'Taipei',
          'contactName': 'yuren',
          'contactEmail': 'yurenju@gmail.com',
          'contactPhone':'0911111111',
          'ownerId': 2,'userId': 2
        }
      ], function(err, Projects) {
        if (err) throw err;

        console.log('Models created: \n', Projects);
        callback();
      });
    }
  ];

  async.series(tasks, function() {
    done();
  });
};
