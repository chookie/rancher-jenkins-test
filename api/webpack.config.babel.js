'use strict';
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
/**
 * The target: 'node' option tells webpack not to touch any built-in modules like fs or path.
 */
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

/**
 * Exclude node_modules from bundle due to issues with binaries etc.
 * The default behaviour of externals assume browser and replaces require with globals.
 * So remove this for node_modules and leave as require
 */
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'backend.js'
  },
  externals: nodeModules,
  plugins: [
    // Ignore css if we are using this for front and back
    new webpack.IgnorePlugin(/\.(css|less|sass)$/),
    // automatically sourcemaps stack traces from node
    new webpack.BannerPlugin('require("source-map-support").install();',
                            { raw: true, entryOnly: false })

  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
