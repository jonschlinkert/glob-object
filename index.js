/*!
 * glob-object <https://github.com/jonschlinkert/glob-object>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var stringify = require('stringify-keys');
var unique = require('array-unique');
var clone = require('clone-deep');
var unset = require('unset-value');
var get = require('get-value');
var set = require('set-value');
var mm = require('micromatch');

function globObject(patterns, obj, options) {
  var cloned = clone(obj);
  var paths = stringify(obj, '/');
  var filtered = {}

  arrayify(patterns).forEach(function(pattern) {
    if (pattern.charAt(0) !== '!') {
      mm(paths, toSlashes(pattern), options).forEach(function(path) {
        var key = toDots(path)
        set(filtered, key, get(cloned, key));
      })
    } else {
      mm(paths, toSlashes(pattern).slice(1), options).forEach(function(path) {
        var key = toDots(path)
        unset(filtered, key);
      });
    }
  })

  return filtered
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
 * Expose `globObject`
 */

module.exports = globObject;
