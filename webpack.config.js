var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var VENDOR_LIBS = [
  'debug', 'google-maps', 'isomorphic-fetch', 'leaflet', 'papaparse', 'react',
  'react-bootstrap', 'react-dom', 'react-leaflet', 'react-range',
  'react-router', 'validator'
];

module.exports = {
  entry: {
    bundle: './client/app.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
};
