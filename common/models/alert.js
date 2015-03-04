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
    description: '避開 CORS 取得 NCDR 災害示警公開資料平台的 CAP 檔案',
    accepts: {
      arg: 'url', type: 'string',
      description: 'Common Alerting Protocol (CAP) 檔案的網址'
    },
    returns: {
      arg: 'cap', type: 'object', root: true,
      description: '已經轉換成 javascript object 的 cap 檔案內容'
    },
    http: {path: '/get', verb: 'get'}
  });
};
