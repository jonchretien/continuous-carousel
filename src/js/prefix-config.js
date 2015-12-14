'use strict';

/**
 * Vendor prefixes.
 * @type {Object}
 */
const CSS_VENDOR_PREFIX = {
  TRANSFORM: {
    'transform': 'transform',
    'WebkitTransform': 'webkitTransform',
  },
  TRANSITION_END: {
    'transition': 'transitionend',
    'MSTransitionEnd': 'msTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
  },
};

export { CSS_VENDOR_PREFIX };
