'use strict';

// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

const database = require("../database");
import getApis from './seedData';
import config from 'config';
import log from '../../logger';

export default function seedDatabase() {
  if (!config.database.seedDb) {
    log.info("Database seeding disabled");
    return;
  }
  database.getDb()
    .then((db) => {
      seedApis(db);
    })
    .catch((err) => {
      log.error(`Failed to seed database. Error opening connection: ${err}`);
    });
}

const seedApis = (db) => {
  db.apis.count((err, count) => {
    if(err) {
      log.error(`Failed to seed api's into database. Error getting count: ${err}`);
    } else {
      if(count === 0) {
        const numSeeds = config.database.seedCount;
        log.info(`Seeding ${numSeeds} api's in the database...`);

        getApis(numSeeds).forEach((item) => {
          db.apis.insert(item, (err) => {
            if(err) {
              log.error(`Error whilst inserting api ${item.id}: ${err}`);
            }
          });
        });

        db.apis.count((err, count) => {
          if(err) {
            log.error("Error retrieving number of inserted api's");
          } else {
            log.info(`${count} api's inserted`);
          }
        });
        log.info("Seeding api's complete");
      } else {
        log.info("Database already seeded with api's");
      }
    }
  });
};

