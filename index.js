/*!
 * glob-object <https://github.com/jonschlinkert/glob-object>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var stringify = require('stringify-keys');
var unique = require('arr-unique');
var clone = require('clone-deep');
var unset = require('unset-value');
var get = require('get-value');
var set = require('set-value');
var mm = require('micromatch');

function globObject(patterns, obj, options) {
  var cloned = clone(obj);
  var keys = stringify(cloned, '/');

  patterns = arrayify(patterns).map(toSlashes);
  var negated = false;

  for (var i = 0; i < patterns.length; i++) {
    var pattern = patterns[i];
    if (pattern.charAt(0) === '!') {
      negated = true;
      patterns.splice(1, i);
      var m = mm(keys, pattern.slice(1), options);
      var len = m.length;
      var idx = -1;
      while (++idx < len) {
        unset(cloned, toDots(m[idx]));
      }
    }
  }

  // re-create keys if any negation patterns were passed
  if (negated) {
    keys = stringify(cloned, '/');
  }

  var matches = mm(keys, patterns, options);

  return matches.reduce(function(acc, path) {
    var key = toDots(path);
    set(acc, key, get(cloned, key));
    return acc;
  }, {});
}

function reducePaths(paths) {
  for (var i = 0; i < paths.length; i++) {
    var key = paths[i];
    var arr = removeElement(paths, key);
    var diff = paths.length - arr.length;
    if (diff > 0) {
      paths = arr;
    }
  }
  return unique(paths).sort();
}

function removeElement(paths, key) {
  var arr = paths.slice();
  var len = arr.length;
  var idx = -1;

  while (++idx < len) {
    var fp = arr[idx];
    if (fp.indexOf(key) === 0 && fp !== key) {
      arr.splice(arr.indexOf(fp), 1);
      len--;
    }
  }
  return arr;
}

function toSlashes(key) {
  return key.split('.').join('/');
}

function toDots(key) {
  return key.split('/').join('.');
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Expose `reducePaths` for unit tests
 */

globObject.reducePaths = reducePaths;

/**
 * Expose `globObject`
 */

module.exports = globObject;
