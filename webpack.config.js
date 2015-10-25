var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/scripts/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0'}
    ]
  },
  resolve: {
    root: [path.resolve(__dirname, 'client/scripts/')]
  }
};
