var async = require('async');
var colors = require('colors');

module.exports = function(app, done) {

  var tasks = [
    function(callback) {
      app.models.supporter.create([
        {
          email: 'chialin.shr@gmail.com',
          password: '1234',
          lastName: 'shih',firstName: 'chialin'
        },
        {
          email: 'yurenju@gmail.com',
          password: '1234',
          lastName: 'Ju',firstName: 'Yuren'
        }
      ], function(err) {
        if (err) throw err;
        console.log('Default users created.'.green);
        callback();
      });
    },
    function(callback) {
      app.models.Project.create([
        {
          'name': '海嘯救災物資需求',
          'description': 'test1',
          'zipcode': '112',
          'city': 'Taipei',
          'district': 'tet',
          'detailAddress': 'Taipei',
          'contactName': '徐肇瑄',
          'contactEmail': 'shih@example.com',
          'contactPhone':'0911111111',
          'ownerId': 1
        },
        {'name': '地牛大翻身物資需求',
          'description': 'test2',
          'zipcode': '112',
          'city': 'Taipei',
          'district': 'tet',
          'detailAddress': 'Taipei',
          'contactName': '張俊傑',
          'contactEmail': 'change@example.com',
          'contactPhone':'0921234567',
          'ownerId': 2
        }
      ], function(err) {
        if (err) throw err;

        console.log('Default projects created.'.green);
        callback();
      });
    },
    function(callback) {
      var Provision = app.models.Provision;

      var provisions = [
        {
          'name': '傘', 'unit': '支',
          'shippedQuantity': 5, 'promisedQuantity': 6,
          'totalQuantity': 10,
          'projectId': 1
        },
        {
          'name': '水', 'unit': '箱',
          'shippedQuantity': 5, 'promisedQuantity': 6,
          'totalQuantity': 20,
          'projectId': 1
        },
        {
          'name': '椅子', 'unit': '張',
          'shippedQuantity': 15, 'promisedQuantity': 60,
          'totalQuantity': 100,
          'projectId': 2
        },
        {
          'name': '桌子', 'unit': '張',
          'shippedQuantity': 15, 'promisedQuantity': 20,
          'totalQuantity': 30,
          'projectId': 2
        }
      ];

      Provision.create(provisions, function(err, data) {
        console.log('Default provisions created'.green);
        callback();
      });
    }
  ];

  async.series(tasks, function() {
    done();
  });
};
