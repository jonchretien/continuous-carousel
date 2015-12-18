/**
 * Gets correct vendor prefix.
 * http://davidwalsh.name/css-animation-callback
 *
 * @param {Object} transitions - Dictionary of prefixed transitions.
 * @returns {String}
 * @api public
 */
const getVendorPrefix = (transitions) => {
  const el = document.createElement('div');

  for (const key in transitions) {
    if (transitions.hasOwnProperty(key)) {
      if (el.style[key] !== undefined) {
        return transitions[key];
      }
    }
  }
};

export default getVendorPrefix;
