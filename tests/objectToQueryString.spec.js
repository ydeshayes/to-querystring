/* global expect*/

import { expect } from 'chai';

import toQueryString from '../src';

describe('object-to-querystring tests', () => {
  it('Convert simple object to query string', () => {
    const queryString = toQueryString({
      'test': 'testValue'
    });

    expect(queryString).to.equal('test=testValue');
  });

  it('Convert complex object to query string', () => {
    const queryString = toQueryString({
      'test': 'testValue',
      'test2': ['a', 'b', 'c'],
      'test3': 'testValue2'
    });

    expect(queryString).to.equal('test=testValue&test2=a&test2=b&test2=c&test3=testValue2');
  });

  it('Convert array to query string', () => {
    const queryString = toQueryString(['a', 'b']);

    expect(queryString).to.equal('0=a&1=b');
  });
});
