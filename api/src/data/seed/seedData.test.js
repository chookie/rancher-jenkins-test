'use strict';

import expect from 'expect';
import getApis from './seedData'

describe('seedData', () => {
  it('getApis returns api objects', () => {
    // arrange
    const num = 5;

    // act
    const result = getApis(num);

    // assert
    expect(result.length).toEqual(num);
    expect(result[0].id.length).toBeGreaterThan(10);
    expect(['graphql','rest']).toContain(result[0].type);
  })
});
