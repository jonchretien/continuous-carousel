/**
 * Constants for Continuous Carousel
 */

// Direction constants
export const DIRECTION_HORIZONTAL = 'horizontal';
export const DIRECTION_VERTICAL = 'vertical';

// CSS class names
export const CLASS_NAME_CONTAINER = 'c-carousel-container';
export const CLASS_NAME_GROUP = 'c-carousel-group';
export const CLASS_NAME_ITEM = 'c-carousel-item';
export const CLASS_NAME_HIDDEN = 'c-carousel-visuallyhidden';
export const CLASS_NAME_LIVE_REGION = 'c-carousel-liveregion';

// CSS selectors
export const SELECTOR_GROUP = '.c-carousel-group';
export const SELECTOR_ITEM = '.c-carousel-item';

// Data attributes
export const ATTR_DIRECTION = 'data-direction';
export const ATTR_NUM_VISIBLE = 'data-num-visible';
export const ATTR_PAUSED = 'data-paused';

// Animation timing defaults
export const DEFAULT_INTERVAL = 2000; // ms between slides
export const DEFAULT_TRANSITION_DURATION = 1000; // ms for transition
export const DEFAULT_RESET_DURATION = 1; // ms for instant reset

// ARIA
export const ARIA_LIVE_POLITE = 'polite';
export const ARIA_ATOMIC_TRUE = 'true';

// Default configuration
export const DEFAULT_CONFIG = {
  direction: DIRECTION_HORIZONTAL,
  numVisible: 1,
  interval: DEFAULT_INTERVAL,
  transitionDuration: DEFAULT_TRANSITION_DURATION,
  resetDuration: DEFAULT_RESET_DURATION,
  pauseOnHover: false,
  pauseOnFocus: false,
  autoplay: true,
  observeVisibility: true,
  observeResize: true,
  ariaLive: ARIA_LIVE_POLITE,
  announceSlides: true,
  onSlideChange: null,
  onPause: null,
  onPlay: null,
  onDestroy: null
};
