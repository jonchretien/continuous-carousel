/**
 * Transform Strategy Pattern
 * Separates horizontal and vertical transform logic using plain objects
 */

import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../constants.js';

/**
 * Horizontal transform strategy
 * Handles left-to-right carousel movement
 */
const horizontalStrategy = {
  /**
   * Get horizontal translate3d transform
   * @param {number} position - X position in pixels
   * @returns {string} CSS transform value
   */
  getTransform(position) {
    return `translate3d(${position}px, 0, 0)`;
  },

  /**
   * Get element width
   * @param {HTMLElement} element - Element to measure
   * @returns {number} Width in pixels
   */
  getMeasurement(element) {
    return element.offsetWidth;
  },

  /**
   * Get width property name
   * @returns {string} 'width'
   */
  getSizeProperty() {
    return 'width';
  },

  /**
   * Get CSS variable name for item width
   * @returns {string} '--carousel-item-width'
   */
  getCSSVariableName() {
    return '--carousel-item-width';
  }
};

/**
 * Vertical transform strategy
 * Handles top-to-bottom carousel movement
 */
const verticalStrategy = {
  /**
   * Get vertical translate3d transform
   * @param {number} position - Y position in pixels
   * @returns {string} CSS transform value
   */
  getTransform(position) {
    return `translate3d(0, ${position}px, 0)`;
  },

  /**
   * Get element height
   * @param {HTMLElement} element - Element to measure
   * @returns {number} Height in pixels
   */
  getMeasurement(element) {
    return element.offsetHeight;
  },

  /**
   * Get height property name
   * @returns {string} 'height'
   */
  getSizeProperty() {
    return 'height';
  },

  /**
   * Get CSS variable name for item height
   * @returns {string} '--carousel-item-height'
   */
  getCSSVariableName() {
    return '--carousel-item-height';
  }
};

/**
 * Factory function to get appropriate strategy
 * @param {string} direction - 'horizontal' or 'vertical'
 * @returns {Object} Strategy object
 * @throws {Error} If direction is invalid
 */
export function createTransformStrategy(direction) {
  const strategies = {
    [DIRECTION_HORIZONTAL]: horizontalStrategy,
    [DIRECTION_VERTICAL]: verticalStrategy
  };

  const strategy = strategies[direction];

  if (!strategy) {
    throw new Error(
      `Invalid direction: ${direction}. Must be "${DIRECTION_HORIZONTAL}" or "${DIRECTION_VERTICAL}"`
    );
  }

  return strategy;
}

// Export strategies for testing
export { horizontalStrategy, verticalStrategy };
