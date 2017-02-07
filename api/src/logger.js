'use strict';

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const config = require('config');

let prettyStdOut = process.stdout;
let prettyErrOut = process.stderr;
let streamType = 'stream';
if (config.env !== 'production') {
  prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);
  prettyErrOut = new PrettyStream();
  prettyErrOut.pipe(process.stderr);
  streamType = 'raw';
}

const log = bunyan.createLogger({
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
