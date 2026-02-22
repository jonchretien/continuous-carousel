/**
 * Animation Controller
 * Uses requestAnimationFrame with timestamp tracking for smooth, frame-rate independent animation
 */

import type { AnimationController, CarouselContext } from '../types';

interface AnimationControllerOptions {
  interval?: number;
}

/**
 * Creates an animation controller for a carousel
 */
export function createAnimationController(carousel: CarouselContext, options: AnimationControllerOptions = {}): AnimationController {
  const { interval = 2000 } = options;

  let animationFrameId: number | null = null;
  let lastTimestamp = 0;
  let isPaused = false;
  let isRunning = false;

  /**
   * Animation loop using requestAnimationFrame
   */
  function animate(timestamp: number): void {
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
  function start(): void {
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
  function stop(): void {
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
  function pause(): void {
    isPaused = true;
  }

  /**
   * Resume the animation from paused state
   */
  function resume(): void {
    if (isPaused) {
      isPaused = false;
      // Reset timestamp to prevent immediate slide advance after resume
      lastTimestamp = 0;
    }
  }

  /**
   * Check if animation is currently running
   */
  function getIsRunning(): boolean {
    return isRunning;
  }

  /**
   * Check if animation is currently paused
   */
  function getIsPaused(): boolean {
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
