'use strict';

module.exports = {
    appName: 'rancher-jenkins-sample-client',
    env: process.env.NODE_ENV || 'development',
    port: process.env.port || 8080,
    host: 'localhost',
    apiUrl: 'http://localhost:8081'
};