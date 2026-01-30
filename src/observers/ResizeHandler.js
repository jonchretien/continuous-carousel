/**
 * Resize Handler
 * Uses ResizeObserver to recalculate carousel dimensions on container resize
 */

import { debounce } from '../utils/dom.js';

/**
 * Creates a resize handler for a carousel
 * @param {Object} carousel - Carousel instance with recalculateDimensions() method
 * @param {Object} options - Handler options
 * @param {number} options.debounceDelay - Delay for window resize fallback (ms)
 * @returns {Object} Handler interface with observe() and disconnect() methods
 */
export function createResizeHandler(carousel, options = {}) {
  const { debounceDelay = 150 } = options;
  let observer = null;
  let debouncedResize = null;

  /**
   * Callback for resize events
   */
  function handleResize() {
    if (carousel.recalculateDimensions) {
      carousel.recalculateDimensions();
    }
  }

  /**
   * Setup fallback using window resize event
   */
  function setupWindowResizeFallback() {
    debouncedResize = debounce(handleResize, debounceDelay);
    window.addEventListener('resize', debouncedResize);
  }

  /**
   * Cleanup window resize fallback
   */
  function cleanupWindowResizeFallback() {
    if (debouncedResize) {
      window.removeEventListener('resize', debouncedResize);
      debouncedResize = null;
    }
  }

  /**
   * Start observing the carousel container for resize
   */
  function observe() {
    // Check if ResizeObserver is supported
    if (!('ResizeObserver' in window)) {
      console.warn('ResizeObserver not supported. Using window resize fallback.');
      setupWindowResizeFallback();
      return;
    }

    // Create observer if not already created
    if (!observer) {
      observer = new ResizeObserver(() => {
        handleResize();
      });
    }

    // Observe the carousel container
    observer.observe(carousel.container);
  }

  /**
   * Stop observing and cleanup
   */
  function disconnect() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    cleanupWindowResizeFallback();
  }

  return {
    observe,
    disconnect
  };
}
