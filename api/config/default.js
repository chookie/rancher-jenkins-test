'use strict';

// https://github.com/lorenwest/node-config

module.exports = {
  appName: 'rancher-jenkins-sample-api',
  appDisplay: 'Rancher, Jenkins and Docker Sample API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.port || 8081,
  host: 'localhost',
  loggingLevel: 'info',
  database: {
    mongo: process.env.MONGO_URL,
    seedDb: false,
    seedCount: 0
  }
}
