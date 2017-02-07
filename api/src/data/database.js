'use strict';

import mongo from 'mongodb';
const mongoClient = mongo.MongoClient;
import config from 'config';
import log from '../logger';

let database = null;

module.exports.getDb = () => {
  return new Promise((resolve, reject) => {
    if(!database) {
      mongoClient.connect(config.database.mongo, (err, db) => {
        if(err) {
          console.log(err);
          reject(err);
        } else {
          database = {
            db: db,
            apis: db.collection("apis")
          };
          log.info(`Connected to ${config.database.mongo}`);
          resolve(database);
        }
      });
    } else {
      resolve(database);
    }
  });
};
