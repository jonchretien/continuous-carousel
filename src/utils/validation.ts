/**
 * Validation utilities
 */

import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../constants';
import type { Direction } from '../types';

/**
 * Validates that an element exists
 */
export function validateElement(element: HTMLElement | string): HTMLElement {
  let el: HTMLElement | null = element as HTMLElement;

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
 */
export function validateDirection(direction: string): Direction {
  const normalizedDirection = direction.toLowerCase().trim();

  if (normalizedDirection !== DIRECTION_HORIZONTAL && normalizedDirection !== DIRECTION_VERTICAL) {
    throw new Error(
      `Direction must be either "${DIRECTION_HORIZONTAL}" or "${DIRECTION_VERTICAL}"`
    );
  }

  return normalizedDirection as Direction;
}

/**
 * Validates numVisible value
 */
export function validateNumVisible(numVisible: number | string): number {
  const num = Number(numVisible);

  if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
    throw new Error('numVisible must be a positive integer');
  }

  return num;
}

/**
 * Validates a callback function
 */
export function validateCallback(callback: unknown, name: string): ((...args: unknown[]) => void) | null {
  if (callback === null || callback === undefined) {
    return null;
  }

  if (typeof callback !== 'function') {
    throw new Error(`${name} must be a function`);
  }

  return callback as (...args: unknown[]) => void;
}

/**
 * Validates reverse option
 */
export function validateReverse(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
}

/**
 * Validates numVisible is less than item count
 */
export function validateNumVisibleCount(numVisible: number, itemCount: number): void {
  if (numVisible >= itemCount) {
    throw new Error(
      `numVisible (${numVisible}) must be less than item count (${itemCount}).`
    );
  }
}

/**
 * Validates timing values (interval, duration)
 */
export function validateTiming(value: number | string, name: string): number {
  const num = Number(value);

  if (isNaN(num) || num < 0) {
    throw new Error(`${name} must be a non-negative number`);
  }

  return num;
}
