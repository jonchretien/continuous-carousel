'use strict';

/**
 * Vendor prefixes.
 * @type {Object}
 */
const cssVendorPrefix = {
  'transform': {
    'transform': 'transform',
    'WebkitTransform': 'webkitTransform',
  },
  'transitionEnd': {
    'transition': 'transitionend',
    'MSTransitionEnd': 'msTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
  },
};

export default cssVendorPrefix;
