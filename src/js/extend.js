'use strict';

/**
 * Merges two objects together.
 *
 * @param {Object} a - Object to merge into.
 * @param {Object} b - Object that gets copied over.
 * @returns {Object}
 * @api public
 */
let extend = (a, b) => {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
};

export { extend };
