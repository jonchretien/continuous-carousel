/**
 * Visibility Observer
 * Uses IntersectionObserver to pause/play carousel based on viewport visibility
 */

/**
 * Creates a visibility observer for a carousel
 * @param {Object} carousel - Carousel instance with play() and pause() methods
 * @param {Object} options - Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @returns {Object} Observer interface with observe() and disconnect() methods
 */
export function createVisibilityObserver(carousel, options = {}) {
  const { threshold = 0.5 } = options;
  let observer = null;

  /**
   * Callback for intersection changes
   * @param {IntersectionObserverEntry[]} entries - Observer entries
   */
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        carousel.play();
      } else {
        carousel.pause();
      }
    });
  }

  /**
   * Start observing the carousel container
   */
  function observe() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported. Carousel will run continuously.');
      return;
    }

    // Create observer if not already created
    if (!observer) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold
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
  }

  return {
    observe,
    disconnect
  };
}
