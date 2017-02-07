'use strict';

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const config = require('config');

var prettyStdOut = process.stdout;
var prettyErrOut = process.stderr;
var streamType = 'stream';
if (config.env !== 'production') {
  prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);
  prettyErrOut = new PrettyStream();
  prettyErrOut.pipe(process.stderr);
  streamType = 'raw';
}

var log = bunyan.createLogger({
  name: config.appName,
  streams: [{
    level: 'debug',
    type: streamType,
    stream: prettyStdOut
  }, {
    level: 'error',
    type: streamType,
    stream: prettyErrOut
  }]
});

module.exports = log;
