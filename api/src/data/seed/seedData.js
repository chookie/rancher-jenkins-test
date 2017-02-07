'use strict';

import mock from '../graphql/mockResolver';

export default function getApis(count) {
  let apis = [];
  const resolverApi = mock.API();
  for (let i = 0; i < count; i++) {
    let api = {};
    for (let prop in resolverApi) {
      if (prop != 'id') {
        api[prop] = resolverApi[prop]();
      }
    }
    apis.push(api);
  }
  return apis;
}
