require('shelljs/global');
var path = require('path');

/* global cat */

module.exports = function() {
  var templatePath = path.join(__dirname, 'datasources.production.template');
  var dsPath = path.join(__dirname, 'datasources.production.json');

  var template = cat(templatePath);

  var fields = ['DBHOST', 'DBNAME', 'DBUSER', 'DBPASSWORD', 'STORAGEACCOUNT',
                'STORAGEKEY'];

  fields.forEach(function(f) {
    if (process.env[f]) {
      template = template.replace('<' + f + '>', process.env[f]);
    }
  });

  template.to(dsPath);
};
