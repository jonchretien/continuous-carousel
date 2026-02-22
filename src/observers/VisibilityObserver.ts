/**
 * Visibility Observer
 * Uses IntersectionObserver to pause/play carousel based on viewport visibility
 */

import type { Observer, VisibilityCarouselContext } from '../types';

interface VisibilityObserverOptions {
  threshold?: number;
}

/**
 * Creates a visibility observer for a carousel
 */
export function createVisibilityObserver(carousel: VisibilityCarouselContext, options: VisibilityObserverOptions = {}): Observer {
  const { threshold = 0.5 } = options;
  let observer: IntersectionObserver | null = null;

  /**
   * Callback for intersection changes
   */
  function handleIntersection(entries: IntersectionObserverEntry[]): void {
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
  function observe(): void {
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
  function disconnect(): void {
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
