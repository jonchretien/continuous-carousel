/**
 * Validation utilities
 */

import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../constants.js';

/**
 * Validates that an element exists
 * @param {HTMLElement|string} element - Element or ID string
 * @returns {HTMLElement} The validated element
 * @throws {Error} If element is not found
 */
export function validateElement(element) {
  let el = element;

  if (typeof element === 'string') {
    el = document.getElementById(element);
    if (!el) {
      throw new Error(`Carousel container with id "${element}" not found`);
    }
  }

  if (!(el instanceof HTMLElement)) {
    throw new Error('Carousel container must be an HTMLElement or valid element ID');
  }

  return el;
}

/**
 * Validates carousel direction
 * @param {string} direction - Direction value
 * @returns {string} The validated direction
 * @throws {Error} If direction is invalid
 */
export function validateDirection(direction) {
  const normalizedDirection = direction.toLowerCase().trim();

  if (normalizedDirection !== DIRECTION_HORIZONTAL && normalizedDirection !== DIRECTION_VERTICAL) {
    throw new Error(
      `Direction must be either "${DIRECTION_HORIZONTAL}" or "${DIRECTION_VERTICAL}"`
    );
  }

  return normalizedDirection;
}

/**
 * Validates numVisible value
 * @param {number|string} numVisible - Number of visible items
 * @returns {number} The validated number
 * @throws {Error} If numVisible is invalid
 */
export function validateNumVisible(numVisible) {
  const num = Number(numVisible);

  if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
    throw new Error('numVisible must be a positive integer');
  }

  return num;
}

/**
 * Validates a callback function
 * @param {*} callback - Potential callback function
 * @param {string} name - Name of the callback for error messages
 * @returns {Function|null} The validated callback or null
 */
export function validateCallback(callback, name) {
  if (callback === null || callback === undefined) {
    return null;
  }

  if (typeof callback !== 'function') {
    throw new Error(`${name} must be a function`);
  }

  return callback;
}

/**
 * Validates reverse option
 * @param {*} value - Value to coerce to boolean
 * @returns {boolean} The validated boolean
 */
export function validateReverse(value) {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
}

/**
 * Validates numVisible is less than item count
 * @param {number} numVisible - Number of visible items
 * @param {number} itemCount - Total number of items
 */
export function validateNumVisibleCount(numVisible, itemCount) {
  if (numVisible >= itemCount) {
    console.warn(
      `numVisible (${numVisible}) must be less than item count (${itemCount}). Carousel may not behave correctly.`
    );
  }
}

/**
 * Validates timing values (interval, duration)
 * @param {number} value - Timing value in milliseconds
 * @param {string} name - Name of the timing value
 * @returns {number} The validated value
 * @throws {Error} If value is invalid
 */
export function validateTiming(value, name) {
  const num = Number(value);

  if (isNaN(num) || num < 0) {
    throw new Error(`${name} must be a non-negative number`);
  }

  return num;
}
