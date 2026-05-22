/**
 * Transform Strategy Pattern
 * Separates horizontal and vertical transform logic using plain objects
 */

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

export function createTransformStrategy(direction: Direction): TransformStrategy {
  return direction === 'horizontal' ? horizontalStrategy : verticalStrategy;
}

// Export strategies for testing
export { horizontalStrategy, verticalStrategy };
