/**
 * Transform Strategy Pattern
 * Separates horizontal and vertical transform logic using plain objects
 */

import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../constants';
import type { Direction, TransformStrategy } from '../types';

/**
 * Horizontal transform strategy
 * Handles left-to-right carousel movement
 */
const horizontalStrategy: TransformStrategy = {
  getTransform(position: number): string {
    return `translate3d(${position}px, 0, 0)`;
  },

  getMeasurement(element: HTMLElement): number {
    return element.offsetWidth;
  },

  getSizeProperty(): string {
    return 'width';
  },

  getCSSVariableName(): string {
    return '--carousel-item-width';
  }
};

/**
 * Vertical transform strategy
 * Handles top-to-bottom carousel movement
 */
const verticalStrategy: TransformStrategy = {
  getTransform(position: number): string {
    return `translate3d(0, ${position}px, 0)`;
  },

  getMeasurement(element: HTMLElement): number {
    return element.offsetHeight;
  },

  getSizeProperty(): string {
    return 'height';
  },

  getCSSVariableName(): string {
    return '--carousel-item-height';
  }
};

/**
 * Factory function to get appropriate strategy
 */
export function createTransformStrategy(direction: Direction): TransformStrategy {
  const strategies: Record<string, TransformStrategy> = {
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
