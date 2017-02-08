'use strict';

import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import config from '../config';

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

export default bunyan.createLogger({
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
