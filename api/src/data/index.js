'use strict';

import getDb from './database';
import seedDatabase from './seed/databaseSeeder';
import mongodb from 'mongodb';

module.exports.getApis = function (params) {
  return new Promise((resolve, reject) => getDb()
    .catch((err) => {
      reject(err);
    })
    .then((db) => {
      // Hide ID if have yourown id
      // const fieldVisibility = { _id: 1 };
      // Also see data/index API property for remapping name
      let query = {};
      let limit = params.limit ? Number.parseInt(params.limit) : 20;
      try {
        if (params.name) {
          // using reg ex. i = case insensitive
          query.name = new RegExp(params.name, 'i');
        }
        if (params.type) {
          query.type = new RegExp(params.type, 'i');
        }
        if (params.id) {
          query._id = new mongodb.ObjectID(params.id);
        }
      } catch (err) {
        reject(err);
      }
      //db.apis.find(query, fieldVisibility)
      db.apis.find(query)
        .limit(limit)
        .toArray(function (err, reviews) {
          if (err) {
            reject(err);
          } else {
            resolve(reviews);
          }
        });
      // );
    })
  );
};

seedDatabase();
