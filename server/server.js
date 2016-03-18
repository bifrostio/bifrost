var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var webpackMiddleware = require('webpack-dev-middleware');

var app = module.exports = loopback();
var env = app.get('env');

if (env !== 'production') {
  var webpack = require('webpack');
  var webpackConfig = require('../webpack.config');
  app.use(webpackMiddleware(webpack(webpackConfig), {
    stats: { colors: true}
  }));
  app.use(loopback.static(path.resolve(__dirname, '../client')));
} else {
  app.use(loopback.static(path.resolve(__dirname, '../dist')));
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
