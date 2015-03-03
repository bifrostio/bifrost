module.exports = function(Alert) {
  var request = require('request');

  Alert.get = function(url, cb) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        return cb(null, body);
      }
      return cb(error);
    });
  };

  Alert.remoteMethod('get', {
    accepts: { arg: 'url', type: 'string' },
    returns: { arg: 'cap', type: 'string', root: true},
    http: {path: '/get', verb: 'get'}
  });
};
