/**
 * Continuous Carousel
 */

import {
  DEFAULT_CONFIG,
  ATTR_DIRECTION,
  ATTR_NUM_VISIBLE,
  ATTR_PAUSED,
  SELECTOR_GROUP,
  SELECTOR_ITEM,
} from "./constants.js";
import {
  validateElement,
  validateDirection,
  validateNumVisible,
} from "./utils/validation.js";
import {
  createLiveRegion,
  updateLiveRegion,
  cloneNodesToFragment,
  setCSSProperties,
} from "./utils/dom.js";
import { createTransformStrategy } from "./animation/TransformStrategy.js";
import { createAnimationController } from "./animation/AnimationController.js";
import { createVisibilityObserver } from "./observers/VisibilityObserver.js";
import { createResizeHandler } from "./observers/ResizeHandler.js";

/**
 * Creates a continuous carousel instance
 * @param {HTMLElement|string} element - Container element or element ID
 * @param {Object} userOptions - Configuration options
 * @returns {Object} Carousel instance with public API
 */
export default function ContinuousCarousel(element, userOptions = {}) {
  // Validate and get container element
  const container = validateElement(element);

  // Read data attributes from HTML (for backward compatibility)
  const dataDirection = container.getAttribute(ATTR_DIRECTION);
  const dataNumVisible = container.getAttribute(ATTR_NUM_VISIBLE);

  // Merge configuration: defaults < data attributes < user options
  const config = {
    ...DEFAULT_CONFIG,
    ...(dataDirection && { direction: validateDirection(dataDirection) }),
    ...(dataNumVisible && { numVisible: validateNumVisible(dataNumVisible) }),
    ...userOptions,
  };

  // Validate final config
  const direction = validateDirection(config.direction);
  const numVisible = validateNumVisible(config.numVisible);

  // Get DOM elements
  const itemGroup = container.querySelector(SELECTOR_GROUP);
  const items = Array.from(container.querySelectorAll(SELECTOR_ITEM));
  const itemsLength = items.length;

  // State
  let activeSlideIndex = 1;
  let position = 0;
  let liveRegion = null;
  let isPaused = false;

  // Get transform strategy for direction
  const transformStrategy = createTransformStrategy(direction);

  // Create components
  let animationController = null;
  let visibilityObserver = null;
  let resizeHandler = null;

  /**
   * Calculate and update CSS custom properties for layout
   */
  function recalculateDimensions() {
    const containerSize = transformStrategy.getMeasurement(container);
    const itemSize = containerSize / numVisible;
    const totalItems = itemsLength + numVisible;

    setCSSProperties(container, {
      "--carousel-item-width":
        direction === "horizontal" ? `${itemSize}px` : "auto",
      "--carousel-item-height":
        direction === "vertical" ? `${itemSize}px` : "auto",
      "--carousel-item-count": totalItems,
      "--carousel-transition-duration": `${config.transitionDuration}ms`,
    });

    return { itemSize, containerSize };
  }

  /**
   * Apply transform to item group
   * @param {number} pos - Position in pixels
   * @param {number} duration - Transition duration in ms
   */
  function applyTransform(pos, duration) {
    itemGroup.style.transform = transformStrategy.getTransform(pos);
    if (duration !== undefined) {
      setCSSProperties(container, {
        "--carousel-transition-duration": `${duration}ms`,
      });
    }
  }

  /**
   * Advance to next slide
   */
  function advanceSlide() {
    const { itemSize } = recalculateDimensions();
    const endPosition = -(itemSize * itemsLength);

    // Check if we've reached the end
    if (position === endPosition) {
      // Reset to beginning with instant transition
      position = 0;
      activeSlideIndex = 1;
      applyTransform(position, config.resetDuration);

      // Schedule normal advance after reset
      setTimeout(() => {
        position = position - itemSize * numVisible;
        activeSlideIndex++;
        applyTransform(position, config.transitionDuration);
        if (liveRegion) {
          updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
        }
        if (config.onSlideChange) {
          config.onSlideChange(activeSlideIndex);
        }
      }, config.resetDuration + 50);
    } else {
      // Normal animation
      position = position - itemSize * numVisible;
      activeSlideIndex++;

      if (activeSlideIndex > itemsLength) {
        activeSlideIndex = 1;
      }

      applyTransform(position, config.transitionDuration);
      if (liveRegion) {
        updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
      }
      if (config.onSlideChange) {
        config.onSlideChange(activeSlideIndex);
      }
    }
  }

  /**
   * Initialize the carousel
   */
  function init() {
    // Clone first N items for infinite loop
    const clonedFragment = cloneNodesToFragment(items.slice(0, numVisible));
    itemGroup.appendChild(clonedFragment);

    // Calculate initial dimensions and set CSS variables
    recalculateDimensions();

    // Create live region for accessibility
    if (config.announceSlides) {
      liveRegion = createLiveRegion(container, config.ariaLive);
      updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
    }

    // Create animation controller
    animationController = createAnimationController(
      { advanceSlide, container },
      { interval: config.interval },
    );

    // Create resize handler
    if (config.observeResize) {
      resizeHandler = createResizeHandler({ recalculateDimensions, container });
      resizeHandler.observe();
    }

    // Create visibility observer
    if (config.observeVisibility) {
      visibilityObserver = createVisibilityObserver(
        { play, pause, container },
        { threshold: 0.5 },
      );
      visibilityObserver.observe();
    }

    // Setup pause on hover
    if (config.pauseOnHover) {
      container.addEventListener("mouseenter", pause);
      container.addEventListener("mouseleave", play);
    }

    // Setup pause on focus
    if (config.pauseOnFocus) {
      container.addEventListener("focusin", pause);
      container.addEventListener("focusout", play);
    }

    // Start animation if autoplay is enabled
    if (config.autoplay) {
      animationController.start();
    }
  }

  /**
   * Play/resume the carousel
   */
  function play() {
    if (isPaused) {
      isPaused = false;
      container.setAttribute(ATTR_PAUSED, "false");

      if (animationController) {
        if (animationController.getIsPaused()) {
          animationController.resume();
        } else if (!animationController.getIsRunning()) {
          animationController.start();
        }
      }

      if (config.onPlay) {
        config.onPlay();
      }
    }
  }

  /**
   * Pause the carousel
   */
  function pause() {
    if (!isPaused) {
      isPaused = true;
      container.setAttribute(ATTR_PAUSED, "true");

      if (animationController) {
        animationController.pause();
      }

      if (config.onPause) {
        config.onPause();
      }
    }
  }

  /**
   * Destroy the carousel and cleanup
   */
  function destroy() {
    // Stop animation
    if (animationController) {
      animationController.stop();
    }

    // Disconnect observers
    if (visibilityObserver) {
      visibilityObserver.disconnect();
    }

    if (resizeHandler) {
      resizeHandler.disconnect();
    }

    // Remove event listeners
    if (config.pauseOnHover) {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", play);
    }

    if (config.pauseOnFocus) {
      container.removeEventListener("focusin", pause);
      container.removeEventListener("focusout", play);
    }

    // Remove live region
    if (liveRegion) {
      liveRegion.remove();
    }

    if (config.onDestroy) {
      config.onDestroy();
    }
  }

  /**
   * Update configuration
   * @param {Object} newOptions - New options to merge
   */
  function updateConfig(newOptions) {
    Object.assign(config, newOptions);

    // Recalculate if timing changed
    if (newOptions.transitionDuration !== undefined) {
      recalculateDimensions();
    }
  }

  // Initialize carousel
  init();

  // Return public API
  return {
    play,
    pause,
    destroy,
    updateConfig,
    container,
    config,
  };
}
