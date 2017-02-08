'use strict';

// ADD Your local config to the .env file in the project root

require('dotenv').config();

export default {
  appName: 'rancher-jenkins-sample-api',
  appDisplay: 'Rancher, Jenkins and Docker Sample API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  host: 'localhost',
  loggingLevel: 'info',
  database: {
    mongo: process.env.MONGO_HOST,
    seedDb: process.env.MONGO_SEED || false,
    seedCount: process.env.MONGO_SEED || 0
  },
  configEnv: process.env.CONFIG_ENV || "default"
}
