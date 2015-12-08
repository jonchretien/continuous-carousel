'use strict';

/**
 * Gets correct vendor prefix.
 * http://davidwalsh.name/css-animation-callback
 *
 * @param {Object} transitions - Dictionary of prefixed transitions.
 * @returns {String}
 * @api public
 */
export function getVendorPrefix(transitions) {
  let el = document.createElement('div');

  for (let key in transitions) {
    if (transitions.hasOwnProperty(key)) {
      if (el.style[key] !== undefined) {
        return transitions[key];
      }
    }
  }
};
