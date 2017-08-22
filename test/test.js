/*!
 * glob-object <https://github.com/jonschlinkert/glob-object>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var glob = require('..');

var fixture = {
  a: {
    b: {
      c: 'd',
      e: 'f',
      g: 'h',
      i: {j: 'k'},
      l: {g: 'k'}
    },
    i: 'j'
  }
};

describe('glob', function() {
  it('should match properties using wildcards:', function() {
    assert.deepEqual(glob('a.*', fixture), fixture);
  });

  it('should match properties using negation patterns:', function() {
    assert.deepEqual(glob('!a', fixture), {});
    assert.deepEqual(glob(['!a', 'a.b.c'], {a: {b: 'c', d: 'e'}}), {});
    assert.deepEqual(glob(['*', '!a.*'], {a: {b: 'c', d: 'e'}}), {a: {}});
    assert.deepEqual(glob(['*', '!a.b.[g-l]'], fixture), {
      a: {
        b: {
          c: 'd',
          e: 'f'
        },
        i: 'j'
      }
    });
  });

  it('should match properties using multiple negation patterns:', function() {
    var obj = {a: 'a', b: 'b', c: 'c', d: 'd'};

    assert.deepEqual(glob(['*', '!a', '!b', '!c'], obj), {d: 'd'});
    assert.deepEqual(glob(['*', '!a', '!c', '!d'], obj), {b: 'b'});
    assert.deepEqual(glob(['*', '!a', '!b', '!c', '!d'], obj), {});
  });

  it('should match properties using braces:', function() {
    assert.deepEqual(glob('*.{b,i}', fixture), fixture);
    assert.deepEqual(glob('a.*.{c,e}', fixture), {a: {b: {c: 'd', e: 'f'}}});
  });

  it('should match a nested property using a wildcard:', function() {
    assert.deepEqual(glob('a.*.g', fixture), {a: {b: {g: 'h'}}});
  });

  it('should match deep properties using globstars', function() {
    assert.deepEqual(glob('a.**.g', fixture), {a: {b: {g: 'h', l: {g: 'k'}}}});
  });
});
