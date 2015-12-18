import cloneNodes from './clone-nodes';
import prefixConfig from './config-prefix';
import containerConfig from './config-container';
import getVendorPrefix from './get-prefixes';

export default class InfiniteCarousel {
  /**
   * @param {String} element - Selector for scroll container.
   * @param {String} direction - Horizontal vs vertical scrolling.
   * @param {Number} numVisible - The number of items visible at once.
   * @param {Object} [options] - Optional options object passed in by constructor.
   */
  constructor(element, direction, numVisible, options = { timerDuration: 2000, transitionDuration: '1s' }) {
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

    // destructure options
    ({ timerDuration: this.timerDuration, transitionDuration: this.transitionDuration } = options);

    // variable assignment
    this.container = document.querySelector(element);
    this.direction = direction;
    this.items = this.container.children;
    this.firstItem = this.items[0];
    this.numItems = this.items.length;
    this.numVisible = numVisible;
    this.pos = 0;
    this.isBypassingTimer = false;
    this.isReadyToReset = false;
    this.scrollingDistance = null;
    this.transformEvent = getVendorPrefix(prefixConfig.transform);
    this.transitionEndEvent = getVendorPrefix(prefixConfig.transitionEnd);

    // kick off logic
    this._init();
  }

  /**
   * Initialize logic.
   *
   * @api private
   */
  _init() {
    const margin = containerConfig[this.direction].margin;
    const pos = containerConfig[this.direction].pos;

    this._setContainerAttributes(pos, margin);
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
    const offset = (this.direction === 'vertical') ? this.firstItem.offsetHeight : this.firstItem.offsetWidth;
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
      this.container.style.transitionDuration = '0.001s';
    }

    const attr = containerConfig[this.direction].pos;
    this.container.setAttribute(attr, this.pos);

    const translate = (this.direction === 'vertical') ? `translate3d(0, ${this.pos}px, 0)` : `translate3d(${this.pos}px, 0, 0)`;
    this.container.style[this.transformEvent] = translate;
  }

  /**
   * Monitors the container scroll position,
   * checks to see if we're at the end position.
   *
   * @api private
   */
  _monitorScrollPosition() {
    const currentPosition = containerConfig[this.direction].pos;

    // check if we've reached the last scrollable element
    if (parseInt(currentPosition, 10) === this.endPosition) {
      this.isReadyToReset = true;
    }

    this._setTimer();
  }
}
