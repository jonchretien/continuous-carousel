/**
 * Resize Handler
 * Uses ResizeObserver to recalculate carousel dimensions on container resize
 */

import type { Observer, ResizeCarouselContext } from '../types';

interface ResizeHandlerOptions {
  debounceDelay?: number;
}

/**
 * Creates a resize handler for a carousel
 */
export function createResizeHandler(carousel: ResizeCarouselContext, options: ResizeHandlerOptions = {}): Observer {
  const { debounceDelay = 150 } = options;
  let observer: ResizeObserver | null = null;
  let debouncedResize: (() => void) | null = null;
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Callback for resize events
   */
  function handleResize(): void {
    if (carousel.recalculateDimensions) {
      carousel.recalculateDimensions();
    }
  }

  /**
   * Setup fallback using window resize event
   */
  function setupWindowResizeFallback(): void {
    debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, debounceDelay);
    };
    window.addEventListener('resize', debouncedResize);
  }

  function cleanupWindowResizeFallback(): void {
    if (debouncedResize) {
      window.removeEventListener('resize', debouncedResize);
      debouncedResize = null;
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
      resizeTimeout = null;
    }
  }

  /**
   * Start observing the carousel container for resize
   */
  function observe(): void {
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
  function disconnect(): void {
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
