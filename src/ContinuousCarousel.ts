/**
 * Continuous Carousel 🎠
 */

import {
  DEFAULT_CONFIG,
  ATTR_DIRECTION,
  ATTR_NUM_VISIBLE,
  ATTR_PAUSED,
  ATTR_REVERSE,
  SELECTOR_GROUP,
  SELECTOR_ITEM,
} from "./constants";
import {
  validateElement,
  validateDirection,
  validateNumVisible,
  validateNumVisibleCount,
  validateReverse,
} from "./utils/validation";
import {
  createLiveRegion,
  updateLiveRegion,
  cloneNodesToFragment,
  setCSSProperties,
} from "./utils/dom";
import { createTransformStrategy } from "./animation/TransformStrategy";
import { createAnimationController } from "./animation/AnimationController";
import { createVisibilityObserver } from "./observers/VisibilityObserver";
import { createResizeHandler } from "./observers/ResizeHandler";
import { createKeyboardHandler } from "./observers/KeyboardHandler";
import type {
  ContinuousCarouselConfig,
  ContinuousCarouselInstance,
  AnimationController,
  Observer,
} from "./types";

/**
 * Creates a continuous carousel instance
 */
export default function ContinuousCarousel(
  element: HTMLElement | string,
  userOptions: Partial<ContinuousCarouselConfig> = {},
): ContinuousCarouselInstance {
  // Validate and get container element
  const container = validateElement(element);

  // Read data attributes from HTML (for backward compatibility)
  const dataDirection = container.getAttribute(ATTR_DIRECTION);
  const dataNumVisible = container.getAttribute(ATTR_NUM_VISIBLE);
  const dataReverse = container.getAttribute(ATTR_REVERSE);

  // Merge configuration: defaults < data attributes < user options
  const config: ContinuousCarouselConfig = {
    ...DEFAULT_CONFIG,
    ...(dataDirection && { direction: validateDirection(dataDirection) }),
    ...(dataNumVisible && { numVisible: validateNumVisible(dataNumVisible) }),
    ...(dataReverse !== null && { reverse: validateReverse(dataReverse) }),
    ...userOptions,
  };

  // Validate final config
  const direction = validateDirection(config.direction);
  const numVisible = validateNumVisible(config.numVisible);

  // Get DOM elements
  const itemGroup = container.querySelector(SELECTOR_GROUP) as HTMLElement;
  const items = Array.from(container.querySelectorAll(SELECTOR_ITEM)) as HTMLElement[];
  const itemsLength = items.length;

  // Validate numVisible against item count
  validateNumVisibleCount(numVisible, itemsLength);

  // State
  let activeSlideIndex = 1;
  let position = 0;
  let liveRegion: HTMLElement | null = null;
  let isPaused = false;

  // Get transform strategy for direction
  const transformStrategy = createTransformStrategy(direction);

  // Create components
  let animationController: AnimationController | null = null;
  let visibilityObserver: Observer | null = null;
  let resizeHandler: Observer | null = null;
  let keyboardHandler: Observer | null = null;

  /**
   * Calculate and update CSS custom properties for layout
   */
  function recalculateDimensions(): { itemSize: number; containerSize: number } {
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
   */
  function applyTransform(pos: number, duration?: number): void {
    itemGroup.style.transform = transformStrategy.getTransform(pos);
    if (duration !== undefined) {
      setCSSProperties(container, {
        "--carousel-transition-duration": `${duration}ms`,
      });
    }
  }

  /**
   * Notify listeners of a slide change
   */
  function notifySlideChange(): void {
    if (liveRegion) {
      updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
    }
    if (config.onSlideChange) {
      config.onSlideChange(activeSlideIndex);
    }
  }

  /**
   * Advance forward by one step
   */
  function advanceForward(itemSize: number): void {
    const endPosition = -(itemSize * itemsLength);

    // Reset to beginning with instant transition
    if (position === endPosition) {
      position = 0;
      activeSlideIndex = 1;
      applyTransform(position, config.resetDuration);

      setTimeout(() => {
        position = position - itemSize * numVisible;
        activeSlideIndex++;
        applyTransform(position, config.transitionDuration);
        notifySlideChange();
      }, config.resetDuration + 50);
      return;
    }

    // Normal animation
    position = position - itemSize * numVisible;
    activeSlideIndex++;

    if (activeSlideIndex > itemsLength) {
      activeSlideIndex = 1;
    }

    applyTransform(position, config.transitionDuration);
    notifySlideChange();
  }

  /**
   * Advance in reverse by one step
   */
  function advanceReverse(itemSize: number): void {
    // Reset to end with instant transition
    if (position === 0) {
      position = -(itemSize * itemsLength);
      activeSlideIndex = itemsLength;
      applyTransform(position, config.resetDuration);

      setTimeout(() => {
        position = position + itemSize * numVisible;
        activeSlideIndex--;
        if (activeSlideIndex < 1) {
          activeSlideIndex = itemsLength;
        }
        applyTransform(position, config.transitionDuration);
        notifySlideChange();
      }, config.resetDuration + 50);
      return;
    }

    // Normal reverse animation
    position = position + itemSize * numVisible;
    activeSlideIndex--;

    if (activeSlideIndex < 1) {
      activeSlideIndex = itemsLength;
    }

    applyTransform(position, config.transitionDuration);
    notifySlideChange();
  }

  /**
   * Advance to next slide
   */
  function advanceSlide(forward?: boolean): void {
    const { itemSize } = recalculateDimensions();
    const goReverse = forward !== undefined ? !forward : config.reverse;
    if (goReverse) return advanceReverse(itemSize);
    advanceForward(itemSize);
  }

  /**
   * Clone items and set initial position based on direction
   */
  function setupClones(): void {
    if (config.reverse) {
      // Clone last N items and prepend for reverse infinite loop
      const clonedFragment = cloneNodesToFragment(items.slice(-numVisible));
      itemGroup.insertBefore(clonedFragment, itemGroup.firstChild);

      // Set initial position so real items are visible
      const { itemSize } = recalculateDimensions();
      position = -(itemSize * numVisible);
      applyTransform(position, 0);
      return;
    }

    // Clone first N items for infinite loop
    const clonedFragment = cloneNodesToFragment(items.slice(0, numVisible));
    itemGroup.appendChild(clonedFragment);

    // Calculate initial dimensions and set CSS variables
    recalculateDimensions();
  }

  /**
   * Play/resume the carousel
   */
  function play(): void {
    if (!isPaused) return;

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

  /**
   * Pause the carousel
   */
  function pause(): void {
    if (isPaused) return;

    isPaused = true;
    container.setAttribute(ATTR_PAUSED, "true");

    if (animationController) {
      animationController.pause();
    }

    if (config.onPause) {
      config.onPause();
    }
  }

  /**
   * Toggle between play and pause
   */
  function togglePause(): void {
    if (isPaused) return play();
    pause();
  }

  /**
   * Destroy the carousel and cleanup
   */
  function destroy(): void {
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

    if (keyboardHandler) {
      keyboardHandler.disconnect();
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
   */
  function updateConfig(newOptions: Partial<ContinuousCarouselConfig>): void {
    Object.assign(config, newOptions);

    // Recalculate if timing changed
    if (newOptions.transitionDuration !== undefined) {
      recalculateDimensions();
    }
  }

  /**
   * Initialize the carousel
   */
  function init(): void {
    setupClones();

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

    // Create keyboard handler
    if (config.keyboardNav) {
      keyboardHandler = createKeyboardHandler({
        advanceSlide,
        togglePause,
        container,
      });
      keyboardHandler.observe();
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
