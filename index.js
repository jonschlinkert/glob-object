/*!
 * glob-object <https://github.com/jonschlinkert/glob-object>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils')(require);

function globObject(patterns, obj, opts) {
  patterns = arrayify(patterns).map(toSlashes);
  var paths = utils.stringify(obj, '/');
  var matches = utils.mm(paths, patterns, opts);

  return matches.map(toDots)
    .reduce(function(acc, path) {
      utils.set(acc, path, utils.get(obj, path));
      return acc;
    }, {});
}

function toSlashes(key) {
  return key.split('.').join('/');
}

function toDots(key) {
  return key.split('/').join('.');
}

function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}

/**
 * Expose `globObject`
 */

module.exports = globObject;
