'use strict';

/**
 * Utility methods for carousel.
 * @type {Object}
 */
var Utils = {
  /**
   * Merges two objects together.
   *
   * @param {Object} a - Object to merge into.
   * @param {Object} b - Object that gets copied over.
   * @returns {Object}
   * @api public
   */
  extend: function(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  },

  /**
   * Gets correct vendor prefix.
   * http://davidwalsh.name/css-animation-callback
   *
   * @param {Object} transitions - Dictionary of prefixed transitions.
   * @returns {String}
   * @api public
   */
  getVendorPrefix: function(transitions) {
    var el = document.createElement('div');

    for (var key in transitions) {
      if (transitions.hasOwnProperty(key)) {
        if (el.style[key] !== undefined) {
          return transitions[key];
        }
      }
    }
  },

  /**
   * Clones the first x nodes and appends them to a container.
   *
   * @param {Array} items - A list of items to clone.
   * @param {Number} number - The number of items to clone.
   * @param {Object} container - The container to append cloned nodes to.
   * @api public
   */
  cloneNodes: function(items, number, container) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < number; ++i) {
      var node = items[i].cloneNode(true);
      fragment.appendChild(node);
    }

    container.appendChild(fragment);
  }
};
