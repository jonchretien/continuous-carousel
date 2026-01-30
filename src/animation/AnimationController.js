/**
 * Animation Controller
 * Uses requestAnimationFrame with timestamp tracking for smooth, frame-rate independent animation
 */

/**
 * Creates an animation controller for a carousel
 * @param {Object} carousel - Carousel instance
 * @param {Object} options - Controller options
 * @param {number} options.interval - Time between slides (ms)
 * @returns {Object} Controller interface with start(), stop(), pause(), resume() methods
 */
export function createAnimationController(carousel, options = {}) {
  const { interval = 2000 } = options;

  let animationFrameId = null;
  let lastTimestamp = 0;
  let isPaused = false;
  let isRunning = false;

  /**
   * Animation loop using requestAnimationFrame
   * @param {number} timestamp - High-resolution timestamp from rAF
   */
  function animate(timestamp) {
    // Don't proceed if paused
    if (isPaused) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    // Initialize timestamp on first run
    if (lastTimestamp === 0) {
      lastTimestamp = timestamp;
    }

    // Calculate elapsed time since last advance
    const elapsed = timestamp - lastTimestamp;

    // Advance slide if enough time has passed
    if (elapsed >= interval) {
      if (carousel.advanceSlide) {
        carousel.advanceSlide();
      }
      lastTimestamp = timestamp;
    }

    // Continue animation loop
    animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * Start the animation loop
   */
  function start() {
    if (isRunning) {
      return;
    }

    isRunning = true;
    isPaused = false;
    lastTimestamp = 0;
    animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * Stop the animation loop and reset state
   */
  function stop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    isRunning = false;
    isPaused = false;
    lastTimestamp = 0;
  }

  /**
   * Pause the animation (keeps loop running but doesn't advance slides)
   */
  function pause() {
    isPaused = true;
  }

  /**
   * Resume the animation from paused state
   */
  function resume() {
    if (isPaused) {
      isPaused = false;
      // Reset timestamp to prevent immediate slide advance after resume
      lastTimestamp = 0;
    }
  }

  /**
   * Check if animation is currently running
   * @returns {boolean}
   */
  function getIsRunning() {
    return isRunning;
  }

  /**
   * Check if animation is currently paused
   * @returns {boolean}
   */
  function getIsPaused() {
    return isPaused;
  }

  return {
    start,
    stop,
    pause,
    resume,
    getIsRunning,
    getIsPaused
  };
}
