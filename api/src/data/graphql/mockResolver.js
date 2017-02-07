'use strict';

import casual from 'casual-browserify';
import uuid from 'uuid';

module.exports = {
  API: () => ({
    id: () => uuid.v4(),
    name: () => casual.title,
    description: () => casual.description,
    type: () => casual.random_element(['rest', 'graphql']),
    imageUrl: () => casual.url,
    documentionUrl: () => casual.url,
    healthUrl: () => casual.url
  })
}
