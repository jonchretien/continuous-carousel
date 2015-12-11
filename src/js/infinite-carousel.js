'use strict';

import cloneNodes from './clone-nodes';
import CSS_VENDOR_PREFIX from './prefix-config';
import getVendorPrefix from './get-prefixes';

export default class InfiniteCarousel {
  /**
   * @param {String} element - Selector for scroll container.
   * @param {String} direction - Horizontal vs vertical scrolling.
   * @param {Number} numVisible - The number of items visible at once.
   * @param {Object} [options] - Optional options object passed in by constructor.
   */
  constructor(element, direction, numVisible, options) {
    // check for errors
    if (!element || typeof(element) !== 'string') {
      throw new Error('The `element` argument must be a string.');
    }

    if (!direction || typeof(direction) !== 'string') {
      throw new Error('The `direction` argument must be a string.');
    }

    if (!numVisible || typeof(numVisible) !== 'number') {
      throw new Error('The `numVisible` argument must be a number.');
    }

    /**
     * App defaults.
     * @type {Object}
     */
    let defaults = {
      timerDuration: 2000,
      transitionDuration: '1s'
    };

    // assign variables
    this.container = document.querySelector(element);
    this.direction = direction;
    this.items = this.container.children;
    this.firstItem = this.items[0];
    this.numItems = this.items.length;
    this.numVisible = numVisible;
    this.options = Object.assign(defaults, options);
    this.pos = 0;
    this.isBypassingTimer = false;
    this.isReadyToReset = false;
    this.scrollingDistance = null;
    this.timerDuration = this.options.timerDuration;
    this.transformEvent = getVendorPrefix(CSS_VENDOR_PREFIX.TRANSFORM);
    this.transitionDuration = this.options.transitionDuration;
    this.transitionEndEvent = getVendorPrefix(CSS_VENDOR_PREFIX.TRANSITION_END);
    this.TRANSITION_DURATION_RESET = '0.001s';

    // kick off logic
    this._init();
  }

  /**
   * Initialize logic.
   *
   * @api private
   */
  _init() {
    if (this.direction === 'vertical') {
      this._setContainerAttributes('data-top', 'margin-bottom');
    }

    if (this.direction === 'horizontal') {
      this._setContainerAttributes('data-left', 'margin-right');
    }

    cloneNodes(this.items, this.numVisible, this.container);
    this._attachEvents();
    this._setTimer();
  }

  /**
   * Set container attributes for scrolling.
   *
   * @param {String} position - The data attribute to add to the container.
   * @param {String} style - The target computed style.
   * @api private
   */
  _setContainerAttributes(position, style) {
    this.container.setAttribute(position, this.pos);
    let offset = (this.direction === 'vertical') ? this.firstItem.offsetHeight : this.firstItem.offsetWidth;
    this.scrollingDistance = offset + parseInt(getComputedStyle(this.firstItem)[style].slice(0, -2), 10);
    this.endPosition = -(this.scrollingDistance * this.numItems);

    if (this.direction === 'horizontal') {
      this.container.setAttribute('style', `width: ${(this.scrollingDistance * (this.numItems + this.numVisible))}px`);
    }
  }

  /**
   * Attaches event handlers.
   *
   * @api private
   */
  _attachEvents() {
    this.container.addEventListener(this.transitionEndEvent, this._onTransitionEnd.bind(this), false);
  }

  /**
   * Handles transition end events.
   *
   * @param {Object} event - The event triggered.
   * @api private
   */
  _onTransitionEnd(event) {
    if (event.target === event.currentTarget) {
      if (this.isBypassingTimer) {
        this.isBypassingTimer = false;
        this._animateContainer();
        return;
      }

      this._monitorScrollPosition();
      this.container.addEventListener(this.transitionEndEvent, this._removeEventHandlers.bind(this));
    }
  }

  /**
   * Removes event listeners.
   *
   * @api private
   */
  _removeEventHandlers() {
    this.container.removeEventListener(this.transitionEndEvent, this._removeEventHandlers.bind(this));
  }

  /**
   * Sets the timer which triggers the animation.
   *
   * @api private
   */
  _setTimer() {
    setTimeout(() => {
      this._animateContainer();
    }, this.timerDuration);
  }

  /**
   * Animates the carousel container.
   *
   * @api private
   */
  _animateContainer() {
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

    let attr = (this.direction === 'vertical') ? 'data-top' : 'data-left';
    this.container.setAttribute(attr, this.pos);

    let translate = (this.direction === 'vertical') ? `translate3d(0, ${this.pos}px, 0)` : `translate3d(${this.pos}px, 0, 0)`;
    this.container.style[this.transformEvent] = translate;
  }

  /**
   * Monitors the container scroll position,
   * checks to see if we're at the end position.
   *
   * @api private
   */
  _monitorScrollPosition() {
    let currentPosition = (this.direction === 'vertical') ?
                          this.container.getAttribute('data-top') :
                          this.container.getAttribute('data-left');

    // check if we've reached the last scrollable element
    if (parseInt(currentPosition, 10) === this.endPosition) {
      this.isReadyToReset = true;
    }

    this._setTimer();
  }
}
