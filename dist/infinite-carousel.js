/*!
 * Infinite Carousel v0.1.0
 * Timed infinite carousel that uses vanilla JavaScript & CSS animations.
 *
 * @license Released under the MIT license.
 * @copyright 2015 Jon Chretien
 */

(function() {

  'use strict';

  /**
   * Vendor prefixes.
   * @type {Object}
   */
  var CSS_VENDOR_PREFIX = {
    TRANSFORM: {
      'transform': 'transform',
      'WebkitTransform': 'webkitTransform'
    },
    TRANSITION_END: {
      'transition': 'transitionend',
      'MSTransitionEnd': 'msTransitionEnd',
      'OTransition': 'oTransitionEnd',
      'WebkitTransition': 'webkitTransitionEnd'
    }
  };


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


  /**
   * Infinite Carousel Class
   *
   * @constructor
   * @param {String} element - Selector for scroll container.
   * @param {String} direction - Horizontal vs vertical scrolling.
   * @param {Number} numVisible - The number of items visible at once.
   * @param {Object} [options] - Optional options object passed in by constructor.
   */
  function InfiniteCarousel(element, direction, numVisible, options) {
    // check for errors
    if (!element || typeof(element) !== 'string') {
      throw new Error('Auto Scroller requires a selector.');
    }

    if (!direction || typeof(direction) !== 'string') {
      throw new Error('Auto Scroller requires a direction.');
    }

    if (!numVisible || typeof(numVisible) !== 'number') {
      throw new Error('numVisible argument must be number.');
    }

    // assign variables
    this.container = document.querySelector(element);
    this.direction = direction;
    this.items = this.container.children;
    this.firstItem = this.items[0];
    this.numItems = this.items.length;
    this.numVisible = numVisible;
    this.options = Utils.extend(this.defaults, options);
    this.pos = 0;
    this.isBypassingTimer = false;
    this.isReadyToReset = false;
    this.scrollingDistance = null;
    this.timerDuration = this.options.timerDuration;
    this.transformEvent = Utils.getVendorPrefix(CSS_VENDOR_PREFIX.TRANSFORM);
    this.transitionDuration = this.options.transitionDuration;
    this.transitionEndEvent = Utils.getVendorPrefix(CSS_VENDOR_PREFIX.TRANSITION_END);
    this.TRANSITION_DURATION_RESET = '0.001s';

    // kick off logic
    this._init();
  }

  /**
   * App defaults.
   * @type {Object}
   */
  InfiniteCarousel.prototype.defaults = {
    timerDuration: 2000,
    transitionDuration: '1s'
  };

  /**
   * Initialize logic.
   *
   * @api private
   */
  InfiniteCarousel.prototype._init = function() {
    if (this.direction === 'vertical') {
      this._setContainerAttributes('data-top', 'margin-bottom');
    }

    if (this.direction === 'horizontal') {
      this._setContainerAttributes('data-left', 'margin-right');
    }

    Utils.cloneNodes(this.items, this.numVisible, this.container);
    this._attachEvents();
    this._setTimer();
  };

  /**
   * Set container attributes for scrolling.
   *
   * @param {String} position - The data attribute to add to the container.
   * @param {String} style - The target computed style.
   * @api private
   */
  InfiniteCarousel.prototype._setContainerAttributes = function(position, style) {
    this.container.setAttribute(position, this.pos);
    var offset = (this.direction === 'vertical') ? this.firstItem.offsetHeight : this.firstItem.offsetWidth;
    this.scrollingDistance = offset + parseInt(getComputedStyle(this.firstItem)[style].slice(0, -2), 10);
    this.endPosition = -(this.scrollingDistance * this.numItems);

    if (this.direction === 'horizontal') {
      this.container.setAttribute('style', 'width: ' + (this.scrollingDistance * (this.numItems + this.numVisible)) + 'px');
    }
  };

  /**
   * Attaches event handlers.
   *
   * @api private
   */
  InfiniteCarousel.prototype._attachEvents = function() {
    this.container.addEventListener(this.transitionEndEvent, this._onTransitionEnd.bind(this), false);
  };

  /**
   * Handles transition end events.
   *
   * @param {Object} event - The event triggered.
   * @api private
   */
  InfiniteCarousel.prototype._onTransitionEnd = function(event) {
    if (event.target === event.currentTarget) {
      if (this.isBypassingTimer) {
        this.isBypassingTimer = false;
        this._animateContainer();
        return;
      }

      this._monitorScrollPosition();
      this.container.addEventListener(this.transitionEndEvent, this._removeEventHandlers.bind(this));
    }
  };

  /**
   * Removes event listeners.
   *
   * @api private
   */
  InfiniteCarousel.prototype._removeEventHandlers = function() {
    this.container.removeEventListener(this.transitionEndEvent, this._removeEventHandlers.bind(this));
  };

  /**
   * Sets the timer which triggers the animation.
   *
   * @api private
   */
  InfiniteCarousel.prototype._setTimer = function() {
    setTimeout(function() {
      this._animateContainer();
    }.bind(this), this.timerDuration);
  };

  /**
   * Animates the carousel container.
   *
   * @api private
   */
  InfiniteCarousel.prototype._animateContainer = function() {
    // normal animation
    if (!this.isReadyToReset) {
      this.pos = this.pos - this.scrollingDistance;
      this.container.style.transitionDuration = this.transitionDuration;
    }

    // reset container position & bypass timer
    if (this.isReadyToReset) {
      this.isReadyToReset = false;
      this.isBypassingTimer = true;
      this.pos = 0;
      this.container.style.transitionDuration = this.TRANSITION_DURATION_RESET;
    }

    var attr = (this.direction === 'vertical') ? 'data-top' : 'data-left';
    this.container.setAttribute(attr, this.pos);

    var translate = (this.direction === 'vertical') ? 'translate3d(0, ' + this.pos + 'px, 0)' : 'translate3d(' + this.pos + 'px, 0, 0)';
    this.container.style[this.transformEvent] = translate;
  };

  /**
   * Monitors the container scroll position,
   * checks to see if we're at the end position.
   *
   * @api private
   */
  InfiniteCarousel.prototype._monitorScrollPosition = function() {
    var currentPosition = (this.direction === 'vertical') ?
                          this.container.getAttribute('data-top') :
                          this.container.getAttribute('data-left');

    // check if we've reached the last scrollable element
    if (parseInt(currentPosition, 10) === this.endPosition) {
      this.isReadyToReset = true;
    }

    this._setTimer();
  };

  /**
   * Expose `InfiniteCarousel`.
   */
  if (typeof define === 'function' && define.amd) {
    define(InfiniteCarousel);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = InfiniteCarousel;
  } else {
    window.InfiniteCarousel = InfiniteCarousel;
  }

})();
