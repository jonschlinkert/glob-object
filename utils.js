'use strict';

/**
 * Expose lazily required module dependecies as `utils` methods
 */

module.exports = function(fn) {
  var lazy = require('lazy-cache')(fn);
  lazy('stringify-keys', 'stringify');
  lazy('kind-of', 'typeOf');
  lazy('get-value', 'get');
  lazy('set-value', 'set');
  lazy('micromatch', 'mm');
  return lazy;
};
