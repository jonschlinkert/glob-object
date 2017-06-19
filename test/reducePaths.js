'use strict';

require('mocha');
var assert = require('assert');
var glob = require('..');
var reduce = glob.reducePaths;

describe('reducePaths utility', function() {
  it('should match properties using braces:', function() {
    assert.deepEqual(reduce(['a/a', 'a', 'a/b/c', 'b']), ['a', 'b']);
    assert.deepEqual(reduce(['a/a', 'a', 'a/b/c', 'b/c']), ['a', 'b/c']);
    assert.deepEqual(reduce(['a/a', 'a', 'a/b/c', 'b/c', 'b']), ['a', 'b']);
    assert.deepEqual(reduce(['a/a', 'a', 'a/b/c', 'b/c', 'b', 'b/b/b/']), ['a', 'b']);
    assert.deepEqual(reduce(['b/a/b', 'b/a', 'a/b/c']), ['a/b/c', 'b/a']);
    assert.deepEqual(reduce(['a', 'b/a/b', 'b/a', 'a']), ['a', 'b/a']);
    assert.deepEqual(reduce(['a', 'b/a/b', 'b/a/c', 'a']), ['a', 'b/a/b', 'b/a/c']);
    assert.deepEqual(reduce(['a', 'c', 'b/a', 'a']), ['a', 'b/a', 'c']);
    assert.deepEqual(reduce(['a/a', 'c', 'b/a', 'a']), ['a', 'b/a', 'c']);
  });
});
