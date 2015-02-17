require('shelljs/global');
var path = require('path');

/* global cat */

var serverPath = path.join(__dirname, '..', 'server');
var templatePath = path.join(serverPath, 'datasources.production.template');
var dsPath = path.join(serverPath, 'datasources.production.json');

var template = cat(templatePath);

var fields = ['DBHOST', 'DBNAME', 'DBUSER', 'DBPASSWORD', 'STORAGEACCOUNT',
              'STORAGEKEY'];

fields.forEach(function(f) {
  if (process.env[f]) {
    template = template.replace('<' + f + '>', process.env[f]);
  }
});

template.to(dsPath);
