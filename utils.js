'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('get-value', 'get');
require('kind-of', 'typeOf');
require('micromatch', 'mm');
require('set-value', 'set');
require('stringify-keys', 'stringify');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
