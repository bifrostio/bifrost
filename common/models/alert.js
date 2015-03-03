module.exports = function(Alert) {
  var request = require('request');
  var parseString = require('xml2js').parseString;

  Alert.get = function(url, cb) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        parseString(body, function(err, result) {
          if (err) {
            return cb(err);
          }
          cb(null, result);
        });
      } else {
        cb(error);
      }
    });
  };

  Alert.remoteMethod('get', {
    accepts: { arg: 'url', type: 'string' },
    returns: { arg: 'cap', type: 'object', root: true},
    http: {path: '/get', verb: 'get'}
  });
};
